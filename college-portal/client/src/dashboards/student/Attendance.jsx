import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function Attendance() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    /* ---------- STUDENT ID ---------- */
    const { data: student } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!student) return;

    /* ---------- SUBJECTS ---------- */
    const { data: subjectRows } = await supabase
      .from("student_subjects")
      .select(
        `
        subject_id,
        subjects ( name )
      `
      )
      .eq("student_id", student.id);

    const result = [];

    for (const s of subjectRows || []) {
      const subjectId = s.subject_id;

      const { count: total } = await supabase
        .from("attendance")
        .select("*", { count: "exact", head: true })
        .eq("student_id", student.id)
        .eq("subject_id", subjectId);

      const { count: present } = await supabase
        .from("attendance")
        .select("*", { count: "exact", head: true })
        .eq("student_id", student.id)
        .eq("subject_id", subjectId)
        .eq("status", true);

      const absent = (total || 0) - (present || 0);
      const percent =
        total && total > 0
          ? Math.round((present / total) * 100)
          : 0;

      result.push({
        subject: s.subjects.name,
        total: total || 0,
        present: present || 0,
        absent,
        percent,
      });
    }

    setRows(result);
    setLoading(false);
  };

  if (loading) return <p>Loading attendance...</p>;

  return (
    <div className="p-6 bg-white rounded shadow">
      <h1 className="text-xl font-semibold mb-4">
        Attendance Overview
      </h1>

      {rows.length === 0 ? (
        <p className="text-gray-500">
          No attendance records available.
        </p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Subject</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Present</th>
              <th className="border p-2">Absent</th>
              <th className="border p-2">%</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td className="border p-2">{r.subject}</td>
                <td className="border p-2 text-center">{r.total}</td>
                <td className="border p-2 text-center text-green-600">
                  {r.present}
                </td>
                <td className="border p-2 text-center text-red-600">
                  {r.absent}
                </td>
                <td className="border p-2 text-center font-semibold">
                  {r.percent}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

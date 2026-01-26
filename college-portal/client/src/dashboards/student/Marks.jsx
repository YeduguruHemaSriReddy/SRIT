import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function Marks() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMarks();
  }, []);

  const loadMarks = async () => {
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

      const { data: mark } = await supabase
        .from("marks")
        .select(
          `
          internal_1,
          internal_2,
          assignment,
          total
        `
        )
        .eq("student_id", student.id)
        .eq("subject_id", subjectId)
        .maybeSingle();

      result.push({
        subject: s.subjects.name,
        internal1: mark?.internal_1 ?? "—",
        internal2: mark?.internal_2 ?? "—",
        assignment: mark?.assignment ?? "—",
        total: mark?.total ?? "—",
      });
    }

    setRows(result);
    setLoading(false);
  };

  if (loading) return <p>Loading marks...</p>;

  return (
    <div className="p-6 bg-white rounded shadow">
      <h1 className="text-xl font-semibold mb-4">
        Marks Overview
      </h1>

      {rows.length === 0 ? (
        <p className="text-gray-500">
          No marks available.
        </p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Subject</th>
              <th className="border p-2">Internal 1</th>
              <th className="border p-2">Internal 2</th>
              <th className="border p-2">Assignment</th>
              <th className="border p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td className="border p-2">{r.subject}</td>
                <td className="border p-2 text-center">{r.internal1}</td>
                <td className="border p-2 text-center">{r.internal2}</td>
                <td className="border p-2 text-center">{r.assignment}</td>
                <td className="border p-2 text-center font-semibold">
                  {r.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

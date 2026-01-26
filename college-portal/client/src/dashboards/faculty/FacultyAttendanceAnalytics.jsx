import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function FacultyAttendanceAnalytics() {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    // faculty id
    const { data: faculty } = await supabase
      .from("faculty")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!faculty) {
      setLoading(false);
      return;
    }

    // subjects handled
    const { data: facultySubjects } = await supabase
      .from("faculty_subjects")
      .select(
        `
        subject_id,
        subjects ( id, name )
      `
      )
      .eq("faculty_id", faculty.id);

    const result = [];

    for (const fs of facultySubjects || []) {
      const subjectId = fs.subjects.id;
      const subjectName = fs.subjects.name;

      // total classes
      const { count: totalClasses } = await supabase
        .from("attendance")
        .select("*", { count: "exact", head: true })
        .eq("subject_id", subjectId);

      if (!totalClasses) {
        result.push({
          subject: subjectName,
          percent: 0,
        });
        continue;
      }

      // present count
      const { count: presentCount } = await supabase
        .from("attendance")
        .select("*", { count: "exact", head: true })
        .eq("subject_id", subjectId)
        .eq("status", true);

      const percent = Math.round(
        (presentCount / totalClasses) * 100
      );

      result.push({
        subject: subjectName,
        percent,
      });
    }

    setSummary(result);
    setLoading(false);
  };

  if (loading) return <p className="p-6">Loading analytics...</p>;

  return (
    <div className="max-w-3xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        Attendance Summary
      </h2>

      {summary.length === 0 ? (
        <p className="text-gray-500">
          No attendance data available
        </p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">
                Subject
              </th>
              <th className="border p-2 text-center">
                Attendance %
              </th>
              <th className="border p-2 text-center">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {summary.map((s, i) => {
              let status = "Good";
              let color = "text-green-600";

              if (s.percent < 65) {
                status = "Critical";
                color = "text-red-600";
              } else if (s.percent < 75) {
                status = "Warning";
                color = "text-orange-600";
              }

              return (
                <tr key={i}>
                  <td className="border p-2">
                    {s.subject}
                  </td>
                  <td className="border p-2 text-center">
                    {s.percent}%
                  </td>
                  <td
                    className={`border p-2 text-center font-medium ${color}`}
                  >
                    {status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

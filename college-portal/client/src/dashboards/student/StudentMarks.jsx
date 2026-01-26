import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function StudentMarks() {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMarks();
  }, []);

  const loadMarks = async () => {
    setLoading(true);

    /* ---------- AUTH ---------- */
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    /* ---------- STUDENT ---------- */
    const { data: student } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!student) return;

    /* ---------- MARKS ---------- */
    const { data } = await supabase
      .from("marks")
      .select(
        `
        exam_type,
        marks_obtained,
        total_marks,
        subjects ( name )
      `
      )
      .eq("student_id", student.id)
      .order("created_at", { ascending: false });

    setMarks(data || []);
    setLoading(false);
  };

  if (loading) {
    return <p className="p-6">Loading marks...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Marks Overview
      </h1>

      {marks.length === 0 ? (
        <p className="text-gray-500">
          Marks not published yet
        </p>
      ) : (
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Subject</th>
                <th className="border p-2">Exam</th>
                <th className="border p-2">Marks</th>
                <th className="border p-2">Grade</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {marks.map((m, i) => {
                const percent =
                  (m.marks_obtained / m.total_marks) *
                  100;

                let grade = "F";
                if (percent >= 90) grade = "A+";
                else if (percent >= 80) grade = "A";
                else if (percent >= 70) grade = "B";
                else if (percent >= 60) grade = "C";

                return (
                  <tr key={i}>
                    <td className="border p-2">
                      {m.subjects.name}
                    </td>
                    <td className="border p-2">
                      {m.exam_type}
                    </td>
                    <td className="border p-2">
                      {m.marks_obtained} /{" "}
                      {m.total_marks}
                    </td>
                    <td className="border p-2 font-semibold">
                      {grade}
                    </td>
                    <td className="border p-2 text-green-600">
                      Published
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

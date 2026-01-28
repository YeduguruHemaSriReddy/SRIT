import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function StudentMarks() {
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

    // student
    const { data: student } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!student) return;

    // marks
    const { data } = await supabase
      .from("marks")
      .select(`
        internal_1,
        internal_2,
        assignment,
        total,
        subjects ( name )
      `)
      .eq("student_id", student.id);

    setRows(data || []);
    setLoading(false);
  };

  if (loading) return <p className="p-6">Loading marks...</p>;

  if (rows.length === 0) {
    return <p className="p-6">Marks not published yet.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Marks</h1>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Subject</th>
              <th className="border p-2">Internal 1</th>
              <th className="border p-2">Internal 2</th>
              <th className="border p-2">Assignment</th>
              <th className="border p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((m, i) => (
              <tr key={i}>
                <td className="border p-2 font-medium">
                  {m.subjects.name}
                </td>
                <td className="border p-2">{m.internal_1}</td>
                <td className="border p-2">{m.internal_2}</td>
                <td className="border p-2">{m.assignment}</td>
                <td className="border p-2 font-semibold">
                  {m.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

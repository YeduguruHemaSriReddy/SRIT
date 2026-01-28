import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

const YEARS = [1, 2, 3, 4];
const DEPARTMENTS = ["CSE", "ECE", "EEE", "MECH", "CIVIL"];

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("students")
      .select(`
        id,
        roll_number,
        department,
        year,
        phone,
        user_id
      `)
      .order("roll_number");

    if (!error) setStudents(data || []);
    setLoading(false);
  };

  const saveChanges = async () => {
    const { error } = await supabase
      .from("students")
      .update({
        roll_number: editing.roll_number,
        department: editing.department,
        year: editing.year,
      })
      .eq("id", editing.id);

    if (error) {
      alert("Failed to update student");
    } else {
      alert("Student updated");
      setEditing(null);
      fetchStudents();
    }
  };

  if (loading) return <p className="p-6">Loading students...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Student Management
      </h1>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Roll No</th>
              <th className="border p-2">Department</th>
              <th className="border p-2">Year</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td className="border p-2">{s.roll_number}</td>
                <td className="border p-2">{s.department}</td>
                <td className="border p-2">{s.year}</td>
                <td className="border p-2">{s.phone || "-"}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => setEditing({ ...s })}
                    className="text-blue-600 underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              Edit Student
            </h2>

            <input
              value={editing.roll_number}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  roll_number: e.target.value,
                })
              }
              className="w-full border px-3 py-2 rounded mb-3"
              placeholder="Roll Number"
            />

            <select
              value={editing.department}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  department: e.target.value,
                })
              }
              className="w-full border px-3 py-2 rounded mb-3"
            >
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <select
              value={editing.year}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  year: Number(e.target.value),
                })
              }
              className="w-full border px-3 py-2 rounded mb-4"
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  Year {y}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={saveChanges}
                className="px-4 py-2 bg-purple-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

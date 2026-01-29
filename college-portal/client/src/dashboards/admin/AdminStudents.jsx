import { useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";
import supabase from "../../supabaseClient";

const YEARS = [1, 2, 3, 4];
const DEPARTMENTS = ["CSE", "ECE", "EEE", "MECH", "CIVIL", "CSM"];

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
        phone
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
      setEditing(null);
      fetchStudents();
    }
  };

  if (loading) {
    return <p className="p-6">Loading students...</p>;
  }

  return (
    <div className="space-y-6">
      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-2xl font-semibold">
          Student Management
        </h1>
        <p className="text-sm text-gray-500">
          View and manage registered students
        </p>
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white rounded-lg shadow border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Roll No</th>
              <th className="px-4 py-3 text-left">Department</th>
              <th className="px-4 py-3 text-center">Year</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr
                key={s.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-medium">
                  {s.roll_number}
                </td>
                <td className="px-4 py-3">
                  {s.department}
                </td>
                <td className="px-4 py-3 text-center">
                  {s.year}
                </td>
                <td className="px-4 py-3">
                  {s.phone || "-"}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => setEditing({ ...s })}
                    className="inline-flex items-center gap-1 text-purple-600 hover:underline"
                  >
                    <Pencil size={14} />
                    Edit
                  </button>
                </td>
              </tr>
            ))}

            {students.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500"
                >
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===== EDIT MODAL ===== */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            {/* MODAL HEADER */}
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-lg font-semibold">
                Edit Student
              </h2>
              <button onClick={() => setEditing(null)}>
                <X size={18} />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm text-gray-600">
                  Roll Number
                </label>
                <input
                  value={editing.roll_number}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      roll_number: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded mt-1"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Department
                </label>
                <select
                  value={editing.department}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      department: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded mt-1"
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Year
                </label>
                <select
                  value={editing.year}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      year: Number(e.target.value),
                    })
                  }
                  className="w-full border px-3 py-2 rounded mt-1"
                >
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      Year {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 rounded bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={saveChanges}
                className="px-4 py-2 rounded bg-purple-600 text-white"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

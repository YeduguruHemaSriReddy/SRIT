import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import supabase from "../../supabaseClient";

export default function FacultyMarks() {
  const { subjectId } = useParams();
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [loading, setLoading] = useState(true);
  const [hasExistingMarks, setHasExistingMarks] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // 🔹 Fetch students + existing marks
  const fetchStudentsAndMarks = useCallback(async () => {
    setLoading(true);

    const { data: studentData } = await supabase
      .from("student_subjects")
      .select(
        `
        student_id,
        students (
          roll_number
        )
      `
      )
      .eq("subject_id", subjectId);

    const { data: marksData } = await supabase
      .from("marks")
      .select("*")
      .eq("subject_id", subjectId);

    const marksMap = {};
    marksData?.forEach((m) => {
      marksMap[m.student_id] = {
        internal_1: m.internal_1,
        internal_2: m.internal_2,
        assignment: m.assignment,
      };
    });

    setStudents(studentData || []);
    setMarks(marksMap);
    setHasExistingMarks((marksData || []).length > 0);
    setIsEditing((marksData || []).length === 0); // auto edit if first time
    setLoading(false);
  }, [subjectId]);

  useEffect(() => {
    fetchStudentsAndMarks();
  }, [fetchStudentsAndMarks]);

  // 🔹 Handle input
  const handleChange = (studentId, field, value) => {
    if (!isEditing) return;

    setMarks((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: Number(value),
      },
    }));
  };

  // 🔹 Save marks
  const saveMarks = async () => {
    const rows = students.map((s) => {
      const m = marks[s.student_id] || {};
      const total =
        (m.internal_1 || 0) +
        (m.internal_2 || 0) +
        (m.assignment || 0);

      return {
        student_id: s.student_id,
        subject_id: subjectId,
        internal_1: m.internal_1 || 0,
        internal_2: m.internal_2 || 0,
        assignment: m.assignment || 0,
        total,
      };
    });

    const { error } = await supabase
      .from("marks")
      .upsert(rows, {
        onConflict: "student_id,subject_id",
      });

    if (error) {
      alert("Error saving marks");
    } else {
      alert("Marks saved successfully");
      setHasExistingMarks(true);
      setIsEditing(false); // 🔒 lock again
    }
  };

  if (loading) return <p className="p-6">Loading students...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Internal Marks</h1>

      {students.length === 0 ? (
        <p>No students mapped.</p>
      ) : (
        <>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Roll No</th>
                <th className="border p-2">Internal 1</th>
                <th className="border p-2">Internal 2</th>
                <th className="border p-2">Assignment</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.student_id}>
                  <td className="border p-2">
                    {s.students.roll_number}
                  </td>
                  {["internal_1", "internal_2", "assignment"].map(
                    (field) => (
                      <td key={field} className="border p-2">
                        <input
                          type="number"
                          className={`border p-1 w-full ${
                            !isEditing
                              ? "bg-gray-100 cursor-not-allowed"
                              : ""
                          }`}
                          disabled={!isEditing}
                          value={
                            marks[s.student_id]?.[field] ?? ""
                          }
                          onChange={(e) =>
                            handleChange(
                              s.student_id,
                              field,
                              e.target.value
                            )
                          }
                        />
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4">
            {!hasExistingMarks || isEditing ? (
              <button
                onClick={saveMarks}
                className="bg-green-600 text-white px-6 py-2 rounded"
              >
                Save Marks
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded"
              >
                Edit Marks
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

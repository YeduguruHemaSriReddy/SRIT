import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import supabase from "../../supabaseClient";

export default function FacultyAttendance() {
  const { subjectId } = useParams();

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);
  const [alreadyMarked, setAlreadyMarked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  // 🔹 Fetch students mapped to subject
  const fetchStudents = useCallback(async () => {
    setLoading(true);

    const { data, error } = await supabase
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

    if (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
    } else {
      setStudents(data || []);
    }

    setLoading(false);
  }, [subjectId]);

  // 🔹 Check if attendance already marked today
  const fetchExistingAttendance = useCallback(async () => {
    const { data, error } = await supabase
      .from("attendance")
      .select("student_id, status")
      .eq("subject_id", subjectId)
      .eq("date", today);

    if (!error && data.length > 0) {
      setAlreadyMarked(true);

      const mapped = {};
      data.forEach((row) => {
        mapped[row.student_id] = row.status;
      });

      setAttendance(mapped);
    }
  }, [subjectId, today]);

  // 🔹 Initial load
  useEffect(() => {
    const init = async () => {
      await fetchStudents();
      await fetchExistingAttendance();
    };
    init();
  }, [fetchStudents, fetchExistingAttendance]);

  // 🔹 Toggle attendance checkbox
  const toggleAttendance = (studentId) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  // 🔹 Save / Update attendance
  const saveAttendance = async () => {
    const rows = students.map((s) => ({
      subject_id: subjectId,
      student_id: s.student_id,
      date: today,
      status: attendance[s.student_id] || false,
    }));

    const { error } = await supabase
      .from("attendance")
      .upsert(rows, {
        onConflict: "subject_id,student_id,date",
      });

    if (error) {
      alert("Error saving attendance");
    } else {
      alert("Attendance saved successfully");
      setAlreadyMarked(true);
      setIsEditing(false);
    }
  };

  if (loading) {
    return <p className="p-6">Loading students...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-2">
        Attendance — {today}
      </h1>

      {alreadyMarked && !isEditing && (
        <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded text-green-800">
          Attendance already marked for today. You can edit it.
        </div>
      )}

      {students.length === 0 ? (
        <p className="text-gray-500">
          No students mapped to this subject.
        </p>
      ) : (
        <>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Roll No</th>
                <th className="p-2 border text-center">Present</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.student_id}>
                  <td className="p-2 border">
                    {s.students.roll_number}
                  </td>
                  <td className="p-2 border text-center">
                    <input
                      type="checkbox"
                      checked={attendance[s.student_id] || false}
                      disabled={alreadyMarked && !isEditing}
                      onChange={() =>
                        toggleAttendance(s.student_id)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ACTION BUTTONS */}
          <div className="mt-4">
            {!alreadyMarked && (
              <button
                onClick={saveAttendance}
                className="bg-green-600 text-white px-6 py-2 rounded"
              >
                Save Attendance
              </button>
            )}

            {alreadyMarked && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded"
              >
                Edit Attendance
              </button>
            )}

            {alreadyMarked && isEditing && (
              <button
                onClick={saveAttendance}
                className="bg-green-600 text-white px-6 py-2 rounded"
              >
                Update Attendance
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

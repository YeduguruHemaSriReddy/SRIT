import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function AdminStudentAssign() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [assigned, setAssigned] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    fetchStudents();
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (selectedStudent) fetchAssignedSubjects();
  }, [selectedStudent]);

  const fetchStudents = async () => {
    const { data } = await supabase
      .from("students")
      .select("id, roll_number")
      .order("roll_number");

    setStudents(data || []);
  };

  const fetchSubjects = async () => {
    const { data } = await supabase
      .from("subjects")
      .select("id, name")
      .order("name");

    setSubjects(data || []);
  };

  const fetchAssignedSubjects = async () => {
    const { data } = await supabase
      .from("student_subjects")
      .select(`
        id,
        subjects ( id, name )
      `)
      .eq("student_id", selectedStudent);

    setAssigned(data || []);
  };

  const assignSubject = async () => {
    if (!selectedStudent || !selectedSubject) return;

    // prevent duplicates
    const exists = assigned.some(
      (a) => a.subjects.id === selectedSubject
    );
    if (exists) {
      alert("Subject already assigned");
      return;
    }

    await supabase.from("student_subjects").insert({
      student_id: selectedStudent,
      subject_id: selectedSubject,
    });

    setSelectedSubject("");
    fetchAssignedSubjects();
  };

  const removeSubject = async (id) => {
    await supabase
      .from("student_subjects")
      .delete()
      .eq("id", id);

    fetchAssignedSubjects();
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold mb-4">
        📘 Student–Subject Mapping
      </h1>

      {/* SELECT STUDENT */}
      <select
        value={selectedStudent}
        onChange={(e) => setSelectedStudent(e.target.value)}
        className="border px-4 py-2 rounded w-full mb-4"
      >
        <option value="">Select Student</option>
        {students.map((s) => (
          <option key={s.id} value={s.id}>
            {s.roll_number}
          </option>
        ))}
      </select>

      {selectedStudent && (
        <>
          {/* ASSIGN SUBJECT */}
          <div className="flex gap-3 mb-4">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="border px-4 py-2 rounded flex-1"
            >
              <option value="">Select Subject</option>
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>

            <button
              onClick={assignSubject}
              className="bg-green-600 text-white px-5 py-2 rounded"
            >
              Assign
            </button>
          </div>

          {/* ASSIGNED SUBJECTS */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="font-semibold mb-2">
              Assigned Subjects
            </h2>

            {assigned.length === 0 ? (
              <p className="text-gray-500">No subjects assigned</p>
            ) : (
              <ul className="space-y-2">
                {assigned.map((a) => (
                  <li
                    key={a.id}
                    className="flex justify-between items-center border p-2 rounded"
                  >
                    <span>{a.subjects.name}</span>
                    <button
                      onClick={() => removeSubject(a.id)}
                      className="text-red-600"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}

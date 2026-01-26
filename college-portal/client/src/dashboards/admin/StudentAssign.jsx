import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function StudentAssign() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [subjectId, setSubjectId] = useState("");

  useEffect(() => {
    fetchStudents();
    fetchSubjects();
  }, []);

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

  const assignStudent = async () => {
    if (!studentId || !subjectId) {
      alert("Select both student and subject");
      return;
    }

    const { error } = await supabase
      .from("student_subjects")
      .insert({
        student_id: studentId,
        subject_id: subjectId,
      });

    if (error) {
      alert("Assignment failed (maybe already assigned)");
      console.error(error);
    } else {
      alert("Student assigned successfully");
      setStudentId("");
      setSubjectId("");
    }
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-xl font-semibold mb-4">
        Assign Student to Subject
      </h1>

      <select
        className="w-full border p-2 mb-3"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      >
        <option value="">Select Student</option>
        {students.map((s) => (
          <option key={s.id} value={s.id}>
            {s.roll_number}
          </option>
        ))}
      </select>

      <select
        className="w-full border p-2 mb-3"
        value={subjectId}
        onChange={(e) => setSubjectId(e.target.value)}
      >
        <option value="">Select Subject</option>
        {subjects.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <button
        onClick={assignStudent}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Assign
      </button>
    </div>
  );
}

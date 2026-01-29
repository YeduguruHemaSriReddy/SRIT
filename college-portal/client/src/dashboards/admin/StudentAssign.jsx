import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import { UserPlus } from "lucide-react";

export default function StudentAssign() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [loading, setLoading] = useState(false);

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
      alert("Please select both student and subject");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("student_subjects").insert({
      student_id: studentId,
      subject_id: subjectId,
    });

    setLoading(false);

    if (error) {
      alert("Assignment failed (student may already be assigned)");
    } else {
      setStudentId("");
      setSubjectId("");
      alert("Student assigned successfully");
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-2xl font-semibold">
          Student – Subject Mapping
        </h1>
        <p className="text-sm text-gray-500">
          Assign students to subjects for attendance and marks tracking
        </p>
      </div>

      {/* ===== ASSIGNMENT CARD ===== */}
      <div className="bg-white rounded-lg shadow border p-6">
        <div className="flex items-center gap-2 mb-4">
          <UserPlus className="text-green-600" size={20} />
          <h2 className="text-lg font-medium">
            Assign Student to Subject
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.roll_number}
              </option>
            ))}
          </select>

          <select
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="">Select Subject</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6">
          <button
            onClick={assignStudent}
            disabled={loading}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            {loading ? "Assigning..." : "Assign Student"}
          </button>
        </div>
      </div>
    </div>
  );
}

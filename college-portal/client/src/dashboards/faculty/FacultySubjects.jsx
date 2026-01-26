import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";

export default function FacultySubjects() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Load faculty subjects
  useEffect(() => {
    fetchFacultySubjects();
  }, []);

  const fetchFacultySubjects = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data: faculty } = await supabase
      .from("faculty")
      .select("id")
      .eq("user_id", user.id)
      .single();

    const { data } = await supabase
      .from("faculty_subjects")
      .select(
        `
        subject_id,
        subjects (
          id,
          name
        )
      `
      )
      .eq("faculty_id", faculty.id);

    setSubjects(data || []);
    setLoading(false);
  };

  const fetchStudents = async (subject) => {
    setSelectedSubject(subject);
    setLoading(true);

    const { data } = await supabase
      .from("student_subjects")
      .select(
        `
        student_id,
        students (
          roll_number,
          user_id
        )
      `
      )
      .eq("subject_id", subject.subjects.id);

    setStudents(data || []);
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">My Subjects</h1>

      {/* SUBJECT LIST */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {subjects.map((item) => (
          <div
            key={item.subject_id}
            onClick={() => fetchStudents(item)}
            className={`cursor-pointer p-4 rounded border ${
              selectedSubject?.subject_id === item.subject_id
                ? "bg-blue-100 border-blue-500"
                : "bg-white"
            }`}
          >
            <p className="font-medium text-lg">
              {item.subjects.name}
            </p>

            <div className="flex gap-2 mt-3">
              {/* ATTENDANCE */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(
                    `/faculty/attendance/${item.subjects.id}`
                  );
                }}
                className="bg-indigo-600 text-white px-3 py-1 rounded text-sm"
              >
                Attendance
              </button>

              {/* MARKS */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(
                    `/faculty/marks/${item.subjects.id}`
                  );
                }}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm"
              >
                Marks
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* STUDENT LIST */}
      {selectedSubject && (
        <>
          <h2 className="text-lg font-semibold mb-2">
            Students – {selectedSubject.subjects.name}
          </h2>

          {loading ? (
            <p>Loading students...</p>
          ) : students.length === 0 ? (
            <div className="p-4 bg-yellow-50 border border-yellow-300 rounded">
              <p className="font-medium text-yellow-800">
                No students assigned
              </p>
              <p className="text-sm text-yellow-700">
                Please contact admin.
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              {students.map((s) => (
                <li
                  key={s.student_id}
                  className="p-3 bg-gray-50 rounded flex justify-between"
                >
                  <span>
                    Roll No: {s.students.roll_number}
                  </span>
                  <span className="text-gray-500">
                    {s.students.user_id}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

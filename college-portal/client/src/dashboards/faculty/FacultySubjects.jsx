import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";

export default function FacultySubjects() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchFacultySubjects();
  }, []);

  const fetchFacultySubjects = async () => {
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: faculty } = await supabase
      .from("faculty")
      .select("id")
      .eq("user_id", user.id)
      .single();

    const { data } = await supabase
      .from("faculty_subjects")
      .select(`subject_id, subjects ( id, name )`)
      .eq("faculty_id", faculty.id);

    setSubjects(data || []);
    setLoading(false);
  };

  const fetchStudents = async (subject) => {
    setSelectedSubject(subject);
    setLoading(true);

    const { data } = await supabase
      .from("student_subjects")
      .select(`student_id, students ( roll_number, user_id )`)
      .eq("subject_id", subject.subjects.id);

    setStudents(data || []);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-5xl space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">My Subjects</h1>
        <p className="text-sm text-gray-500">
          Subjects assigned to you for the current academic term
        </p>
      </div>

      {/* SUBJECT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {subjects.map((item) => {
          const active =
            selectedSubject?.subject_id === item.subject_id;

          return (
            <div
              key={item.subject_id}
              onClick={() => fetchStudents(item)}
              className={`cursor-pointer rounded-lg border p-5 transition
                ${
                  active
                    ? "bg-indigo-50 border-indigo-500"
                    : "bg-white hover:shadow"
                }`}
            >
              <h3 className="font-semibold text-lg mb-3">
                {item.subjects.name}
              </h3>

              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(
                      `/faculty/attendance/${item.subjects.id}`
                    );
                  }}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 rounded text-sm"
                >
                  Attendance
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(
                      `/faculty/marks/${item.subjects.id}`
                    );
                  }}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 rounded text-sm"
                >
                  Marks
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* STUDENT LIST */}
      {selectedSubject && (
        <div className="bg-white rounded-lg shadow border p-5">
          <h2 className="text-lg font-semibold mb-4">
            Students Enrolled –{" "}
            <span className="text-indigo-600">
              {selectedSubject.subjects.name}
            </span>
          </h2>

          {loading ? (
            <p>Loading students...</p>
          ) : students.length === 0 ? (
            <div className="p-4 bg-yellow-50 border border-yellow-300 rounded">
              <p className="font-medium text-yellow-800">
                No students assigned
              </p>
              <p className="text-sm text-yellow-700">
                Please contact the administrator.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left p-2 border">
                      Roll Number
                    </th>
                    <th className="text-left p-2 border">
                      Student ID
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr
                      key={s.student_id}
                      className="hover:bg-gray-50"
                    >
                      <td className="p-2 border">
                        {s.students.roll_number}
                      </td>
                      <td className="p-2 border text-gray-500">
                        {s.students.user_id}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

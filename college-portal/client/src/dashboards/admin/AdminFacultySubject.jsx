import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import { Link2 } from "lucide-react";

export default function AdminFacultySubject() {
  const [faculty, setFaculty] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [facultyId, setFacultyId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [section, setSection] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [{ data: f }, { data: s }, { data: a }] = await Promise.all([
      supabase.from("faculty").select("id, name").order("name"),
      supabase.from("subjects").select("id, name").order("name"),
      supabase
        .from("faculty_subjects")
        .select(
          `
          id,
          section,
          faculty ( name ),
          subjects ( name )
        `
        )
        .order("created_at", { ascending: false }),
    ]);

    setFaculty(f || []);
    setSubjects(s || []);
    setAssignments(a || []);
  };

  const assign = async () => {
    if (!facultyId || !subjectId || !section) {
      alert("Please select faculty, subject and section");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("faculty_subjects").insert({
      faculty_id: facultyId,
      subject_id: subjectId,
      section,
    });

    setLoading(false);

    if (error) {
      alert("This assignment already exists");
    } else {
      setFacultyId("");
      setSubjectId("");
      setSection("");
      loadData();
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-2xl font-semibold">
          Faculty – Subject Mapping
        </h1>
        <p className="text-sm text-gray-500">
          Assign subjects to faculty members section-wise
        </p>
      </div>

      {/* ===== ASSIGNMENT CARD ===== */}
      <div className="bg-white rounded-lg shadow border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Link2 size={20} className="text-indigo-600" />
          <h2 className="text-lg font-medium">
            Assign Faculty to Subject
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={facultyId}
            onChange={(e) => setFacultyId(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="">Select Faculty</option>
            {faculty.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
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

          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="">Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>

          <button
            onClick={assign}
            disabled={loading}
            className="bg-indigo-600 text-white rounded px-4 py-2 hover:bg-indigo-700"
          >
            {loading ? "Assigning..." : "Assign"}
          </button>
        </div>
      </div>

      {/* ===== ASSIGNMENT LIST ===== */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-4 border-b">
          <h2 className="font-medium">
            Existing Assignments
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">
                  Faculty
                </th>
                <th className="border px-4 py-2 text-left">
                  Subject
                </th>
                <th className="border px-4 py-2 text-center">
                  Section
                </th>
              </tr>
            </thead>

            <tbody>
              {assignments.map((a) => (
                <tr
                  key={a.id}
                  className="hover:bg-gray-50"
                >
                  <td className="border px-4 py-2">
                    {a.faculty.name}
                  </td>
                  <td className="border px-4 py-2">
                    {a.subjects.name}
                  </td>
                  <td className="border px-4 py-2 text-center font-medium">
                    {a.section}
                  </td>
                </tr>
              ))}

              {assignments.length === 0 && (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center py-6 text-gray-500"
                  >
                    No assignments created yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

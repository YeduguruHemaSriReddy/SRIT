import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function AdminFacultySubject() {
  const [faculty, setFaculty] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [facultyId, setFacultyId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [section, setSection] = useState("");
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [{ data: f }, { data: s }, { data: a }] = await Promise.all([
      supabase.from("faculty").select("id, name").order("name"),
      supabase.from("subjects").select("id, name").order("name"),
      supabase
        .from("faculty_subjects")
        .select(`
          id,
          section,
          faculty ( name ),
          subjects ( name )
        `)
        .order("created_at", { ascending: false }),
    ]);

    setFaculty(f || []);
    setSubjects(s || []);
    setAssignments(a || []);
  };

  const assign = async () => {
    if (!facultyId || !subjectId || !section) {
      alert("Select all fields");
      return;
    }

    const { error } = await supabase.from("faculty_subjects").insert({
      faculty_id: facultyId,
      subject_id: subjectId,
      section,
    });

    if (error) {
      alert("Already assigned");
    } else {
      setFacultyId("");
      setSubjectId("");
      setSection("");
      loadData();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Faculty – Subject Mapping
      </h1>

      {/* ASSIGN FORM */}
      <div className="bg-white p-4 rounded shadow mb-6 grid grid-cols-4 gap-4">
        <select
          value={facultyId}
          onChange={(e) => setFacultyId(e.target.value)}
          className="border p-2 rounded"
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
          className="border p-2 rounded"
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
          className="border p-2 rounded"
        >
          <option value="">Section</option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>

        <button
          onClick={assign}
          className="bg-indigo-600 text-white rounded px-4"
        >
          Assign
        </button>
      </div>

      {/* LIST */}
      <div className="bg-white rounded shadow">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Faculty</th>
              <th className="border p-2">Subject</th>
              <th className="border p-2">Section</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr key={a.id}>
                <td className="border p-2">{a.faculty.name}</td>
                <td className="border p-2">{a.subjects.name}</td>
                <td className="border p-2">{a.section}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

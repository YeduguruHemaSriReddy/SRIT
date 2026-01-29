import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function FacultyMaterials() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [materials, setMaterials] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSubjects();
  }, []);

  /* ---------- FETCH SUBJECTS ---------- */
  const fetchSubjects = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    const { data: faculty } = await supabase
      .from("faculty")
      .select("id")
      .eq("user_id", user.id)
      .single();

    const { data } = await supabase
      .from("faculty_subjects")
      .select("subject_id, subjects(name)")
      .eq("faculty_id", faculty.id);

    setSubjects(data || []);
  };

  /* ---------- FETCH MATERIALS ---------- */
  const fetchMaterials = async (subjectId) => {
    setSelectedSubject(subjectId);

    const { data } = await supabase
      .from("materials")
      .select("*")
      .eq("subject_id", subjectId)
      .order("created_at", { ascending: false });

    setMaterials(data || []);
  };

  /* ---------- FILE TYPE ---------- */
  const detectFileType = (file) => {
    if (file.type.includes("pdf")) return "PDF";
    if (file.type.includes("image")) return "Image";
    if (file.type.includes("video")) return "Video";
    if (file.type.includes("audio")) return "Audio";
    return "File";
  };

  /* ---------- UPLOAD ---------- */
  const uploadMaterial = async () => {
    if (!title || !file || !selectedSubject) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    const fileType = detectFileType(file);
    const filePath = `${selectedSubject}/${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("materials")
      .upload(filePath, file);

    if (error) {
      alert("Upload failed");
      setLoading(false);
      return;
    }

    const { data: url } = supabase.storage
      .from("materials")
      .getPublicUrl(filePath);

    const { data: { user } } = await supabase.auth.getUser();

    const { data: faculty } = await supabase
      .from("faculty")
      .select("id")
      .eq("user_id", user.id)
      .single();

    await supabase.from("materials").insert({
      title,
      subject_id: selectedSubject,
      uploaded_by: faculty.id,
      file_url: url.publicUrl,
      file_type: fileType,
    });

    setTitle("");
    setFile(null);
    fetchMaterials(selectedSubject);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-5xl space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Study Materials</h1>
        <p className="text-sm text-gray-500">
          Upload and manage learning resources for your subjects
        </p>
      </div>

      {/* SUBJECT SELECT */}
      <div className="bg-white p-5 rounded-lg shadow border">
        <label className="block text-sm font-medium mb-2">
          Select Subject
        </label>
        <select
          className="border rounded px-3 py-2 w-full"
          onChange={(e) => fetchMaterials(e.target.value)}
        >
          <option value="">-- Choose Subject --</option>
          {subjects.map((s) => (
            <option key={s.subject_id} value={s.subject_id}>
              {s.subjects.name}
            </option>
          ))}
        </select>
      </div>

      {/* UPLOAD CARD */}
      {selectedSubject && (
        <div className="bg-white p-5 rounded-lg shadow border space-y-4">
          <h2 className="font-semibold text-lg">
            Upload New Material
          </h2>

          <input
            type="text"
            placeholder="Material title (Unit name / Topic)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />

          <input
            type="file"
            accept="*/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full"
          />

          <button
            onClick={uploadMaterial}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded"
          >
            {loading ? "Uploading..." : "Upload Material"}
          </button>
        </div>
      )}

      {/* MATERIAL LIST */}
      {selectedSubject && (
        <div className="bg-white p-5 rounded-lg shadow border">
          <h2 className="font-semibold text-lg mb-4">
            Uploaded Materials
          </h2>

          {materials.length === 0 ? (
            <p className="text-gray-500">
              No materials uploaded yet.
            </p>
          ) : (
            <table className="w-full text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-2 border">Title</th>
                  <th className="text-left p-2 border">Type</th>
                  <th className="text-left p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((m) => (
                  <tr
                    key={m.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="p-2 border font-medium">
                      {m.title}
                    </td>
                    <td className="p-2 border">
                      <span className="px-2 py-1 text-xs rounded bg-indigo-100 text-indigo-700">
                        {m.file_type}
                      </span>
                    </td>
                    <td className="p-2 border">
                      <a
                        href={m.file_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

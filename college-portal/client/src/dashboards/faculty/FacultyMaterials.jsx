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

  // 🔹 Load faculty subjects
  const fetchSubjects = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

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

  // 🔹 Load materials
  const fetchMaterials = async (subjectId) => {
    setSelectedSubject(subjectId);

    const { data } = await supabase
      .from("materials")
      .select("*")
      .eq("subject_id", subjectId)
      .order("created_at", { ascending: false });

    setMaterials(data || []);
  };

  // 🔹 Detect file type (IMPORTANT)
  const detectFileType = (file) => {
    if (file.type.includes("pdf")) return "pdf";
    if (file.type.includes("image")) return "image";
    if (file.type.includes("video")) return "video";
    if (file.type.includes("audio")) return "audio";
    return "other";
  };

  // 🔹 Upload material
  const uploadMaterial = async () => {
    if (!title || !file || !selectedSubject) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    const fileType = detectFileType(file);
    const filePath = `${selectedSubject}/${Date.now()}-${file.name}`;

    // Upload to storage (ANY FILE TYPE)
    const { error: uploadError } = await supabase.storage
      .from("materials")
      .upload(filePath, file);

    if (uploadError) {
      alert("Upload failed");
      setLoading(false);
      return;
    }

    // Get public URL
    const { data: publicUrl } = supabase.storage
      .from("materials")
      .getPublicUrl(filePath);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: faculty } = await supabase
      .from("faculty")
      .select("id")
      .eq("user_id", user.id)
      .single();

    // Save metadata to DB
    await supabase.from("materials").insert({
      title,
      subject_id: selectedSubject,
      uploaded_by: faculty.id,
      file_url: publicUrl.publicUrl,
      file_type: fileType, // ✅ KEY LINE
    });

    setTitle("");
    setFile(null);
    fetchMaterials(selectedSubject);
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        Study Materials
      </h1>

      {/* SUBJECT SELECT */}
      <select
        className="border p-2 mb-4 w-full"
        onChange={(e) => fetchMaterials(e.target.value)}
      >
        <option value="">Select Subject</option>
        {subjects.map((s) => (
          <option key={s.subject_id} value={s.subject_id}>
            {s.subjects.name}
          </option>
        ))}
      </select>

      {/* UPLOAD FORM */}
      {selectedSubject && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="Material title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full mb-2"
          />

          <input
            type="file"
            accept="*/*"   // ✅ ACCEPT ANY FILE
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-2"
          />

          <button
            onClick={uploadMaterial}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      )}

      {/* MATERIAL LIST */}
      <ul className="space-y-2">
        {materials.map((m) => (
          <li
            key={m.id}
            className="p-3 bg-gray-50 rounded flex justify-between"
          >
            <span>
              {m.title}{" "}
              <span className="text-xs text-gray-500">
                ({m.file_type || "file"})
              </span>
            </span>

            <a
              href={m.file_url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600"
            >
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

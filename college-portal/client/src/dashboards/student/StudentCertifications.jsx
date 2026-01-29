import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import { Upload, Link2, Trash2 } from "lucide-react";

export default function StudentCertifications() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    platform: "",
    year: "",
    driveLink: "",
    file: null,
  });

  const academicYears = [
    "2020-21",
    "2021-22",
    "2022-23",
    "2023-24",
    "2024-25",
    "2025-26",
    "2026-27",
  ];

  const platforms = [
    "NPTEL",
    "Coursera",
    "edX",
    "Udemy",
    "Internship",
    "Hackathon",
    "Workshop",
    "Industry Training",
    "Other",
  ];

  useEffect(() => {
    loadCertifications();
  }, []);

  const loadCertifications = async () => {
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: student } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!student) return;

    const { data } = await supabase
      .from("student_certifications")
      .select("*")
      .eq("student_id", student.id)
      .order("created_at", { ascending: false });

    setCertifications(data || []);
    setLoading(false);
  };

  const addCertification = async () => {
    if (!form.title || !form.platform || !form.year) {
      alert("Please fill all mandatory fields");
      return;
    }

    if (!form.driveLink && !form.file) {
      alert("Provide Drive link or upload certificate");
      return;
    }

    setSaving(true);

    const { data: { user } } = await supabase.auth.getUser();
    const { data: student } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", user.id)
      .single();

    let fileUrl = null;

    /* ===== FILE UPLOAD ===== */
    if (form.file) {
      const fileName = `${student.id}/${Date.now()}_${form.file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("certificates")
        .upload(fileName, form.file);

      if (uploadError) {
        alert("File upload failed");
        setSaving(false);
        return;
      }

      const { data } = supabase.storage
        .from("certificates")
        .getPublicUrl(fileName);

      fileUrl = data.publicUrl;
    }

    await supabase.from("student_certifications").insert([
      {
        student_id: student.id,
        title: form.title,
        platform: form.platform,
        year: form.year,
        drive_link: form.driveLink || null,
        file_url: fileUrl,
      },
    ]);

    setForm({
      title: "",
      platform: "",
      year: "",
      driveLink: "",
      file: null,
    });

    loadCertifications();
    setSaving(false);
  };

  const deleteCertification = async (id) => {
    if (!window.confirm("Delete this certification?")) return;

    await supabase
      .from("student_certifications")
      .delete()
      .eq("id", id);

    loadCertifications();
  };

  if (loading) {
    return <p className="p-6">Loading certifications...</p>;
  }

  return (
    <div className="p-6 max-w-6xl">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">
          My Certifications
        </h1>
        <p className="text-sm text-gray-500">
          MOOCs, Internships, Hackathons with proof
        </p>
      </div>

      {/* ADD FORM */}
      <div className="bg-white rounded-lg shadow border p-6 mb-6">
        <h2 className="font-medium mb-4">
          Add Certification
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            placeholder="Course / Internship Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="border rounded px-3 py-2"
          />

          <select
            value={form.platform}
            onChange={(e) =>
              setForm({ ...form, platform: e.target.value })
            }
            className="border rounded px-3 py-2"
          >
            <option value="">Select Platform</option>
            {platforms.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <select
            value={form.year}
            onChange={(e) =>
              setForm({ ...form, year: e.target.value })
            }
            className="border rounded px-3 py-2"
          >
            <option value="">Academic Year</option>
            {academicYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* PROOF */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Link2 className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              placeholder="Google Drive Certificate Link"
              value={form.driveLink}
              onChange={(e) =>
                setForm({ ...form, driveLink: e.target.value })
              }
              className="border rounded pl-10 pr-3 py-2 w-full"
            />
          </div>

          <label className="flex items-center gap-3 border rounded px-4 py-2 cursor-pointer hover:bg-gray-50">
            <Upload size={18} />
            <span className="text-sm">
              {form.file ? form.file.name : "Upload Certificate (PDF/Image)"}
            </span>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              hidden
              onChange={(e) =>
                setForm({ ...form, file: e.target.files[0] })
              }
            />
          </label>
        </div>

        <button
          onClick={addCertification}
          disabled={saving}
          className="mt-5 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          {saving ? "Saving..." : "Add Certification"}
        </button>
      </div>

      {/* LIST */}
      <div className="bg-white rounded-lg shadow border p-6">
        <h2 className="font-medium mb-4">
          Uploaded Certifications
        </h2>

        {certifications.length === 0 ? (
          <p className="text-gray-500">
            No certifications added yet.
          </p>
        ) : (
          <div className="space-y-3">
            {certifications.map((c) => (
              <div
                key={c.id}
                className="flex justify-between items-center p-4 border rounded hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium">{c.title}</p>
                  <p className="text-sm text-gray-600">
                    {c.platform} • {c.year}
                  </p>

                  <div className="flex gap-4 mt-1 text-sm">
                    {c.drive_link && (
                      <a
                        href={c.drive_link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        Drive Link
                      </a>
                    )}
                    {c.file_url && (
                      <a
                        href={c.file_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-600 hover:underline"
                      >
                        Uploaded File
                      </a>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => deleteCertification(c.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

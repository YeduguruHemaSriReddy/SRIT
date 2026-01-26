import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function FacultyCertifications() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    platform: "",
    year: "",
  });

  /* 🔹 REAL-WORLD OPTIONS */
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
    "SWAYAM",
    "Coursera",
    "edX",
    "Udemy",
    "AICTE FDP",
    "IIT FDP",
    "Industry Training",
    "Workshop / Seminar",
    "Other",
  ];

  useEffect(() => {
    loadCertifications();
  }, []);

  /* 🔹 LOAD CERTIFICATIONS */
  const loadCertifications = async () => {
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

    if (!faculty) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("faculty_certifications")
      .select("*")
      .eq("faculty_id", faculty.id)
      .order("year", { ascending: false });

    setCertifications(data || []);
    setLoading(false);
  };

  /* 🔹 ADD CERTIFICATION */
  const addCertification = async () => {
    if (!form.title || !form.platform || !form.year) {
      alert("Please fill all required fields");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: faculty } = await supabase
      .from("faculty")
      .select("id")
      .eq("user_id", user.id)
      .single();

    const { error } = await supabase
      .from("faculty_certifications")
      .insert([
        {
          faculty_id: faculty.id,
          title: form.title,
          platform: form.platform,
          year: form.year,
        },
      ]);

    if (error) {
      alert("Failed to add certification");
      console.error(error);
    } else {
      setForm({ title: "", platform: "", year: "" });
      loadCertifications();
    }
  };

  /* 🔹 DELETE CERTIFICATION */
  const deleteCertification = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this certification?"
    );

    if (!confirmDelete) return;

    await supabase
      .from("faculty_certifications")
      .delete()
      .eq("id", id);

    loadCertifications();
  };

  if (loading) return <p className="p-6">Loading certifications...</p>;

  return (
    <div className="max-w-3xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        Certifications & Courses
      </h2>

      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          placeholder="Course / FDP Title"
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

      <button
        onClick={addCertification}
        className="bg-indigo-600 text-white px-5 py-2 rounded mb-6"
      >
        Add Certification
      </button>

      {/* LIST */}
      {certifications.length === 0 ? (
        <p className="text-gray-500">
          No certifications added yet.
        </p>
      ) : (
        <div className="space-y-3">
          {certifications.map((c) => (
            <div
              key={c.id}
              className="flex justify-between items-center border rounded p-4"
            >
              <div>
                <p className="font-medium">{c.title}</p>
                <p className="text-sm text-gray-600">
                  {c.platform} • {c.year}
                </p>
              </div>

              <button
                onClick={() => deleteCertification(c.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

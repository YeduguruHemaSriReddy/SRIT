import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function StudentMaterials() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMaterials();
  }, []);

  const loadMaterials = async () => {
    setLoading(true);

    /* ---------- AUTH ---------- */
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    /* ---------- STUDENT ---------- */
    const { data: student } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!student) return;

    /* ---------- STUDENT SUBJECTS ---------- */
    const { data: subs } = await supabase
      .from("student_subjects")
      .select("subject_id")
      .eq("student_id", student.id);

    const subjectIds = subs?.map((s) => s.subject_id) || [];

    if (subjectIds.length === 0) {
      setMaterials([]);
      setLoading(false);
      return;
    }

    /* ---------- MATERIALS ---------- */
    const { data } = await supabase
      .from("materials")
      .select(
        `
        id,
        title,
        file_url,
        created_at,
        subjects ( name )
      `
      )
      .in("subject_id", subjectIds)
      .order("created_at", { ascending: false });

    setMaterials(data || []);
    setLoading(false);
  };

  if (loading) return <p className="p-6">Loading materials...</p>;

  return (
    <div className="p-6 max-w-4xl space-y-6">
      <h1 className="text-2xl font-semibold">
        Study Materials
      </h1>

      {materials.length === 0 ? (
        <p className="text-gray-500">
          No materials uploaded yet.
        </p>
      ) : (
        <div className="space-y-4">
          {materials.map((m) => (
            <div
              key={m.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-medium">
                  {m.title}
                </p>
                <p className="text-sm text-gray-500">
                  Subject: {m.subjects.name}
                </p>
                <p className="text-xs text-gray-400">
                  Uploaded on{" "}
                  {new Date(m.created_at).toLocaleDateString()}
                </p>
              </div>

              <a
                href={m.file_url}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 text-white px-4 py-2 rounded text-sm"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

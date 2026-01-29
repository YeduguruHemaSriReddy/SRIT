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

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data: student } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!student) return;

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

    const { data } = await supabase
      .from("materials")
      .select(
        `
        id,
        title,
        file_url,
        file_type,
        created_at,
        subjects ( name )
      `
      )
      .in("subject_id", subjectIds)
      .order("created_at", { ascending: false });

    setMaterials(data || []);
    setLoading(false);
  };

  /* ---------- DETECT TYPE (FOR OLD DATA TOO) ---------- */
  const getEffectiveType = (m) => {
    if (m.file_type && m.file_type !== "file") return m.file_type;

    const url = m.file_url.toLowerCase();
    if (url.endsWith(".pdf")) return "pdf";
    if (url.match(/\.(jpg|jpeg|png|gif|webp)$/)) return "image";
    if (url.match(/\.(mp4|webm|ogg)$/)) return "video";
    if (url.match(/\.(mp3|wav|aac)$/)) return "audio";

    return "file";
  };

  /* ---------- PREVIEW ---------- */
  const renderPreview = (m) => {
    const type = getEffectiveType(m);

    if (type === "image") {
      return (
        <img
          src={m.file_url}
          alt={m.title}
          className="w-full max-h-72 object-contain rounded border"
        />
      );
    }

    if (type === "video") {
      return (
        <video
          src={m.file_url}
          controls
          className="w-full rounded border"
        />
      );
    }

    if (type === "audio") {
      return (
        <audio
          src={m.file_url}
          controls
          className="w-full"
        />
      );
    }

    if (type === "pdf") {
      return (
        <iframe
          src={m.file_url}
          title={m.title}
          className="w-full h-96 border rounded"
        />
      );
    }

    return (
      <p className="text-sm text-gray-500 italic">
        Preview not available
      </p>
    );
  };

  if (loading)
    return (
      <p className="p-6 text-gray-500">
        Loading materials...
      </p>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">
        Study Materials
      </h1>

      {materials.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-gray-500">
          No materials uploaded yet.
        </div>
      ) : (
        materials.map((m) => {
          const type = getEffectiveType(m);

          return (
            <div
              key={m.id}
              className="bg-white rounded shadow overflow-hidden"
            >
              {/* HEADER */}
              <div className="p-4 border-b flex justify-between items-center">
                <div>
                  <h2 className="font-semibold">
                    {m.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Subject: {m.subjects.name}
                  </p>
                </div>

                <span className="text-xs px-3 py-1 rounded-full bg-gray-100 capitalize">
                  {type}
                </span>
              </div>

              {/* META */}
              <div className="px-4 py-2 text-xs text-gray-400">
                Uploaded on{" "}
                {new Date(m.created_at).toLocaleDateString()}
              </div>

              {/* PREVIEW */}
              <div className="p-4 bg-gray-50">
                {renderPreview(m)}
              </div>

              {/* ACTION */}
              <div className="p-4 flex justify-end">
                <a
                  href={m.file_url}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded text-sm"
                >
                  Download
                </a>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

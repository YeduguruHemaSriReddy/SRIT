import { useEffect, useState } from "react";
import { Trash2, Megaphone } from "lucide-react";
import supabase from "../../supabaseClient";

export default function AdminNotices() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [audience, setAudience] = useState("student");
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    const { data } = await supabase
      .from("notices")
      .select("*")
      .order("created_at", { ascending: false });

    setNotices(data || []);
  };

  const publishNotice = async () => {
    if (!title || !content) {
      alert("Title and content are required");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("notices").insert({
      title,
      content,
      audience,
      created_by: user.id,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setTitle("");
    setContent("");
    setAudience("student");
    fetchNotices();
  };

  const deleteNotice = async (id) => {
    const ok = window.confirm("Delete this notice?");
    if (!ok) return;

    await supabase.from("notices").delete().eq("id", id);
    fetchNotices();
  };

  const audienceBadge = (a) => {
    if (a === "student")
      return "bg-blue-100 text-blue-700";
    if (a === "faculty")
      return "bg-purple-100 text-purple-700";
    return "bg-emerald-100 text-emerald-700";
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-2xl font-semibold">
          Admin Notices
        </h1>
        <p className="text-sm text-gray-500">
          Publish official announcements to students and faculty
        </p>
      </div>

      {/* ===== CREATE NOTICE ===== */}
      <div className="bg-white rounded-lg shadow border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Megaphone className="text-purple-600" size={20} />
          <h2 className="text-lg font-medium">
            Publish New Notice
          </h2>
        </div>

        <div className="space-y-4">
          <input
            className="w-full border px-4 py-2 rounded"
            placeholder="Notice title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full border px-4 py-2 rounded"
            placeholder="Notice content"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="flex items-center gap-4">
            <select
              className="border px-3 py-2 rounded"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            >
              <option value="student">Students</option>
              <option value="faculty">Faculty</option>
              <option value="both">Both</option>
            </select>

            <button
              onClick={publishNotice}
              disabled={loading}
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
            >
              {loading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      </div>

      {/* ===== NOTICE LIST ===== */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">
          Published Notices
        </h2>

        {notices.length === 0 && (
          <p className="text-gray-500">
            No notices published yet.
          </p>
        )}

        {notices.map((n) => (
          <div
            key={n.id}
            className="bg-white border rounded-lg p-5 shadow-sm hover:shadow transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">
                  {n.title}
                </h3>
                <p className="text-gray-700 mt-1">
                  {n.content}
                </p>

                <div className="flex items-center gap-3 mt-3 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${audienceBadge(
                      n.audience
                    )}`}
                  >
                    {n.audience.toUpperCase()}
                  </span>

                  <span className="text-gray-400">
                    {new Date(n.created_at).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => deleteNotice(n.id)}
                className="text-red-500 hover:text-red-700"
                title="Delete notice"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState, useCallback } from "react";
import { Megaphone } from "lucide-react";
import supabase from "../../supabaseClient";

export default function FacultyAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [target, setTarget] = useState("student");

  const fetchAnnouncements = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: faculty } = await supabase
      .from("faculty")
      .select("id")
      .eq("user_id", user.id)
      .single();

    const { data } = await supabase
      .from("faculty_announcements")
      .select("*")
      .eq("faculty_id", faculty.id)
      .order("created_at", { ascending: false });

    setAnnouncements(data || []);
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const postAnnouncement = async () => {
    if (!title || !content) {
      alert("Title and content are required");
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

    await supabase.from("faculty_announcements").insert([
      {
        faculty_id: faculty.id,
        title,
        content,
        target_role: target,
      },
    ]);

    setTitle("");
    setContent("");
    setTarget("student");
    fetchAnnouncements();
  };

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const targetBadge = (role) => {
    if (role === "student")
      return "bg-blue-100 text-blue-700";
    if (role === "faculty")
      return "bg-purple-100 text-purple-700";
    return "bg-emerald-100 text-emerald-700";
  };

  return (
    <div className="p-6 max-w-5xl space-y-8">
      {/* ===== HEADER ===== */}
      <div className="flex items-center gap-3">
        <Megaphone className="text-emerald-600" />
        <div>
          <h1 className="text-2xl font-semibold">
            Faculty Announcements
          </h1>
          <p className="text-sm text-gray-500">
            Post announcements for students, faculty, or everyone
          </p>
        </div>
      </div>

      {/* ===== CREATE ANNOUNCEMENT ===== */}
      <div className="bg-white border rounded-lg shadow p-6 space-y-4">
        <h2 className="text-lg font-medium">
          Create Announcement
        </h2>

        <input
          className="border rounded px-3 py-2 w-full"
          placeholder="Announcement title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          rows="4"
          className="border rounded px-3 py-2 w-full"
          placeholder="Announcement content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex items-center gap-4">
          <select
            className="border rounded px-3 py-2"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          >
            <option value="student">Students</option>
            <option value="faculty">Faculty</option>
            <option value="all">All</option>
          </select>

          <button
            onClick={postAnnouncement}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded"
          >
            Post Announcement
          </button>
        </div>
      </div>

      {/* ===== ANNOUNCEMENTS LIST ===== */}
      <div className="space-y-4">
        {announcements.length === 0 ? (
          <div className="bg-white border rounded-lg p-6 text-center text-gray-500">
            No announcements posted yet.
          </div>
        ) : (
          announcements.map((a) => (
            <div
              key={a.id}
              className="bg-white border-l-4 border-emerald-600 rounded-lg shadow-sm p-5 hover:shadow transition"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {a.title}
                </h3>

                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${targetBadge(
                    a.target_role
                  )}`}
                >
                  {a.target_role === "all"
                    ? "All"
                    : a.target_role === "faculty"
                    ? "Faculty"
                    : "Students"}
                </span>
              </div>

              <p className="text-gray-700 mb-3 leading-relaxed">
                {a.content}
              </p>

              <p className="text-xs text-gray-500">
                Posted on {formatDate(a.created_at)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

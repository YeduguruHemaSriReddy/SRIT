import { useEffect, useState, useCallback } from "react";
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
      alert("Title and content required");
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
    fetchAnnouncements();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Faculty Announcements</h1>

      {/* CREATE */}
      <div className="bg-white p-4 rounded shadow space-y-3">
        <input
          className="border p-2 rounded w-full"
          placeholder="Announcement title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 rounded w-full"
          placeholder="Announcement content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex gap-3">
          <select
            className="border p-2 rounded"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          >
            <option value="student">Students</option>
            <option value="faculty">Faculty</option>
            <option value="all">All</option>
          </select>

          <button
            onClick={postAnnouncement}
            className="bg-emerald-600 text-white px-4 py-2 rounded"
          >
            Post
          </button>
        </div>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {announcements.map((a) => (
          <div
            key={a.id}
            className="bg-white p-4 rounded shadow"
          >
            <h3 className="font-semibold">{a.title}</h3>
            <p className="text-sm text-gray-600">{a.content}</p>
            <p className="text-xs text-gray-400 mt-1">
              Target: {a.target_role} |{" "}
              {new Date(a.created_at).toLocaleString()}
            </p>
          </div>
        ))}

        {announcements.length === 0 && (
          <p className="text-gray-500">No announcements yet</p>
        )}
      </div>
    </div>
  );
}

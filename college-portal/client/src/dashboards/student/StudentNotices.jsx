import { useEffect, useState, useCallback } from "react";
import supabase from "../../supabaseClient";

export default function StudentNotices() {
  const [notices, setNotices] = useState([]);

  const fetchNotices = useCallback(async () => {
    // 1️⃣ Admin notices (existing system)
    const { data: adminNotices } = await supabase
      .from("notices")
      .select("id, title, content, created_at")
      .in("audience", ["student", "both"])
      .order("created_at", { ascending: false });

    // 2️⃣ Faculty announcements (new system)
    const { data: facultyAnnouncements } = await supabase
      .from("faculty_announcements")
      .select("id, title, content, created_at")
      .in("target_role", ["student", "all"])
      .order("created_at", { ascending: false });

    // Normalize admin notices
    const formattedAdmin =
      adminNotices?.map((n) => ({
        ...n,
        source: "Admin",
      })) || [];

    // Normalize faculty announcements
    const formattedFaculty =
      facultyAnnouncements?.map((n) => ({
        ...n,
        source: "Faculty",
      })) || [];

    // Merge & sort
    const combined = [...formattedAdmin, ...formattedFaculty].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    setNotices(combined);
  }, []);

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        Notices & Announcements
      </h1>

      {notices.map((n) => (
        <div
          key={`${n.source}-${n.id}`}
          className="border p-3 rounded mb-3 bg-white shadow-sm"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">{n.title}</h3>
            <span
              className={`text-xs px-2 py-1 rounded ${
                n.source === "Admin"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {n.source}
            </span>
          </div>

          <p className="mt-1">{n.content}</p>

          <small className="text-gray-500 block mt-1">
            {new Date(n.created_at).toLocaleString()}
          </small>
        </div>
      ))}

      {notices.length === 0 && (
        <p className="text-gray-500">No notices available</p>
      )}
    </div>
  );
}

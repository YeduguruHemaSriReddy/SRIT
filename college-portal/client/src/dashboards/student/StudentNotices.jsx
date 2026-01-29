import { useEffect, useState, useCallback } from "react";
import supabase from "../../supabaseClient";

export default function StudentNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotices = useCallback(async () => {
    setLoading(true);

    try {
      /* ---------- ADMIN NOTICES ---------- */
      const { data: adminNotices } = await supabase
        .from("notices")
        .select("id, title, content, created_at")
        .in("audience", ["student", "both"])
        .order("created_at", { ascending: false });

      /* ---------- FACULTY ANNOUNCEMENTS ---------- */
      const { data: facultyAnnouncements } = await supabase
        .from("faculty_announcements")
        .select("id, title, content, created_at")
        .in("target_role", ["student", "all"])
        .order("created_at", { ascending: false });

      /* ---------- NORMALIZE ---------- */
      const formattedAdmin =
        adminNotices?.map((n) => ({
          ...n,
          source: "Admin",
        })) || [];

      const formattedFaculty =
        facultyAnnouncements?.map((n) => ({
          ...n,
          source: "Faculty",
        })) || [];

      /* ---------- MERGE & SORT ---------- */
      const combined = [...formattedAdmin, ...formattedFaculty].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setNotices(combined);
    } catch (err) {
      console.error("Failed to load notices", err);
      setNotices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        Loading notices...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-semibold mb-6">
        Notices & Announcements
      </h1>

      {notices.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center text-gray-500">
          No notices available right now
        </div>
      ) : (
        <div className="space-y-4">
          {notices.map((n) => (
            <div
              key={`${n.source}-${n.id}`}
              className="bg-white border rounded-lg p-4 shadow-sm hover:shadow transition"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-semibold text-lg">
                    {n.title}
                  </h3>
                  <p className="mt-2 text-gray-700">
                    {n.content}
                  </p>
                </div>

                <span
                  className={`shrink-0 text-xs px-3 py-1 rounded-full font-medium ${
                    n.source === "Admin"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {n.source}
                </span>
              </div>

              <div className="mt-3 text-sm text-gray-500">
                {new Date(n.created_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

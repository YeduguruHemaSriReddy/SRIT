import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import supabase from "../../supabaseClient";

export default function FacultyNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setLoading(true);

    const { data } = await supabase
      .from("notices")
      .select("*")
      .in("audience", ["faculty", "both"])
      .order("created_at", { ascending: false });

    setNotices(data || []);
    setLoading(false);
  };

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const audienceBadge = (audience) => {
    if (audience === "faculty") {
      return "bg-blue-100 text-blue-700";
    }
    return "bg-emerald-100 text-emerald-700";
  };

  return (
    <div className="p-6 max-w-5xl space-y-6">
      {/* ===== HEADER ===== */}
      <div className="flex items-center gap-3">
        <Bell className="text-emerald-600" />
        <div>
          <h1 className="text-2xl font-semibold">Faculty Notices</h1>
          <p className="text-sm text-gray-500">
            Official announcements shared by administration
          </p>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      {loading ? (
        <p className="text-gray-500">Loading notices...</p>
      ) : notices.length === 0 ? (
        <div className="bg-white rounded-lg border p-6 text-center text-gray-500">
          No notices available at the moment.
        </div>
      ) : (
        <div className="space-y-4">
          {notices.map((n) => (
            <div
              key={n.id}
              className="bg-white border-l-4 border-emerald-600 rounded-lg shadow-sm p-5 hover:shadow transition"
            >
              {/* Title + Badge */}
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {n.title}
                </h3>

                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${audienceBadge(
                    n.audience
                  )}`}
                >
                  {n.audience === "both" ? "All Staff" : "Faculty"}
                </span>
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-3 leading-relaxed">
                {n.content}
              </p>

              {/* Footer */}
              <div className="text-xs text-gray-500 flex items-center gap-2">
                <Bell size={14} />
                Posted on {formatDate(n.created_at)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Bell, Download, MessageSquare } from "lucide-react";

import supabase from "../../supabaseClient";
import API from "../../api";
import { useAuth } from "../../context/AuthContext";
import StatsCard from "../../components/StatsCard";

export default function StudentDashboard() {
  const { user, loading: authLoading } = useAuth();

  const [student, setStudent] = useState(null);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = useCallback(async () => {
    if (!user) return;

    try {
      // 🔹 Student profile
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;
      setStudent(data);

      // 🔹 Notices
      const res = await API.get("/notices?role=student");
      setNotices(res.data || []);
    } catch (err) {
      console.error("Student dashboard error:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  if (authLoading || loading) {
    return (
      <p className="p-10 text-center text-gray-500">
        Loading dashboard...
      </p>
    );
  }

  if (!student) {
    return (
      <p className="p-10 text-center text-red-500">
        Student profile not found
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-10">
        <h1 className="text-3xl font-bold">
          🎓 Student Dashboard
        </h1>
        <p className="text-white/80 mt-1">
          Welcome back, {student.roll_number || "Student"}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* ================= STATS ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard
            value={student.department}
            label="Department"
            delay={0.1}
          />
          <StatsCard
            value={`Year ${student.year}`}
            label="Academic Year"
            delay={0.2}
          />
          <StatsCard
            value={student.roll_number || "—"}
            label="Roll Number"
            delay={0.3}
          />
          <StatsCard
            value={student.phone || "—"}
            label="Phone"
            delay={0.4}
          />
        </div>

        {/* ================= QUICK ACTIONS ================= */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <ActionCard
            title="Notices"
            icon={<Bell />}
            link="/student/notices"
            color="from-blue-500 to-indigo-500"
          />
          <ActionCard
            title="Downloads"
            icon={<Download />}
            link="/student/downloads"
            color="from-green-500 to-emerald-500"
          />
          <ActionCard
            title="Grievances"
            icon={<MessageSquare />}
            link="/student/grievances"
            color="from-orange-500 to-red-500"
          />
        </div>

        {/* ================= RECENT NOTICES ================= */}
        <div>
          <h2 className="text-xl font-bold mb-4">
            📢 Recent Notices
          </h2>

          {notices.length === 0 && (
            <p className="text-gray-500">
              No notices available
            </p>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {notices.slice(0, 4).map((n) => (
              <div
                key={n.id}
                className="bg-white p-6 rounded-xl shadow"
              >
                <h3 className="font-semibold mb-2">
                  {n.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {n.description}
                </p>
                <p className="text-xs text-gray-400 mt-3">
                  {new Date(n.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- SUB COMPONENT ---------------- */

function ActionCard({ title, icon, link, color }) {
  return (
    <Link to={link}>
      <div
        className={`p-6 rounded-xl text-white bg-gradient-to-r ${color} shadow hover:scale-105 transition`}
      >
        <div className="flex items-center gap-3 text-xl font-bold">
          {icon}
          {title}
        </div>
        <p className="text-sm text-white/90 mt-2">
          Click to open
        </p>
      </div>
    </Link>
  );
}

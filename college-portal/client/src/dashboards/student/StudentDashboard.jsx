import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Bell,
  Download,
  MessageSquare,
} from "lucide-react";

export default function StudentDashboard() {
  const { user, loading: authLoading } = useAuth();

  const [student, setStudent] = useState(null);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    loadDashboard();
  }, [user]);

  const loadDashboard = async () => {
    try {
      // 🔹 Student profile
      const { data: studentData } = await supabase
        .from("students")
        .select("*")
        .eq("user_id", user.id)
        .single();

      setStudent(studentData);

      // 🔹 Notices (backend)
      const res = await fetch(
        "http://localhost:5000/api/notices?role=student"
      );
      const noticeData = await res.json();
      setNotices(noticeData || []);
    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return <p className="p-10 text-center">Loading dashboard...</p>;
  }

  if (!student) {
    return <p className="p-10 text-center">Student profile not found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-10">
        <h1 className="text-3xl font-bold">🎓 Student Dashboard</h1>
        <p className="text-white/80 mt-1">
          Welcome back, {student.roll_number || "Student"}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* ================= STATS ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Department" value={student.department} />
          <StatCard title="Year" value={`Year ${student.year}`} />
          <StatCard title="Roll No" value={student.roll_number || "—"} />
          <StatCard title="Phone" value={student.phone || "—"} />
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
          <h2 className="text-xl font-bold mb-4">📢 Recent Notices</h2>

          {notices.length === 0 && (
            <p className="text-gray-500">No notices available</p>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {notices.slice(0, 4).map((n) => (
              <div key={n.id} className="bg-white p-6 rounded-xl shadow">
                <h3 className="font-semibold mb-2">{n.title}</h3>
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

/* ---------------- COMPONENTS ---------------- */

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  );
}

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

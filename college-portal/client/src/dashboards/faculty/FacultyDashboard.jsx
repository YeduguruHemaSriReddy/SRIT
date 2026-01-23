import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Bell,
  Download,
  BookOpen,
  Users,
} from "lucide-react";

export default function FacultyDashboard() {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <p className="p-10 text-center">Loading...</p>;
  }

  if (!user || role !== "faculty") {
    return <p className="p-10 text-center">Unauthorized</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-10">
        <h1 className="text-3xl font-bold">👨‍🏫 Faculty Dashboard</h1>
        <p className="text-white/80 mt-1">
          Academic & administrative portal
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* ================= STATS ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Role" value="Faculty" />
          <StatCard title="Access Level" value="Academic" />
          <StatCard title="Resources" value="Notices & Files" />
          <StatCard title="Status" value="Active" />
        </div>

        {/* ================= QUICK ACTIONS ================= */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <ActionCard
            title="Notices"
            icon={<Bell />}
            link="/faculty/notices"
            color="from-blue-500 to-indigo-500"
          />
          <ActionCard
            title="Downloads"
            icon={<Download />}
            link="/faculty/downloads"
            color="from-purple-500 to-fuchsia-500"
          />
          <ActionCard
            title="Departments"
            icon={<BookOpen />}
            link="/departments"
            color="from-orange-500 to-red-500"
          />
        </div>

        {/* ================= INFO SECTION ================= */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-3">📌 Faculty Information</h2>
          <p className="text-gray-600 leading-relaxed">
            This portal enables faculty members to stay informed about
            institutional notices, download academic resources, and
            access department-related information efficiently.
          </p>
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

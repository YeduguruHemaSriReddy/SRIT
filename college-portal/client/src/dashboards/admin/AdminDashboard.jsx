import { Link } from "react-router-dom";
import {
  Bell,
  Download,
  MessageSquareWarning,
  ShieldCheck,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-10">
        <h1 className="text-3xl font-bold">🛠 Admin Dashboard</h1>
        <p className="text-white/80 mt-1">
          System administration & content control
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* ================= STATS ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Role" value="Administrator" />
          <StatCard title="Privileges" value="Full Access" />
          <StatCard title="Content Control" value="Enabled" />
          <StatCard title="System Status" value="Active" />
        </div>

        {/* ================= MANAGEMENT ACTIONS ================= */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <ActionCard
            title="Manage Notices"
            icon={<Bell />}
            link="/admin/notices"
            color="from-blue-600 to-indigo-600"
          />
          <ActionCard
            title="Manage Downloads"
            icon={<Download />}
            link="/admin/downloads"
            color="from-purple-600 to-fuchsia-600"
          />
          <ActionCard
            title="View Grievances"
            icon={<MessageSquareWarning />}
            link="/admin/grievances"
            color="from-orange-600 to-red-600"
          />
        </div>

        {/* ================= INFO PANEL ================= */}
        <div className="bg-white rounded-xl shadow p-6 flex gap-4 items-start">
          <div className="bg-red-100 text-red-600 p-3 rounded-full">
            <ShieldCheck />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Administrator Responsibilities</h2>
            <p className="text-gray-600 leading-relaxed">
              As an administrator, you are responsible for managing notices,
              controlling downloadable resources, and resolving student
              grievances to ensure smooth institutional operations.
            </p>
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
          Click to manage
        </p>
      </div>
    </Link>
  );
}

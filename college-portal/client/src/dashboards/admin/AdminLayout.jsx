import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  BookOpenCheck,
  Bell,
  ClipboardList,
  FileCheck2,
  IndianRupee,
  Calendar,
  LogOut,
} from "lucide-react";
import { MessageSquareWarning } from "lucide-react";
import supabase from "../../supabaseClient";

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-white shadow">
        <div className="p-6 font-bold text-xl text-purple-700">
          🛠️ Admin
        </div>

        <nav className="px-4 space-y-1">
          <SideLink
            to="/admin/dashboard"
            icon={<LayoutDashboard size={18} />}
          >
            Dashboard
          </SideLink>

          <SideLink
            to="/admin/students"
            icon={<Users size={18} />}
          >
            Students
          </SideLink>

          <SideLink
            to="/admin/notices"
            icon={<Bell size={18} />}
          >
            Notices
          </SideLink>

          <SideLink
            to="/admin/faculty-subject"
            icon={<BookOpen size={18} />}
          >
            Faculty–Subject
          </SideLink>

          <SideLink
            to="/admin/student-assign"
            icon={<BookOpenCheck size={18} />}
          >
            Student–Subject Mapping
          </SideLink>

          <SideLink
            to="/admin/faculty-leaves"
            icon={<ClipboardList size={18} />}
          >
            Faculty Leaves
          </SideLink>

          <SideLink
            to="/admin/exam-control"
            icon={<FileCheck2 size={18} />}
          >
            Exam Control
          </SideLink>

          <SideLink
            to="/admin/fee-management"
            icon={<IndianRupee size={18} />}
          >
            Fee Management
          </SideLink>
<SideLink
  to="/admin/grievances"
  icon={<MessageSquareWarning size={18} />}
>
  Grievances
</SideLink>

          <SideLink
            to="/admin/timetable"
            icon={<Calendar size={18} />}
          >
            Timetable
          </SideLink>

          {/* LOGOUT */}
          <button
            onClick={logout}
            className="flex gap-3 px-4 py-2 mt-6 text-red-600 hover:bg-red-50 w-full rounded transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </nav>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col">
        {/* TOP BAR */}
        <header className="h-16 bg-white shadow flex items-center px-6">
          <h2 className="font-semibold text-lg">
            Admin Portal
          </h2>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

/* ================= SIDEBAR LINK ================= */
function SideLink({ to, icon, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded transition ${
          isActive
            ? "bg-purple-600 text-white"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      {icon}
      <span className="text-sm font-medium">
        {children}
      </span>
    </NavLink>
  );
}

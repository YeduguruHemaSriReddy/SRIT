import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Bell,
  LogOut,
  Calendar,
} from "lucide-react";
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

        <nav className="px-4 space-y-2">
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
            icon={<BookOpen size={18} />}
          >
            Student–Subject Mapping
          </SideLink>
          <SideLink to="faculty-leaves">Faculty Leaves</SideLink>
          <SideLink to="exam-control">
  Exam Control
</SideLink>
<SideLink to="fee-management">
  Fee Management
</SideLink>
          <SideLink to="/admin/timetable" icon={<Calendar />}>
  Timetable
</SideLink>
          <button
            onClick={logout}
            className="flex gap-3 px-4 py-2 mt-6 text-red-600 hover:bg-red-50 w-full rounded"
          >
            <LogOut size={18} /> Logout
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

/* ---------- SIDEBAR LINK ---------- */
function SideLink({ to, icon, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex gap-3 px-4 py-2 rounded transition ${
          isActive
            ? "bg-purple-600 text-white"
            : "hover:bg-gray-100 text-gray-700"
        }`
      }
    >
      {icon}
      {children}
    </NavLink>
  );
}

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  ClipboardList,
  BookOpen,
  Bell,
  Download,
  LogOut,
  User,
} from "lucide-react";
import supabase from "../../supabaseClient";

export default function StudentLayout() {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow">
        <div className="p-6 font-bold text-xl text-indigo-600">
          🎓 Student
        </div>

        <nav className="px-4 space-y-2">
          <SideLink to="/student/dashboard" icon={<LayoutDashboard size={18} />}>
            Dashboard
          </SideLink>

          <SideLink to="/student/attendance" icon={<CalendarCheck size={18} />}>
            Attendance
          </SideLink>

          <SideLink to="/student/marks" icon={<ClipboardList size={18} />}>
            Marks
          </SideLink>

          <SideLink to="/student/materials" icon={<BookOpen size={18} />}>
            Materials
          </SideLink>

          <SideLink to="/student/timetable" icon={<CalendarCheck size={18} />}>
            Timetable
          </SideLink>

          <SideLink to="/student/notices" icon={<Bell size={18} />}>
            Notices
          </SideLink>

          <SideLink to="/student/downloads" icon={<Download size={18} />}>
            Downloads
          </SideLink>

          <button
            onClick={logout}
            className="flex gap-3 px-4 py-2 mt-6 text-red-600 hover:bg-red-50 w-full rounded"
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white shadow flex justify-between items-center px-6">
          <h2 className="font-semibold">Student Portal</h2>

          <button
            onClick={() => navigate("/student/profile")}
            className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded"
          >
            <User size={18} /> Profile
          </button>
        </header>

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SideLink({ to, icon, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex gap-3 px-4 py-2 rounded transition ${
          isActive
            ? "bg-indigo-600 text-white"
            : "hover:bg-gray-100 text-gray-700"
        }`
      }
    >
      {icon}
      {children}
    </NavLink>
  );
}

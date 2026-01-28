import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Bell,
  Upload,
  LogOut,
  User,
  Calendar,
  Award,
  BarChart,
  Clipboard,
} from "lucide-react";
import supabase from "../../supabaseClient";

export default function FacultyLayout() {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow">
        <div className="p-6 font-bold text-xl text-emerald-600">
          👨‍🏫 Faculty
        </div>

        <nav className="px-4 space-y-2">
          <SidebarLink to="dashboard" icon={<LayoutDashboard size={18} />}>
            Dashboard
          </SidebarLink>

          <SidebarLink to="subjects" icon={<BookOpen size={18} />}>
            Subjects
          </SidebarLink>

          <SidebarLink to="materials" icon={<Upload size={18} />}>
            Materials
          </SidebarLink>

          <SidebarLink to="timetable" icon={<Calendar size={18} />}>
            Timetable
          </SidebarLink>

          <SidebarLink to="certifications" icon={<Award size={18} />}>
            Certifications
          </SidebarLink>

          <SidebarLink
            to="attendance-analytics"
            icon={<BarChart size={18} />}
          >
            Attendance Analytics
          </SidebarLink>

          {/* ✅ NEW LEAVE LINK */}
          <SidebarLink to="leave" icon={<Clipboard size={18} />}>
            Leave Requests
          </SidebarLink>
          <SidebarLink to="marks-analytics">
  Marks Analytics
</SidebarLink>
          <SidebarLink to="notices" icon={<Bell size={18} />}>
            Notices
          </SidebarLink>
<SidebarLink to="announcements" icon={<Bell size={18} />}>
  Announcements
</SidebarLink>

          <button
            onClick={logout}
            className="flex gap-3 px-4 py-2 mt-6 text-red-600"
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white shadow flex justify-between items-center px-6">
          <h2 className="font-semibold">Faculty Portal</h2>

          <button
            onClick={() => navigate("profile")}
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

function SidebarLink({ to, icon, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex gap-3 px-4 py-2 rounded ${
          isActive ? "bg-emerald-600 text-white" : "hover:bg-gray-100"
        }`
      }
    >
      {icon}
      {children}
    </NavLink>
  );
}

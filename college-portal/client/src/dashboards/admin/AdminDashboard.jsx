import { useEffect, useState } from "react";
import {
  Users,
  UserCheck,
  BookOpen,
  AlertTriangle,
  GraduationCap,
  Bell,
  Layers,
} from "lucide-react";
import supabase from "../../supabaseClient";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    students: 0,
    faculty: 0,
    subjects: 0,
    grievances: 0,
  });

  const [recentStudents, setRecentStudents] = useState([]);
  const [recentMappings, setRecentMappings] = useState([]);
  const [recentNotices, setRecentNotices] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const [
      students,
      faculty,
      subjects,
      grievances,
      rStudents,
      rMappings,
      rNotices,
    ] = await Promise.all([
      supabase.from("students").select("id", { count: "exact" }),
      supabase.from("faculty").select("id", { count: "exact" }),
      supabase.from("subjects").select("id", { count: "exact" }),
      supabase
        .from("grievances")
        .select("id", { count: "exact" })
        .eq("status", "Pending"),

      supabase
        .from("students")
        .select("roll_number, department")
        .order("created_at", { ascending: false })
        .limit(5),

      supabase
        .from("faculty_subjects")
        .select(`
          section,
          faculty ( name ),
          subjects ( name )
        `)
        .order("created_at", { ascending: false })
        .limit(5),

      supabase
        .from("notices")
        .select("title")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

    setStats({
      students: students.count || 0,
      faculty: faculty.count || 0,
      subjects: subjects.count || 0,
      grievances: grievances.count || 0,
    });

    setRecentStudents(rStudents.data || []);
    setRecentMappings(rMappings.data || []);
    setRecentNotices(rNotices.data || []);
  };

  return (
    <div className="space-y-8">
      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-2xl font-semibold">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Overview of academic and administrative activities
        </p>
      </div>

      {/* ===== KPI CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={stats.students}
          icon={<GraduationCap />}
          color="bg-blue-100 text-blue-700"
        />
        <StatCard
          title="Faculty Members"
          value={stats.faculty}
          icon={<UserCheck />}
          color="bg-emerald-100 text-emerald-700"
        />
        <StatCard
          title="Subjects Offered"
          value={stats.subjects}
          icon={<BookOpen />}
          color="bg-purple-100 text-purple-700"
        />
        <StatCard
          title="Pending Grievances"
          value={stats.grievances}
          icon={<AlertTriangle />}
          color="bg-red-100 text-red-700"
        />
      </div>

      {/* ===== RECENT ACTIVITY ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Panel
          title="Recent Students"
          icon={<Users size={18} />}
        >
          {recentStudents.length === 0 ? (
            <Empty />
          ) : (
            recentStudents.map((s, i) => (
              <Item
                key={i}
                primary={s.roll_number}
                secondary={s.department}
              />
            ))
          )}
        </Panel>

        <Panel
          title="Faculty Assignments"
          icon={<Layers size={18} />}
        >
          {recentMappings.length === 0 ? (
            <Empty />
          ) : (
            recentMappings.map((m, i) => (
              <Item
                key={i}
                primary={`${m.faculty.name} → ${m.subjects.name}`}
                secondary={`Section ${m.section}`}
              />
            ))
          )}
        </Panel>

        <Panel
          title="Latest Notices"
          icon={<Bell size={18} />}
        >
          {recentNotices.length === 0 ? (
            <Empty />
          ) : (
            recentNotices.map((n, i) => (
              <Item key={i} primary={n.title} />
            ))
          )}
        </Panel>
      </div>
    </div>
  );
}

/* ================= UI COMPONENTS ================= */

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-lg shadow border p-5 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">
          {title}
        </p>
        <p className="text-2xl font-bold mt-1">
          {value}
        </p>
      </div>
      <div
        className={`p-3 rounded-full ${color}`}
      >
        {icon}
      </div>
    </div>
  );
}

function Panel({ title, icon, children }) {
  return (
    <div className="bg-white rounded-lg shadow border p-4">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Item({ primary, secondary }) {
  return (
    <div className="border rounded px-3 py-2 text-sm">
      <p className="font-medium text-gray-800">
        {primary}
      </p>
      {secondary && (
        <p className="text-xs text-gray-500">
          {secondary}
        </p>
      )}
    </div>
  );
}

function Empty() {
  return (
    <p className="text-sm text-gray-500">
      No data available
    </p>
  );
}

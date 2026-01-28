import { useEffect, useState } from "react";
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
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card title="Students" value={stats.students} />
        <Card title="Faculty" value={stats.faculty} />
        <Card title="Subjects" value={stats.subjects} />
        <Card
          title="Pending Grievances"
          value={stats.grievances}
          danger
        />
      </div>

      {/* ================= RECENT SECTIONS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* STUDENTS */}
        <Panel title="Recent Students">
          {recentStudents.map((s, i) => (
            <p key={i}>
              {s.roll_number} — {s.department}
            </p>
          ))}
        </Panel>

        {/* FACULTY SUBJECT */}
        <Panel title="Recent Faculty Assignments">
          {recentMappings.map((m, i) => (
            <p key={i}>
              {m.faculty.name} → {m.subjects.name} ({m.section})
            </p>
          ))}
        </Panel>

        {/* NOTICES */}
        <Panel title="Latest Notices">
          {recentNotices.map((n, i) => (
            <p key={i}>{n.title}</p>
          ))}
        </Panel>
      </div>
    </div>
  );
}

/* ================= UI COMPONENTS ================= */

function Card({ title, value, danger }) {
  return (
    <div
      className={`p-5 rounded shadow bg-white ${
        danger ? "border-l-4 border-red-500" : ""
      }`}
    >
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="text-sm text-gray-600 space-y-1">
        {children.length === 0 ? "No data" : children}
      </div>
    </div>
  );
}

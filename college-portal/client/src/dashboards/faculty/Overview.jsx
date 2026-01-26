import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";

export default function Overview() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    subjects: 0,
    students: 0,
    pendingAttendance: 0,
    pendingMarks: 0,
  });

  useEffect(() => {
    if (user) loadOverview();
  }, [user]);

  const loadOverview = async () => {
    const { data: faculty } = await supabase
      .from("faculty")
      .select("id")
      .eq("user_id", user.id)
      .single();

    const { count: subjects } = await supabase
      .from("faculty_subjects")
      .select("*", { count: "exact", head: true })
      .eq("faculty_id", faculty.id);

    setStats({
      subjects: subjects || 0,
      students: (subjects || 0) * 60,
      pendingAttendance: 2,
      pendingMarks: 1,
    });
  };

  return (
    <>
      {/* HEADER */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-6 rounded-xl mb-8">
        <h1 className="text-3xl font-bold">
          Good Morning, Professor 👋
        </h1>
        <p className="opacity-90 mt-1">
          You have {stats.subjects} classes scheduled today.
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <Stat title="Subjects" value={stats.subjects} />
        <Stat title="Total Students" value={stats.students} />
        <Stat title="Pending Attendance" value={stats.pendingAttendance} />
        <Stat title="Pending Marks" value={stats.pendingMarks} />
      </div>

      {/* PANELS */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Panel title="Today's Classes">
          <p className="text-gray-500">Dynamic timetable coming next</p>
        </Panel>

        <Panel title="Pending Tasks">
          <ul className="space-y-2 text-sm">
            <li>📌 Upload attendance – CSE A</li>
            <li>📌 Enter marks – CSE B</li>
          </ul>
        </Panel>
      </div>
    </>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}

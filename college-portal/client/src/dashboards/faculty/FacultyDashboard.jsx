import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";
import PortalHeader from "../../components/PortalHeader";
export default function FacultyDashboard() {
  const [pendingAttendance, setPendingAttendance] = useState([]);
  const [pendingMarks, setPendingMarks] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    const today = new Date().toISOString().split("T")[0];

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: faculty } = await supabase
      .from("faculty")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!faculty) return;

    const { data: facultySubjects } = await supabase
      .from("faculty_subjects")
      .select(`subject_id, subjects ( id, name )`)
      .eq("faculty_id", faculty.id);

    const attendancePending = [];
    const marksPending = [];
    const activityList = [];

    for (const fs of facultySubjects || []) {
      const subjectId = fs.subjects.id;
      const subjectName = fs.subjects.name;

      const { count: studentCount } = await supabase
        .from("student_subjects")
        .select("*", { count: "exact", head: true })
        .eq("subject_id", subjectId);

      if (!studentCount) continue;

      // Attendance
      const { count: attendanceCount, data: attendanceRows } =
        await supabase
          .from("attendance")
          .select("created_at", { count: "exact" })
          .eq("subject_id", subjectId)
          .eq("date", today);

      if (attendanceCount === 0) {
        attendancePending.push({ id: subjectId, name: subjectName });
      } else {
        activityList.push({
          type: "Attendance marked",
          subject: subjectName,
          time: attendanceRows?.[0]?.created_at,
        });
      }

      // Marks
      const { count: marksCount, data: marksRows } =
        await supabase
          .from("marks")
          .select("created_at", { count: "exact" })
          .eq("subject_id", subjectId);

      if (marksCount === 0) {
        marksPending.push({ id: subjectId, name: subjectName });
      } else {
        activityList.push({
          type: "Marks updated",
          subject: subjectName,
          time: marksRows?.[0]?.created_at,
        });
      }
    }

    const { data: materialRows } = await supabase
      .from("materials")
      .select(`created_at, subjects ( name )`)
      .eq("uploaded_by", faculty.id);

    materialRows?.forEach((m) =>
      activityList.push({
        type: "Material uploaded",
        subject: m.subjects.name,
        time: m.created_at,
      })
    );

    activityList.sort((a, b) => new Date(b.time) - new Date(a.time));

    setPendingAttendance(attendancePending);
    setPendingMarks(marksPending);
    setActivities(activityList.slice(0, 5));
    setLoading(false);
  };

  if (loading) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  return (
    <div className="p-6 max-w-5xl space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Faculty Dashboard</h1>
        <p className="text-sm text-gray-500">
          Overview of today’s academic responsibilities
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard
          title="Attendance Pending"
          value={pendingAttendance.length}
          color="bg-red-50 text-red-700"
        />
        <SummaryCard
          title="Marks Pending"
          value={pendingMarks.length}
          color="bg-yellow-50 text-yellow-700"
        />
        <SummaryCard
          title="Recent Activities"
          value={activities.length}
          color="bg-green-50 text-green-700"
        />
      </div>

      {/* ATTENDANCE */}
      <Section title="⚠ Attendance Pending (Today)">
        {pendingAttendance.length === 0 ? (
          <Empty text="All attendance marked ✔" />
        ) : (
          pendingAttendance.map((s) => (
            <Row
              key={s.id}
              text={s.name}
              action="Mark Attendance"
              onClick={() =>
                navigate(`/faculty/attendance/${s.id}`)
              }
            />
          ))
        )}
      </Section>

      {/* MARKS */}
      <Section title="⚠ Marks Pending">
        {pendingMarks.length === 0 ? (
          <Empty text="All marks entered ✔" />
        ) : (
          pendingMarks.map((s) => (
            <Row
              key={s.id}
              text={s.name}
              action="Enter Marks"
              onClick={() =>
                navigate(`/faculty/marks/${s.id}`)
              }
            />
          ))
        )}
      </Section>

      {/* ACTIVITY */}
      <Section title="🕒 Recent Activity">
        {activities.length === 0 ? (
          <Empty text="No recent activity" />
        ) : (
          <ul className="space-y-2 text-sm">
            {activities.map((a, i) => (
              <li key={i} className="flex justify-between">
                <span>
                  ✔ {a.type} – <b>{a.subject}</b>
                </span>
                <span className="text-gray-400">
                  {new Date(a.time).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </div>
  );
}

/* ---------- UI COMPONENTS ---------- */

function SummaryCard({ title, value, color }) {
  return (
    <div className={`p-4 rounded-lg border ${color}`}>
      <p className="text-sm">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow border">
      <h2 className="font-semibold text-lg mb-3">{title}</h2>
      {children}
    </div>
  );
}

function Row({ text, action, onClick }) {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <span className="text-sm">{text}</span>
      <button
        onClick={onClick}
        className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded"
      >
        {action}
      </button>
    </div>
  );
}

function Empty({ text }) {
  return <p className="text-green-600 text-sm">{text}</p>;
}

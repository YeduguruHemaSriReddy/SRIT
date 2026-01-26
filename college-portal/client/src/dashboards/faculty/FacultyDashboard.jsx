import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";

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

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    // 🔹 Get faculty id
    const { data: faculty, error: facultyError } = await supabase
      .from("faculty")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (facultyError || !faculty) {
      setLoading(false);
      return;
    }

    // 🔹 Get subjects handled by faculty
    const { data: facultySubjects } = await supabase
      .from("faculty_subjects")
      .select(
        `
        subject_id,
        subjects (
          id,
          name
        )
      `
      )
      .eq("faculty_id", faculty.id);

    const attendancePending = [];
    const marksPending = [];
    const activityList = [];

    for (const fs of facultySubjects || []) {
      const subjectId = fs.subjects.id;
      const subjectName = fs.subjects.name;

      // Check students exist for subject
      const { count: studentCount } = await supabase
        .from("student_subjects")
        .select("*", { count: "exact", head: true })
        .eq("subject_id", subjectId);

      if (!studentCount) continue;

      // 🔴 Attendance check (today)
      const { count: attendanceCount, data: attendanceRows } =
        await supabase
          .from("attendance")
          .select("created_at", {
            count: "exact",
            head: false,
          })
          .eq("subject_id", subjectId)
          .eq("date", today);

      if (attendanceCount === 0) {
        attendancePending.push({
          id: subjectId,
          name: subjectName,
        });
      } else {
        activityList.push({
          type: "Attendance marked",
          subject: subjectName,
          time: attendanceRows[0]?.created_at,
        });
      }

      // 🟠 Marks check
      const { count: marksCount, data: marksRows } =
        await supabase
          .from("marks")
          .select("created_at", {
            count: "exact",
            head: false,
          })
          .eq("subject_id", subjectId);

      if (marksCount === 0) {
        marksPending.push({
          id: subjectId,
          name: subjectName,
        });
      } else {
        activityList.push({
          type: "Marks updated",
          subject: subjectName,
          time: marksRows[0]?.created_at,
        });
      }
    }

    // 📁 Materials uploaded
    const { data: materialRows } = await supabase
      .from("materials")
      .select(
        `
        created_at,
        subjects ( name )
      `
      )
      .eq("uploaded_by", faculty.id);

    materialRows?.forEach((m) =>
      activityList.push({
        type: "Material uploaded",
        subject: m.subjects.name,
        time: m.created_at,
      })
    );

    // Sort latest first
    activityList.sort(
      (a, b) => new Date(b.time) - new Date(a.time)
    );

    setPendingAttendance(attendancePending);
    setPendingMarks(marksPending);
    setActivities(activityList.slice(0, 5));
    setLoading(false);
  };

  if (loading) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  return (
    <div className="p-6 max-w-4xl space-y-8">
      <h1 className="text-2xl font-semibold">Faculty Dashboard</h1>

      {/* 🔴 Attendance Pending */}
      <Section
        title="⚠ Attendance Pending (Today)"
        empty="All attendance marked ✔"
      >
        {pendingAttendance.map((s) => (
          <Row
            key={s.id}
            text={s.name}
            action="Mark"
            onClick={() =>
              navigate(`/faculty/attendance/${s.id}`)
            }
          />
        ))}
      </Section>

      {/* 🟠 Marks Pending */}
      <Section
        title="⚠ Marks Pending"
        empty="All marks entered ✔"
      >
        {pendingMarks.map((s) => (
          <Row
            key={s.id}
            text={s.name}
            action="Enter"
            onClick={() =>
              navigate(`/faculty/marks/${s.id}`)
            }
          />
        ))}
      </Section>

      {/* 🕒 Activity Log */}
      <div className="bg-white p-5 rounded shadow">
        <h2 className="font-semibold text-lg mb-3">
          🕒 Recent Activity
        </h2>

        {activities.length === 0 ? (
          <p className="text-gray-500">
            No recent activity
          </p>
        ) : (
          <ul className="space-y-2">
            {activities.map((a, i) => (
              <li
                key={i}
                className="text-sm text-gray-700"
              >
                ✔ {a.type} – {a.subject}
                <span className="text-gray-400 ml-2">
                  ({new Date(a.time).toLocaleString()})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ---------- UI HELPERS ---------- */

function Section({ title, empty, children }) {
  return (
    <div className="bg-white p-5 rounded shadow">
      <h2 className="font-semibold text-lg mb-3">
        {title}
      </h2>
      {children.length === 0 ? (
        <p className="text-green-600">{empty}</p>
      ) : (
        <div className="space-y-2">{children}</div>
      )}
    </div>
  );
}

function Row({ text, action, onClick }) {
  return (
    <div className="flex justify-between items-center">
      <span>{text}</span>
      <button
        onClick={onClick}
        className="text-sm bg-indigo-600 text-white px-3 py-1 rounded"
      >
        {action}
      </button>
    </div>
  );
}

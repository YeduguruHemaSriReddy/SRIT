import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function StudentDashboard() {
  const [attendance, setAttendance] = useState(0);
  const [marksCount, setMarksCount] = useState(0);
  const [materialsCount, setMaterialsCount] = useState(0);
  const [feesStatus, setFeesStatus] = useState("Pending");
  const [todayClasses, setTodayClasses] = useState([]);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    /* ---------- STUDENT ---------- */
    const { data: student } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!student) return;

    /* ---------- SUBJECTS ---------- */
    const { data: subs } = await supabase
      .from("student_subjects")
      .select("subject_id")
      .eq("student_id", student.id);

    const subjectIds = subs?.map((s) => s.subject_id) || [];

    /* ---------- ATTENDANCE ---------- */
    const { data: attendanceData } = await supabase
      .from("attendance")
      .select("status")
      .eq("student_id", student.id);

    if (attendanceData?.length) {
      const present = attendanceData.filter((a) => a.status).length;
      setAttendance(
        Math.round((present / attendanceData.length) * 100)
      );
    }

    /* ---------- MARKS ---------- */
    const { data: marks } = await supabase
      .from("marks")
      .select("id")
      .eq("student_id", student.id);

    setMarksCount(marks?.length || 0);

    /* ---------- MATERIALS ---------- */
    if (subjectIds.length > 0) {
      const { data: mats } = await supabase
        .from("materials")
        .select("id")
        .in("subject_id", subjectIds);

      setMaterialsCount(mats?.length || 0);
    }

    /* ---------- FEES ---------- */
    const { data: fees } = await supabase
      .from("fees")
      .select("status")
      .eq("student_id", student.id)
      .single();

    if (fees?.status) setFeesStatus(fees.status);

    /* ---------- TODAY CLASSES ---------- */
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
    });

    const { data: timetable } = await supabase
      .from("faculty_timetable")
      .select("period, subjects(name)")
      .in("subject_id", subjectIds)
      .eq("day", today);

    setTodayClasses(timetable || []);

    /* ---------- NOTICES ---------- */
    const { data: noticesData } = await supabase
      .from("notices")
      .select("title, created_at")
      .order("created_at", { ascending: false })
      .limit(3);

    setNotices(noticesData || []);
  };

  const attendanceColor =
    attendance >= 75
      ? "bg-green-100 text-green-700"
      : attendance >= 65
      ? "bg-orange-100 text-orange-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        Student Dashboard
      </h1>

      {/* ===== STATS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Attendance" value={`${attendance}%`} color={attendanceColor} />
        <Card title="Marks" value={marksCount > 0 ? "Published" : "Not Published"} />
        <Card title="Materials" value={materialsCount} />
        <Card title="Fees" value={feesStatus} />
      </div>

      {/* ===== TODAY CLASSES ===== */}
      <Section title="Today's Classes">
        {todayClasses.length === 0 ? (
          <p className="text-gray-500">No classes today</p>
        ) : (
          todayClasses.map((c, i) => (
            <p key={i}>
              Period {c.period} – {c.subjects.name}
            </p>
          ))
        )}
      </Section>

      {/* ===== NOTICES ===== */}
      <Section title="Recent Notices">
        {notices.length === 0 ? (
          <p className="text-gray-500">No notices</p>
        ) : (
          notices.map((n, i) => (
            <p key={i}>{n.title}</p>
          ))
        )}
      </Section>
    </div>
  );
}

/* ---------- SMALL COMPONENTS ---------- */
function Card({ title, value, color = "bg-gray-100" }) {
  return (
    <div className={`p-4 rounded ${color}`}>
      <p className="text-sm">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">{title}</h2>
      {children}
    </div>
  );
}

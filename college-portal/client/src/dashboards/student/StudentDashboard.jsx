import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function StudentDashboard() {
  const [attendancePct, setAttendancePct] = useState(0);
  const [marksStatus, setMarksStatus] = useState("Pending");
  const [todayClasses, setTodayClasses] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);

    /* ================= AUTH ================= */
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    /* ================= STUDENT (SAFE FETCH) ================= */
    let { data: student } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    /* ---------- AUTO CREATE STUDENT ---------- */
    if (!student) {
      const { data: newStudent, error } = await supabase
        .from("students")
        .insert({
          user_id: user.id,
          roll_number: "TEMP",
          department: "Not Assigned",
          year: 0,
        })
        .select()
        .single();

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      student = newStudent;
    }

    /* ================= ATTENDANCE % (OVERALL) ================= */
    const { data: attRows } = await supabase
      .from("attendance")
      .select("status")
      .eq("student_id", student.id);

    if (!attRows || attRows.length === 0) {
      setAttendancePct(0);
    } else {
      const present = attRows.filter((a) => a.status).length;
      setAttendancePct(
        Math.round((present / attRows.length) * 100)
      );
    }

    /* ================= MARKS STATUS ================= */
    const { data: subjects } = await supabase
      .from("student_subjects")
      .select("subject_id")
      .eq("student_id", student.id);

    let pending = false;

    for (const s of subjects || []) {
      const { data: mark } = await supabase
        .from("marks")
        .select("id")
        .eq("student_id", student.id)
        .eq("subject_id", s.subject_id)
        .maybeSingle();

      if (!mark) {
        pending = true;
        break;
      }
    }

    setMarksStatus(pending ? "Pending" : "Available");

    /* ================= TODAY’S CLASSES ================= */
    const today = new Date().toLocaleString("en-US", {
      weekday: "long",
    });

    const subjectIds = subjects?.map((s) => s.subject_id) || [];

    if (subjectIds.length > 0) {
      const { data } = await supabase
        .from("faculty_timetable")
        .select(
          `
          period,
          subjects ( name )
        `
        )
        .eq("day", today)
        .in("subject_id", subjectIds)
        .order("period");

      setTodayClasses(data || []);
    } else {
      setTodayClasses([]);
    }

    /* ================= NOTICES ================= */
    const { data: noticeRows } = await supabase
      .from("notices")
      .select("title")
      .in("target_role", ["student", "all"])
      .order("created_at", { ascending: false })
      .limit(5);

    setNotices(noticeRows || []);

    setLoading(false);
  };

  if (loading) return <p className="p-6">Loading dashboard...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">
        Student Dashboard
      </h1>

      {/* ================= TOP CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-red-100 p-5 rounded shadow">
          <p className="text-sm text-gray-600">Attendance</p>
          <p className="text-2xl font-bold">
            {attendancePct}%
          </p>
        </div>

        <div className="bg-green-100 p-5 rounded shadow">
          <p className="text-sm text-gray-600">Marks</p>
          <p className="text-2xl font-bold">
            {marksStatus}
          </p>
        </div>
      </div>

      {/* ================= TODAY CLASSES ================= */}
      <div className="bg-white p-5 rounded shadow">
        <h2 className="font-semibold mb-2">
          📅 Today’s Classes
        </h2>

        {todayClasses.length === 0 ? (
          <p className="text-gray-500">
            No classes today
          </p>
        ) : (
          <ul className="list-disc ml-6">
            {todayClasses.map((c, i) => (
              <li key={i}>
                Period {c.period} — {c.subjects.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ================= NOTICES ================= */}
      <div className="bg-white p-5 rounded shadow">
        <h2 className="font-semibold mb-2">
          📢 Recent Notices
        </h2>

        {notices.length === 0 ? (
          <p className="text-gray-500">
            No notices
          </p>
        ) : (
          <ul className="list-disc ml-6">
            {notices.map((n, i) => (
              <li key={i}>{n.title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

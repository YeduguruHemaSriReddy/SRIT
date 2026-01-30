import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import { motion } from "framer-motion";
import PortalHeader from "../../components/PortalHeader";
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
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: student } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!student) return;

    const { data: subs } = await supabase
      .from("student_subjects")
      .select("subject_id")
      .eq("student_id", student.id);

    const subjectIds = subs?.map(s => s.subject_id) || [];

    const { data: attendanceData } = await supabase
      .from("attendance")
      .select("status")
      .eq("student_id", student.id);

    if (attendanceData?.length) {
      const present = attendanceData.filter(a => a.status).length;
      setAttendance(Math.round((present / attendanceData.length) * 100));
    }

    const { data: marks } = await supabase
      .from("marks")
      .select("id")
      .eq("student_id", student.id);

    setMarksCount(marks?.length || 0);

    if (subjectIds.length) {
      const { data: mats } = await supabase
        .from("materials")
        .select("id")
        .in("subject_id", subjectIds);

      setMaterialsCount(mats?.length || 0);
    }

    const { data: fees } = await supabase
      .from("fees")
      .select("status")
      .eq("student_id", student.id)
      .single();

    if (fees?.status) setFeesStatus(fees.status);

    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

    const { data: timetable } = await supabase
      .from("faculty_timetable")
      .select("period, subjects(name)")
      .in("subject_id", subjectIds)
      .eq("day", today);

    setTodayClasses(timetable || []);

    const { data: noticesData } = await supabase
      .from("notices")
      .select("title")
      .order("created_at", { ascending: false })
      .limit(3);

    setNotices(noticesData || []);
  };

  return (
    <div className="relative min-h-screen p-8 overflow-hidden
      bg-gradient-to-br from-slate-100 via-blue-100 to-violet-100">

      {/* FLOATING BACKGROUND SHAPES */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-72 h-72 bg-blue-300/30 rounded-full blur-3xl top-20 left-10 animate-pulse" />
        <div className="absolute w-96 h-96 bg-violet-300/30 rounded-full blur-3xl bottom-20 right-10 animate-pulse" />
      </div>

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-slate-800 mb-10"
      >
        Student Dashboard
      </motion.h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <AttendanceCard value={attendance} />
        <StatCard title="Marks" value={marksCount > 0 ? "Published" : "Not Published"} color="indigo" />
        <StatCard title="Materials" value={materialsCount} color="sky" />
        <StatCard title="Fees" value={feesStatus} color="violet" />
      </div>

      {/* CONTENT */}
      <div className="grid md:grid-cols-2 gap-8">
        <GlassSection title="Today's Classes">
          {todayClasses.length === 0 ? (
            <p className="text-slate-500">No classes today</p>
          ) : (
            todayClasses.map((c, i) => (
              <p key={i} className="text-slate-700">
                Period {c.period} – {c.subjects.name}
              </p>
            ))
          )}
        </GlassSection>

        <GlassSection title="Recent Notices">
          {notices.length === 0 ? (
            <p className="text-slate-500">No notices</p>
          ) : (
            notices.map((n, i) => (
              <p key={i} className="text-slate-700">
                • {n.title}
              </p>
            ))
          )}
        </GlassSection>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value, color }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-5
      border border-white/40 shadow-lg"
    >
      <div className={`absolute top-0 left-0 h-1 w-full rounded-t-2xl
        bg-gradient-to-r from-${color}-400 to-${color}-600`} />
      <p className="text-sm text-slate-500 mt-2">{title}</p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </motion.div>
  );
}

function AttendanceCard({ value }) {
  const barColor =
    value >= 75 ? "bg-emerald-500"
      : value >= 65 ? "bg-amber-500"
      : "bg-rose-500";

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-white/80 backdrop-blur-xl rounded-2xl p-5
      border border-white/40 shadow-lg"
    >
      <p className="text-sm text-slate-500 mb-2">Attendance</p>
      <p className="text-2xl font-bold text-slate-800 mb-4">{value}%</p>

      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1 }}
          className={`h-full ${barColor}`}
        />
      </div>
    </motion.div>
  );
}

function GlassSection({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-xl rounded-2xl p-6
      border border-white/40 shadow-lg"
    >
      <h2 className="font-semibold text-slate-800 mb-4">{title}</h2>
      {children}
    </motion.div>
  );
}

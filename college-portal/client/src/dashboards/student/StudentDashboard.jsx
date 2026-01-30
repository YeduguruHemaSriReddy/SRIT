import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import { motion } from "framer-motion";

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

    const subjectIds = subs?.map((s) => s.subject_id) || [];

    const { data: attendanceData } = await supabase
      .from("attendance")
      .select("status")
      .eq("student_id", student.id);

    if (attendanceData?.length) {
      const present = attendanceData.filter((a) => a.status).length;
      setAttendance(Math.round((present / attendanceData.length) * 100));
    }

    const { data: marks } = await supabase
      .from("marks")
      .select("id")
      .eq("student_id", student.id);

    setMarksCount(marks?.length || 0);

    if (subjectIds.length > 0) {
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

    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
    });

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
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300">

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-slate-800 mb-8"
      >
        Student Dashboard
      </motion.h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Attendance"
          value={`${attendance}%`}
          accent={
            attendance >= 75
              ? "from-emerald-400 to-emerald-500"
              : attendance >= 65
              ? "from-amber-400 to-orange-400"
              : "from-rose-400 to-red-500"
          }
        />
        <StatCard
          title="Marks"
          value={marksCount > 0 ? "Published" : "Not Published"}
          accent="from-indigo-400 to-indigo-500"
        />
        <StatCard
          title="Materials"
          value={materialsCount}
          accent="from-sky-400 to-sky-500"
        />
        <StatCard
          title="Fees"
          value={feesStatus}
          accent="from-violet-400 to-purple-500"
        />
      </div>

      {/* CONTENT */}
      <div className="grid md:grid-cols-2 gap-6">
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

/* COMPONENTS */

function StatCard({ title, value, accent }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white/80 backdrop-blur-xl border border-white/40
      rounded-2xl p-5 shadow-md"
    >
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${accent} mb-3`} />
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </motion.div>
  );
}

function GlassSection({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-xl border border-white/40
      rounded-2xl p-6 shadow-md"
    >
      <h2 className="font-semibold text-slate-800 mb-3">{title}</h2>
      {children}
    </motion.div>
  );
}

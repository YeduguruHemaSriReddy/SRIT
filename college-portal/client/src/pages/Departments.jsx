import {
  BookOpen,
  Users,
  GraduationCap,
  Code2,
  Radio,
  Zap,
  Wrench,
  Building2,
  Award,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

/* ================= DEPARTMENTS DATA ================= */
const departments = [
  {
    tag: "CSE",
    title: "Computer Science & Engineering",
    desc: "Software development, AI, data science and modern computing.",
    students: 620,
    faculty: 45,
    courses: 32,
    icon: Code2,
  },
  {
    tag: "ECE",
    title: "Electronics & Communication Engineering",
    desc: "Communication systems, VLSI and embedded systems.",
    students: 540,
    faculty: 38,
    courses: 30,
    icon: Radio,
  },
  {
    tag: "EEE",
    title: "Electrical & Electronics Engineering",
    desc: "Power systems, machines and control engineering.",
    students: 480,
    faculty: 34,
    courses: 26,
    icon: Zap,
  },
  {
    tag: "ME",
    title: "Mechanical Engineering",
    desc: "Design, manufacturing and thermal engineering.",
    students: 500,
    faculty: 40,
    courses: 28,
    icon: Wrench,
  },
  {
    tag: "CE",
    title: "Civil Engineering",
    desc: "Construction, infrastructure and structural design.",
    students: 520,
    faculty: 36,
    courses: 28,
    icon: Building2,
  },
];

export default function Departments() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020617] via-[#0B1C3D] to-[#020617] text-slate-100 overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative px-6 md:px-20 py-28">
        <div className="absolute inset-0">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full" />
          <div className="absolute bottom-0 -left-24 w-96 h-96 bg-indigo-500/20 blur-3xl rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <span className="inline-flex items-center gap-2 px-5 py-2 mb-6
                           bg-white/10 backdrop-blur-xl border border-white/20
                           rounded-full text-cyan-300 font-semibold">
            <BookOpen size={18} /> Academic Excellence
          </span>

          <h1 className="text-4xl md:text-6xl font-black leading-tight
                         bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-400
                         bg-clip-text text-transparent">
            Academic Departments
          </h1>

          <p className="mt-6 max-w-2xl text-slate-300 text-lg">
            Engineering excellence built on strong academics, research and industry focus.
          </p>

          <div className="flex flex-wrap gap-10 mt-14">
            <Stat icon={<BookOpen />} value="5" label="Departments" />
            <Stat icon={<Users />} value="2.6K+" label="Students" />
            <Stat icon={<GraduationCap />} value="190+" label="Faculty" />
          </div>
        </div>
      </section>

      {/* ================= DEPARTMENTS GRID ================= */}
      <section className="px-6 md:px-20 py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <div
                key={dept.tag}
                onClick={() => navigate(`/departments/${dept.tag}`)}
                className="group relative cursor-pointer"
              >
                {/* glow */}
                <div className="absolute inset-0 bg-gradient-to-br
                                from-cyan-400/30 to-blue-600/30
                                opacity-0 group-hover:opacity-100
                                blur-xl rounded-3xl transition" />

                <div className="relative bg-white/10 backdrop-blur-xl
                                border border-white/20 rounded-3xl p-8
                                shadow-lg group-hover:shadow-2xl
                                transform group-hover:-translate-y-2
                                transition-all duration-300">

                  <div className="w-16 h-16 mb-6 rounded-2xl
                                  bg-gradient-to-br from-cyan-400 to-blue-500
                                  text-[#020617] flex items-center justify-center
                                  group-hover:scale-110 transition">
                    <Icon size={30} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {dept.title}
                  </h3>

                  <p className="text-slate-300 text-sm mb-6">
                    {dept.desc}
                  </p>

                  <div className="grid grid-cols-3 text-center mb-6">
                    <div>
                      <p className="font-bold text-white">{dept.students}</p>
                      <p className="text-xs text-slate-400">Students</p>
                    </div>
                    <div>
                      <p className="font-bold text-white">{dept.faculty}</p>
                      <p className="text-xs text-slate-400">Faculty</p>
                    </div>
                    <div>
                      <p className="font-bold text-white">{dept.courses}</p>
                      <p className="text-xs text-slate-400">Courses</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-cyan-400 font-semibold">
                    <span>Explore Department</span>
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= WHY ================= */}
      <section className="px-6 md:px-20 py-24 bg-[#020617]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <Highlight icon={<TrendingUp />} title="Industry Ready" />
          <Highlight icon={<Award />} title="Award Winning" />
          <Highlight icon={<Users />} title="Expert Faculty" />
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ================= HELPERS ================= */

function Stat({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-2xl bg-white/10 text-cyan-400
                      flex items-center justify-center shadow-lg">
        {icon}
      </div>
      <div>
        <p className="text-3xl font-bold text-white">{value}</p>
        <p className="text-sm text-slate-400">{label}</p>
      </div>
    </div>
  );
}

function Highlight({ icon, title }) {
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-cyan-500/20 opacity-0
                      group-hover:opacity-100 blur-xl rounded-2xl transition" />
      <div className="relative bg-white/10 backdrop-blur-xl
                      border border-white/20 rounded-2xl p-8 text-center">
        <div className="w-14 h-14 mx-auto mb-4
                        bg-gradient-to-br from-cyan-400 to-blue-500
                        text-[#020617] rounded-xl
                        flex items-center justify-center
                        group-hover:scale-110 transition">
          {icon}
        </div>
        <h3 className="font-bold text-white">{title}</h3>
      </div>
    </div>
  );
}

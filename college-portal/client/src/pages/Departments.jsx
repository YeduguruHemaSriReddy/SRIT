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
    /* 🔑 FIX FOR FIXED NAVBAR */
    <div className="min-h-screen bg-white text-black font-sans pt-[220px]">

      {/* ================= HERO ================= */}
      <section className="px-6 py-28 text-center">
        <p className="text-blue-600 font-semibold mb-4 flex items-center justify-center gap-2">
          <BookOpen size={18} /> Academic Excellence
        </p>

        <h1 className="text-4xl md:text-6xl font-black mb-6 text-orange-500">
          Academic Departments
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-gray-700">
          Engineering excellence built on strong academics, research,
          and industry-oriented education.
        </p>

        <div className="flex flex-wrap justify-center gap-10 mt-14">
          <Stat icon={<BookOpen />} value="5" label="Departments" />
          <Stat icon={<Users />} value="2.6K+" label="Students" />
          <Stat icon={<GraduationCap />} value="190+" label="Faculty" />
        </div>
      </section>

      {/* ================= DEPARTMENTS GRID ================= */}
      <section className="px-6 py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <div
                key={dept.tag}
                onClick={() => navigate(`/departments/${dept.tag}`)}
                className="cursor-pointer group"
              >
                <div
                  className="bg-white border border-gray-200 rounded-2xl p-8
                  shadow-md hover:shadow-xl hover:-translate-y-2
                  transition-all duration-300"
                >
                  <div
                    className="w-16 h-16 mb-6 rounded-xl
                    bg-orange-500 text-white
                    flex items-center justify-center
                    group-hover:scale-110 transition"
                  >
                    <Icon size={30} />
                  </div>

                  <h3 className="text-xl font-bold mb-2">
                    {dept.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-6">
                    {dept.desc}
                  </p>

                  <div className="grid grid-cols-3 text-center mb-6">
                    <div>
                      <p className="font-bold">{dept.students}</p>
                      <p className="text-xs text-gray-500">Students</p>
                    </div>
                    <div>
                      <p className="font-bold">{dept.faculty}</p>
                      <p className="text-xs text-gray-500">Faculty</p>
                    </div>
                    <div>
                      <p className="font-bold">{dept.courses}</p>
                      <p className="text-xs text-gray-500">Courses</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between font-semibold text-orange-500">
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

      {/* ================= WHY SRIT ================= */}
      <section className="px-6 py-24">
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
      <div
        className="w-14 h-14 rounded-xl bg-orange-500 text-white
        flex items-center justify-center"
      >
        {icon}
      </div>
      <div>
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  );
}

function Highlight({ icon, title }) {
  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl p-8
      text-center shadow-md hover:shadow-xl transition"
    >
      <div
        className="w-14 h-14 mx-auto mb-4
        bg-orange-500 text-white rounded-xl
        flex items-center justify-center"
      >
        {icon}
      </div>
      <h3 className="font-bold text-lg">{title}</h3>
    </div>
  );
}

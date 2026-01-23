import Footer from "../components/Footer";
import { motion } from "framer-motion";
import {
  Cpu,
  Code,
  Database,
  Zap,
  Plug,
  Cog,
  Building2,
} from "lucide-react";

const departments = [
  {
    name: "Computer Science & Engineering (CSE)",
    icon: Code,
    color: "from-blue-600 to-indigo-600",
    about:
      "CSE focuses on computing technologies, programming, algorithms, AI, ML, and software development.",
    careers: "Software Engineer, Full Stack Developer, Data Scientist, AI Engineer",
  },
  {
    name: "Computer Science & Engineering (CSM)",
    icon: Cpu,
    color: "from-purple-600 to-pink-600",
    about:
      "CSM integrates Computer Science with Artificial Intelligence and Machine Learning.",
    careers: "ML Engineer, AI Specialist, Data Analyst",
  },
  {
    name: "Computer Science & Engineering (CSD)",
    icon: Database,
    color: "from-cyan-600 to-blue-500",
    about:
      "CSD emphasizes data engineering, analytics, big data technologies, and databases.",
    careers: "Data Engineer, Data Analyst, Cloud Engineer",
  },
  {
    name: "Electronics & Communication Engineering (ECE)",
    icon: Zap,
    color: "from-orange-500 to-red-500",
    about:
      "ECE covers electronics, communication systems, VLSI, embedded systems, and IoT.",
    careers: "Electronics Engineer, VLSI Engineer, Network Engineer",
  },
  {
    name: "Electrical & Electronics Engineering (EEE)",
    icon: Plug,
    color: "from-yellow-500 to-orange-500",
    about:
      "EEE focuses on power systems, electrical machines, control systems, and renewable energy.",
    careers: "Electrical Engineer, Power Engineer, Control Engineer",
  },
  {
    name: "Mechanical Engineering (MEC)",
    icon: Cog,
    color: "from-slate-600 to-gray-700",
    about:
      "Mechanical Engineering deals with design, manufacturing, thermal engineering, and automation.",
    careers: "Design Engineer, Production Engineer, Automotive Engineer",
  },
  {
    name: "Civil Engineering (CIVIL)",
    icon: Building2,
    color: "from-emerald-600 to-teal-600",
    about:
      "Civil Engineering focuses on construction, infrastructure, structural design, and planning.",
    careers: "Civil Engineer, Structural Engineer, Site Engineer",
  },
];

export default function Departments() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ================= HERO ================= */}
      <section className="pt-36 pb-24 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold mb-6"
          >
            Academic Departments
          </motion.h1>
          <p className="text-xl opacity-90 max-w-4xl mx-auto">
            SRIT Anantapur offers industry-oriented undergraduate programs
            designed to build strong technical and professional foundations.
          </p>
        </div>
      </section>

      {/* ================= DEPARTMENTS GRID ================= */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {departments.map((dept, index) => {
            const Icon = dept.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`rounded-2xl p-8 bg-gradient-to-br ${dept.color} shadow-xl hover:scale-[1.03] transition`}
              >
                <Icon className="w-12 h-12 mb-4 text-white" />

                <h3 className="text-2xl font-bold mb-3">
                  {dept.name}
                </h3>

                <p className="text-white/90 mb-4 leading-relaxed">
                  {dept.about}
                </p>

                <div className="mt-4">
                  <p className="text-sm font-semibold uppercase tracking-wide">
                    Career Opportunities
                  </p>
                  <p className="text-sm text-white/90 mt-1">
                    {dept.careers}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ================= WHY SRIT ================= */}
      <section className="py-24 bg-gradient-to-br from-slate-800 to-slate-900 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Why Choose SRIT?
        </h2>
        <p className="max-w-4xl mx-auto text-lg opacity-80">
          Industry-aligned curriculum • Experienced faculty • Modern laboratories •
          Strong placement support • Holistic student development
        </p>
      </section>

      <Footer />
    </div>
  );
}

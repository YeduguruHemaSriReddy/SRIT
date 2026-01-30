import Footer from "../components/Footer";
import {
  Cpu,
  Zap,
  Settings,
  PenTool,
  Radio,
  Code2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Departments() {
  const departments = [
    {
      name: "Computer Science & Engineering",
      abbr: "CSE",
      desc: "AI, data science, software engineering and modern computing systems.",
      icon: Code2,
    },
    {
      name: "Electronics & Communication",
      abbr: "ECE",
      desc: "Communication systems, VLSI, embedded and signal processing.",
      icon: Radio,
    },
    {
      name: "Electrical & Electronics",
      abbr: "EEE",
      desc: "Power systems, renewable energy and smart grids.",
      icon: Zap,
    },
    {
      name: "Mechanical Engineering",
      abbr: "ME",
      desc: "Design, manufacturing and thermal engineering.",
      icon: Settings,
    },
    {
      name: "Civil Engineering",
      abbr: "CE",
      desc: "Infrastructure, construction and sustainability.",
      icon: PenTool,
    },
    {
      name: "Artificial Intelligence",
      abbr: "CSM",
      desc: "Machine learning, deep learning and intelligent systems.",
      icon: Cpu,
    },
  ];

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-[#020617] via-[#0B1F3A] to-[#164E63] text-[#F8FAFC]">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#22D3EE55,transparent_65%)]"></div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 
            bg-white/10 backdrop-blur-xl text-[#FBBF24]
            rounded-full text-sm font-extrabold uppercase mb-6
            border border-white/20 shadow-[0_0_30px_#22D3EE66]"
          >
            <Sparkles className="w-4 h-4" /> Our Academic Strength
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6
            bg-gradient-to-r from-[#FBBF24] via-[#67E8F9] to-[#22D3EE]
            bg-clip-text text-transparent drop-shadow-2xl"
          >
            Academic Departments
          </motion.h1>

          <p className="text-lg md:text-xl max-w-3xl mx-auto text-[#E0F2FE]">
            SRIT departments blend strong academics, innovation, and industry-ready skills.
          </p>
        </div>
      </section>

      {/* ================= DEPARTMENTS GRID ================= */}
      <section className="py-32">
        <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {departments.map((dept, i) => {
            const Icon = dept.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -14, scale: 1.02 }}
                transition={{ delay: i * 0.08 }}
                className="relative group p-8 rounded-3xl
                bg-white/10 backdrop-blur-2xl
                border border-white/20
                shadow-[0_0_40px_#22D3EE55]
                hover:shadow-[0_0_90px_#FBBF24AA]
                transition overflow-hidden"
              >
                {/* glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition
                  bg-[radial-gradient(circle_at_top,#FBBF2440,transparent_70%)]" />

                <div className="relative z-10">
                  <div className="w-14 h-14 mb-6 rounded-xl
                    bg-gradient-to-br from-[#FBBF24] to-[#22D3EE]
                    flex items-center justify-center text-black shadow-lg">
                    <Icon size={28} />
                  </div>

                  <h3 className="text-2xl font-black mb-2 text-[#FBBF24]">
                    {dept.name}
                  </h3>

                  <p className="text-[#CBD5F5] mb-6 leading-relaxed">
                    {dept.desc}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-4xl font-black text-white/10">
                      {dept.abbr}
                    </span>

                    <span className="flex items-center gap-2 font-semibold
                      text-[#67E8F9]">
                      Explore <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ================= WHY SRIT ================= */}
      <section className="py-32 bg-gradient-to-br from-[#020617] to-[#0B1F3A]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-16
            bg-gradient-to-r from-[#FBBF24] to-[#22D3EE]
            bg-clip-text text-transparent">
            Why SRIT Departments Stand Out
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Expert Faculty & Mentorship",
              "Advanced Labs & Research",
              "Strong Industry Connectivity",
            ].map((text, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white/10 backdrop-blur-xl
                border border-white/20
                rounded-2xl p-8
                shadow-[0_0_40px_#22D3EE55]"
              >
                <h3 className="text-xl font-bold text-[#FBBF24] mb-2">
                  {text}
                </h3>
                <p className="text-[#CBD5F5]">
                  Designed to prepare students for real-world engineering challenges.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

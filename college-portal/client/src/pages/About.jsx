import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Trophy,
  BookOpen,
  Calendar,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Footer from "../components/Footer";

/* ================= REUSABLE GLASS CARD ================= */
function GlassCard({ children, className = "" }) {
  return (
    <motion.div
      whileHover={{ y: -8, rotateX: 4, rotateY: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 180, damping: 16 }}
      className={`
        relative group
        bg-white/10 backdrop-blur-2xl
        border border-white/20
        rounded-[2.5rem]
        shadow-[0_0_40px_rgba(56,189,248,0.25)]
        hover:shadow-[0_0_90px_rgba(251,191,36,0.35)]
        overflow-hidden
        ${className}
      `}
    >
      {/* glow edge */}
      <div className="absolute inset-0 rounded-[2.5rem] ring-1 ring-cyan-300/30 opacity-0 group-hover:opacity-100 transition" />

      {/* light sweep */}
      <div className="absolute -inset-x-1/2 -inset-y-full bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12 group-hover:translate-y-[220%] transition duration-700" />

      {children}
    </motion.div>
  );
}

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen font-sans text-slate-100 bg-gradient-to-br from-[#020617] via-[#0B1F3A] to-[#164E63]">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#38BDF855,transparent_65%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 mb-8
              bg-white/10 backdrop-blur-xl
              border border-white/20 rounded-full
              text-[#FBBF24] text-sm font-extrabold uppercase
              shadow-[0_0_30px_#22D3EE66]"
          >
            <Sparkles className="w-4 h-4" /> Excellence Since 2007
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black mb-6
              bg-gradient-to-r from-[#FBBF24] via-[#67E8F9] to-[#22D3EE]
              bg-clip-text text-transparent drop-shadow-2xl"
          >
            Building the <br />
            <span className="italic">Future of Engineering</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg md:text-2xl max-w-3xl mx-auto mb-12 text-cyan-100"
          >
            Srinivasa Ramanujan Institute of Technology — where innovation,
            discipline, and excellence shape future engineers.
          </motion.p>

          <div className="flex justify-center gap-6 flex-wrap">
            <button
              onClick={() => navigate("/programs")}
              className="px-12 py-4 rounded-full font-black text-black
                bg-gradient-to-r from-[#FBBF24] to-[#22D3EE]
                shadow-[0_0_40px_#22D3EEAA]
                hover:shadow-[0_0_80px_#FBBF24AA]
                hover:scale-105 transition flex items-center gap-2"
            >
              Explore Programs <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="px-12 py-4 rounded-full font-bold
                border-2 border-[#67E8F9] text-[#67E8F9]
                hover:bg-[#67E8F9] hover:text-black
                shadow-[0_0_30px_#67E8F955] transition"
            >
              Contact Admissions
            </button>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="-mt-24 container mx-auto px-6 relative z-10">
        <GlassCard className="grid grid-cols-2 md:grid-cols-4 gap-6 p-10">
          <StatItem value="2007" label="Established" icon={<Calendar />} />
          <StatItem value="3000+" label="Students" icon={<Users />} />
          <StatItem value="20+" label="Programs" icon={<BookOpen />} />
          <StatItem value="90%+" label="Placements" icon={<Trophy />} />
        </GlassCard>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="py-32">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <GlassCard className="overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1562774053-701939374585"
              alt="Campus"
              className="w-full h-full object-cover"
            />
          </GlassCard>

          <GlassCard className="p-10 space-y-6">
            <h2 className="text-5xl font-black
              bg-gradient-to-r from-[#FBBF24] to-[#22D3EE]
              bg-clip-text text-transparent">
              A Legacy of Excellence
            </h2>

            <p className="text-lg text-cyan-100">
              Since 2007, SRIT has stood as a symbol of academic rigor,
              discipline, and industry-ready engineering education.
            </p>

            <p className="p-6 rounded-xl bg-white/10 backdrop-blur-xl
              border-l-4 border-[#FBBF24]
              italic text-slate-200">
              “We don’t just teach engineering — we build engineers who lead.”
            </p>
          </GlassCard>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-32">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-10">
          <FeatureCard
            title="Academics"
            desc="Strong fundamentals & research focus"
            icon={<BookOpen />}
          />
          <FeatureCard
            title="Industry Ready"
            desc="Real-world exposure & projects"
            icon={<Users />}
          />
          <FeatureCard
            title="Placements"
            desc="Consistent results & top recruiters"
            icon={<Trophy />}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ================= SUB COMPONENTS ================= */

function StatItem({ value, label, icon }) {
  return (
    <div className="text-center">
      <div className="w-14 h-14 mx-auto rounded-full
        bg-gradient-to-br from-[#FBBF24] to-[#22D3EE]
        flex items-center justify-center mb-3 text-black shadow-lg">
        {icon}
      </div>
      <h3 className="text-3xl font-black text-[#FBBF24]">{value}</h3>
      <p className="text-sm text-cyan-200 uppercase font-semibold">{label}</p>
    </div>
  );
}

function FeatureCard({ title, desc, icon }) {
  return (
    <GlassCard className="p-8 text-center">
      <div className="w-14 h-14 mx-auto mb-4 rounded-xl
        bg-gradient-to-br from-[#FBBF24] to-[#22D3EE]
        flex items-center justify-center text-black">
        {icon}
      </div>
      <h3 className="text-xl font-black text-[#FBBF24] mb-2">{title}</h3>
      <p className="text-cyan-100">{desc}</p>
    </GlassCard>
  );
}

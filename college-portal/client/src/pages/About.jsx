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
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 160, damping: 16 }}
      className={`
        relative group
        bg-white
        border border-orange-200
        rounded-[2.5rem]
        shadow-[0_10px_40px_rgba(242,101,34,0.25)]
        hover:shadow-[0_20px_80px_rgba(242,101,34,0.35)]
        overflow-hidden
        ${className}
      `}
    >
      <div className="absolute inset-0 rounded-[2.5rem] ring-1 ring-orange-300/40 opacity-0 group-hover:opacity-100 transition" />
      <div className="absolute -inset-x-1/2 -inset-y-full bg-gradient-to-r from-transparent via-orange-200/30 to-transparent rotate-12 group-hover:translate-y-[220%] transition duration-700" />
      {children}
    </motion.div>
  );
}

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen font-sans bg-[#FFF7ED] text-gray-800">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-50 to-orange-100" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 mb-8
              bg-white border border-orange-200 rounded-full
              text-[#F26522] text-sm font-bold shadow"
          >
            <Sparkles className="w-4 h-4" /> Excellence Since 2007
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black mb-6 text-[#F26522]"
          >
            Building the <br />
            <span className="italic text-gray-900">
              Future of Engineering
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg md:text-2xl max-w-3xl mx-auto mb-12 text-gray-700"
          >
            Srinivasa Ramanujan Institute of Technology — shaping
            disciplined, industry-ready engineers.
          </motion.p>

          <div className="flex justify-center gap-6 flex-wrap">
            <button
              onClick={() => navigate("/programs")}
              className="px-12 py-4 rounded-full font-black text-white
                bg-[#F26522]
                hover:bg-orange-600
                shadow-lg hover:shadow-2xl
                transition flex items-center gap-2"
            >
              Explore Programs <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="px-12 py-4 rounded-full font-bold
                border-2 border-[#F26522] text-[#F26522]
                hover:bg-[#F26522] hover:text-white
                transition"
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
            <h2 className="text-5xl font-black text-[#F26522]">
              A Legacy of Excellence
            </h2>

            <p className="text-lg text-gray-700">
              Since 2007, SRIT has delivered strong academics,
              discipline, and industry-aligned education.
            </p>

            <p className="p-6 rounded-xl bg-orange-50
              border-l-4 border-[#F26522]
              italic text-gray-700">
              “We don’t just teach engineering — we build leaders.”
            </p>
          </GlassCard>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-32">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-10">
          <FeatureCard title="Academics" desc="Strong fundamentals" icon={<BookOpen />} />
          <FeatureCard title="Industry Ready" desc="Projects & exposure" icon={<Users />} />
          <FeatureCard title="Placements" desc="Top recruiters" icon={<Trophy />} />
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
        bg-[#F26522]
        flex items-center justify-center mb-3 text-white shadow">
        {icon}
      </div>
      <h3 className="text-3xl font-black text-[#F26522]">{value}</h3>
      <p className="text-sm text-gray-600 uppercase font-semibold">{label}</p>
    </div>
  );
}

function FeatureCard({ title, desc, icon }) {
  return (
    <GlassCard className="p-8 text-center">
      <div className="w-14 h-14 mx-auto mb-4 rounded-xl
        bg-[#F26522]
        flex items-center justify-center text-white">
        {icon}
      </div>
      <h3 className="text-xl font-black text-[#F26522] mb-2">{title}</h3>
      <p className="text-gray-700">{desc}</p>
    </GlassCard>
  );
}

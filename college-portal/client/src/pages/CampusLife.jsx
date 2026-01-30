import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Trophy,
  BookOpen,
  Microscope,
  Coffee,
  Music,
  Zap,
  Gamepad2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Footer from "../components/Footer";

const campusLife = [
  {
    title: "Innovation Hub",
    desc: "State-of-the-art labs where theory meets reality. Our research cells are the birthplace of next-gen ideas.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    icon: Microscope,
    tag: "Research",
  },
  {
    title: "The Knowledge Hub",
    desc: "A massive central library with thousands of journals and global digital research access.",
    img: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop",
    icon: BookOpen,
    tag: "Academic",
  },
  {
    title: "Arena of Champions",
    desc: "Professional sports grounds and indoor courts that build champions.",
    img: "https://images.unsplash.com/photo-1526676023131-d35216858f0a?q=80&w=2070&auto=format&fit=crop",
    icon: Trophy,
    tag: "Sports",
  },
  {
    title: "Creative Pulse",
    desc: "Music nights, cultural fests, drama and art workshops.",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
    icon: Music,
    tag: "Cultural",
  },
  {
    title: "Tech Society",
    desc: "Student coding clubs, robotics teams and national hackathon wins.",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
    icon: Zap,
    tag: "Technology",
  },
  {
    title: "Social Lounge",
    desc: "A vibrant cafeteria and social spaces for collaboration.",
    img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop",
    icon: Coffee,
    tag: "Lifestyle",
  },
];

const stats = [
  { title: "Student Clubs", value: "18+", icon: Users },
  { title: "Tech Events", value: "25+", icon: Zap },
  { title: "Sports Cups", value: "15+", icon: Trophy },
  { title: "Annual Fests", value: "03", icon: Gamepad2 },
];

export default function CampusLife() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-[#020617] via-[#0B1F3A] to-[#164E63] text-[#F8FAFC]">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#22D3EE55,transparent_65%)]" />

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 
            bg-white/10 backdrop-blur-xl text-[#FBBF24]
            rounded-full text-sm font-extrabold uppercase mb-6
            border border-white/20 shadow-[0_0_30px_#22D3EE66]"
          >
            <Sparkles size={16} /> Life @ SRIT
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6
            bg-gradient-to-r from-[#FBBF24] via-[#67E8F9] to-[#22D3EE]
            bg-clip-text text-transparent drop-shadow-2xl"
          >
            Campus Life
          </motion.h1>

          <p className="text-lg md:text-xl max-w-3xl mx-auto text-[#E0F2FE]">
            A perfect balance of academics, innovation, culture and unforgettable memories.
          </p>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="-mt-24 container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6
          bg-white/10 backdrop-blur-2xl
          p-10 rounded-3xl
          border border-white/20
          shadow-[0_0_60px_#22D3EE55]">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="text-center">
                <div className="w-14 h-14 mx-auto mb-3 rounded-full
                  bg-gradient-to-br from-[#FBBF24] to-[#22D3EE]
                  flex items-center justify-center text-black shadow-lg">
                  <Icon />
                </div>
                <h3 className="text-3xl font-black text-[#FBBF24]">{stat.value}</h3>
                <p className="text-sm text-[#CBD5F5] uppercase font-semibold">
                  {stat.title}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= CARDS ================= */}
      <section className="py-32">
        <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {campusLife.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -14, scale: 1.02 }}
                transition={{ delay: i * 0.08 }}
                className="group rounded-3xl overflow-hidden
                bg-white/10 backdrop-blur-2xl
                border border-white/20
                shadow-[0_0_40px_#22D3EE55]
                hover:shadow-[0_0_90px_#FBBF24AA] transition"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl
                      bg-gradient-to-br from-[#FBBF24] to-[#22D3EE]
                      flex items-center justify-center text-black">
                      <Icon size={20} />
                    </div>
                    <span className="text-sm font-bold text-[#67E8F9]">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-[#FBBF24] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[#CBD5F5] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-28 text-center bg-gradient-to-br from-[#020617] to-[#0B1F3A]">
        <h2 className="text-4xl md:text-5xl font-black mb-10
          bg-gradient-to-r from-[#FBBF24] to-[#22D3EE]
          bg-clip-text text-transparent">
          Ready to experience SRIT?
        </h2>

        <button
          onClick={() => navigate("/admissions")}
          className="px-14 py-4 rounded-full font-black text-black
          bg-gradient-to-r from-[#FBBF24] to-[#22D3EE]
          shadow-[0_0_40px_#22D3EEAA]
          hover:shadow-[0_0_80px_#FBBF24AA]
          hover:scale-105 transition flex items-center gap-2 mx-auto"
        >
          Apply for Admission <ArrowRight size={18} />
        </button>
      </section>

      <Footer />
    </div>
  );
}

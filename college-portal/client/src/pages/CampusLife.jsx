import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Trophy,
  Zap,
  Gamepad2,
  ArrowRight,
} from "lucide-react";
import Footer from "../components/Footer";

/* ================= CLUBS ================= */
const campusLife = [
  {
    title: "Shutterbugs Club",
    desc: "The Shutterbugs Club nurtures creativity in photography and videography, documenting campus life and institutional milestones.",
    img: "/images/clubs/shutterbugs.png",
    tag: "Creative",
  },
  {
    title: "Chairman’s Club",
    desc: "The Chairman’s Club promotes leadership, discipline, and student participation in institutional initiatives.",
    img: "/images/clubs/chairmans-club.png",
    tag: "Leadership",
  },
  {
    title: "NSS",
    desc: "The NSS unit engages students in community service and social outreach programs.",
    img: "/images/clubs/nss.jpg",
    tag: "Social",
  },
  {
    title: "NCC",
    desc: "The NCC unit instills discipline, leadership, and national pride through structured training.",
    img: "/images/clubs/ncc.jpg",
    tag: "Defence",
  },
  {
    title: "Toastmasters Club",
    desc: "The Toastmasters Club develops communication and leadership skills through public speaking.",
    img: "/images/clubs/toastmasters.jpg",
    tag: "Communication",
  },
  {
    title: "Programming Club",
    desc: "The Programming Club encourages problem-solving and technical excellence through coding activities.",
    img: "/images/clubs/prog.png",
    tag: "Technology",
  },
];

/* ================= STATS ================= */
const stats = [
  { title: "Student Clubs", value: "18+", icon: Users },
  { title: "Tech Events", value: "25+", icon: Zap },
  { title: "Sports Cups", value: "15+", icon: Trophy },
  { title: "Annual Fests", value: "03", icon: Gamepad2 },
];

export default function CampusLife() {
  const navigate = useNavigate();

  return (
    /* 🔑 FIX FOR FIXED NAVBAR */
    <div className="min-h-screen font-sans bg-white text-black pt-[220px]">

      {/* ================= HERO ================= */}
      <section className="py-28 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-black mb-6 text-orange-500"
        >
          Campus Life
        </motion.h1>

        <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700">
          Where leadership, creativity, service, and innovation come together
          to shape holistic professionals.
        </p>
      </section>

      {/* ================= STATS ================= */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="px-6"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl
                p-8 text-center shadow-md hover:shadow-xl transition"
              >
                <div
                  className="w-14 h-14 mx-auto mb-3 rounded-full
                  bg-orange-500 text-white
                  flex items-center justify-center"
                >
                  <Icon />
                </div>
                <h3 className="text-3xl font-black text-orange-500">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-600 uppercase font-semibold">
                  {stat.title}
                </p>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* ================= CLUB CARDS ================= */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {campusLife.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-gray-200
              rounded-2xl overflow-hidden shadow-md
              hover:shadow-xl transition"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover
                  hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-8">
                <span className="text-sm font-semibold text-blue-600 uppercase">
                  {item.tag}
                </span>

                <h3 className="text-2xl font-black text-orange-500 mt-3 mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-700 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-28 text-center px-6">
        <h2 className="text-4xl md:text-5xl font-black mb-10 text-orange-500">
          Ready to experience SRIT?
        </h2>

        <button
          onClick={() => navigate("/admissions")}
          className="px-14 py-4 rounded-full font-black
          bg-orange-500 text-white hover:bg-orange-600
          transition flex items-center gap-2 mx-auto"
        >
          Apply for Admission <ArrowRight size={18} />
        </button>
      </section>

      <Footer />
    </div>
  );
}

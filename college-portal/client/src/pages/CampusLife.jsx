import Footer from "../components/Footer";
import { motion } from "framer-motion";
import {
  Users,
  Trophy,
  BookOpen,
  Microscope,
  Camera,
  Coffee,
} from "lucide-react";

/* ---------------- CAMPUS SECTIONS ---------------- */
const campusLife = [
  {
    title: "Advanced Laboratories",
    desc: "Well-equipped modern laboratories supporting practical learning and innovation.",
    img: "/assets/campus/labs.jpg",
    icon: Microscope,
    bg: "from-blue-500 to-indigo-500",
  },
  {
    title: "Central Library",
    desc: "Extensive collection of books, journals, and digital learning resources.",
    img: "/assets/campus/library.jpg",
    icon: BookOpen,
    bg: "from-emerald-500 to-teal-500",
  },
  {
    title: "Sports & Fitness",
    desc: "Indoor and outdoor sports facilities for physical fitness and teamwork.",
    img: "/assets/campus/sports.jpg",
    icon: Trophy,
    bg: "from-orange-500 to-red-500",
  },
  {
    title: "Cultural & Tech Events",
    desc: "Fests, hackathons, seminars, workshops, and celebrations throughout the year.",
    img: "/assets/campus/events.jpg",
    icon: Camera,
    bg: "from-purple-500 to-pink-500",
  },
  {
    title: "Student Clubs",
    desc: "Technical, cultural, literary and social clubs nurturing leadership skills.",
    img: "/assets/campus/campus.jpg",
    icon: Users,
    bg: "from-cyan-500 to-blue-500",
  },
  {
    title: "Cafeteria",
    desc: "Clean, hygienic, and affordable food options for students and staff.",
    img: "/assets/campus/cafeteria.jpg",
    icon: Coffee,
    bg: "from-yellow-400 to-orange-400",
  },
];

export default function CampusLife() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-orange-50">

      {/* ================= HERO ================= */}
      <section className="pt-32 pb-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-extrabold mb-6"
        >
          Life at <span className="text-primary">SRIT Campus</span>
        </motion.h1>

        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
          A vibrant campus experience that blends academics, innovation,
          culture, sports, and lifelong friendships.
        </p>
      </section>

      {/* ================= IMAGE GRID ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {campusLife.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition"
              >
                {/* IMAGE */}
                <div className="relative h-52">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${item.bg} opacity-70`}
                  />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3 text-white">
                    <Icon className="w-9 h-9" />
                    <h3 className="text-xl font-bold">{item.title}</h3>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ================= STUDENT EXPERIENCE STRIP ================= */}
      <section className="py-24 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          More Than Just a College
        </motion.h2>

        <p className="text-lg md:text-xl max-w-4xl mx-auto opacity-95">
          SRIT shapes students into confident engineers, creative innovators,
          and responsible citizens through a dynamic campus environment.
        </p>
      </section>

      {/* ================= WHY SRIT ================= */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          {[
            "Green & Spacious Campus",
            "Industry-Oriented Learning",
            "Hackathons & Innovation Cells",
            "Cultural & Sports Excellence",
            "Supportive Faculty Mentors",
            "Safe & Inclusive Environment",
          ].map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <h4 className="font-semibold text-lg text-gray-800">
                {point}
              </h4>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

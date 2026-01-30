import { Bell, Calendar, FileText, ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import sritBg from "../assets/campus/srit.png";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden font-sans bg-white">

      {/* ================= HERO SECTION ================= */}
      <section
        className="relative min-h-screen flex items-start px-6 md:px-16 lg:px-24 pt-28"
        style={{
          backgroundImage: `linear-gradient(
            135deg,
            rgba(10,25,60,0.92),
            rgba(15,35,80,0.88)
          ), url(${sritBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#FACC1555,transparent_60%)]"></div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.25 },
            },
          }}
          className="relative z-10 max-w-3xl"
        >
          {/* Heading */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6"
          >
            Shape Your Future at
            <br />
            <span className="block text-yellow-400 text-6xl md:text-7xl font-black mt-2 drop-shadow-[0_0_25px_#FACC15]">
              SRIT
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8 }}
            className="text-lg text-blue-100 mb-10 backdrop-blur-sm bg-white/5 p-4 rounded-xl border border-white/10"
          >
            Join a legacy of excellence. Our world-class faculty, cutting-edge
            research facilities, and vibrant campus community prepare you to
            lead and innovate in an ever-changing world.
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex gap-16 mb-10"
          >
            {[
              { value: "15+", label: "Years of Excellence" },
              { value: "10k+", label: "Students Enrolled" },
              { value: "95%", label: "Placement Rate" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.12 }}
                transition={{ type: "spring", stiffness: 260 }}
                className="cursor-pointer"
              >
                <p className="text-4xl font-extrabold text-yellow-400 drop-shadow">
                  {stat.value}
                </p>
                <p className="text-blue-100 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div className="flex gap-6">
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/admissions"
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500
                text-black font-bold rounded-xl shadow-[0_0_30px_#FACC15AA]
                hover:shadow-[0_0_60px_#FACC15]
                transition flex items-center gap-2"
              >
                Start Your Application <ArrowRight size={20} />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/about"
                className="px-8 py-4 border border-yellow-400/60 text-yellow-300
                font-bold rounded-xl backdrop-blur-xl bg-white/5
                hover:bg-white/10 transition flex items-center gap-2"
              >
                <Play size={18} /> Take a Virtual Tour
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ================= LATEST UPDATES ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
              <Bell className="text-yellow-600" size={20} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Latest Updates
            </h2>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 divide-y">
            {[
              {
                icon: Bell,
                title: "Spring Semester Registration Opens Feb 1",
                time: "2 hours ago",
              },
              {
                icon: Calendar,
                title: "Career Fair 2026 – Save the Date: March 15",
                time: "1 day ago",
              },
              {
                icon: FileText,
                title: "New Scholarship Program Announced for STEM Students",
                time: "2 days ago",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ backgroundColor: "#FFF7ED" }}
                className="flex gap-5 px-6 py-6 cursor-pointer transition"
              >
                <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center">
                  <item.icon className="text-yellow-600" size={22} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{item.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DEPARTMENTS SECTION ================= */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Our <span className="text-yellow-400">Departments</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {[
              { code: "CSE", name: "Computer Science & Engineering" },
              { code: "ECE", name: "Electronics & Communication" },
              { code: "ME", name: "Mechanical Engineering" },
              { code: "CE", name: "Civil Engineering" },
            ].map((dept, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8, scale: 1.05 }}
                className="group p-8 bg-white/10 backdrop-blur-xl
                border border-white/20 rounded-2xl
                shadow-lg hover:shadow-[0_0_40px_#FACC15AA]
                transition-all cursor-pointer"
              >
                <h3 className="text-4xl font-black text-yellow-400 mb-3">
                  {dept.code}
                </h3>
                <p className="text-white/90 font-medium">{dept.name}</p>
                <div className="mt-4 h-1 w-0 group-hover:w-full bg-yellow-400 rounded transition-all"></div>
              </motion.div>
            ))}
          </div>

          <div className="mt-14">
            <a
              href="/departments"
              className="inline-block px-10 py-4 bg-yellow-400 text-blue-900
              font-bold rounded-full shadow-lg hover:bg-yellow-300 transition"
            >
              View All Departments
            </a>
          </div>
        </div>
      </section>
      {/* ================= NEWSLETTER SECTION ================= */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div
            className="relative bg-gradient-to-br from-[#0b1d3a] to-[#1c2f5a]
            rounded-3xl p-10 md:p-14 shadow-[0_0_80px_#00000055]
            overflow-hidden border border-white/10"
          >
            {/* Decorative glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="w-14 h-14 bg-yellow-400/20 rounded-2xl flex items-center justify-center mb-6">
                ✉️
              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
                Newsletter
              </h2>

              <p className="text-blue-100 mb-8 max-w-2xl">
                Get weekly updates on campus news, events, and opportunities
                delivered straight to your inbox.
              </p>

              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl bg-white/10
                  text-white placeholder-blue-200 outline-none
                  border border-white/20
                  focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30
                  transition"
                />

                <button
                  className="px-10 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500
                  text-black font-bold rounded-xl
                  hover:from-yellow-500 hover:to-yellow-600
                  shadow-[0_0_30px_#FACC15AA]
                  transition-all flex items-center justify-center gap-2"
                >
                  Subscribe Now →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STUDENT STORIES ================= */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">

          <p className="text-sm font-extrabold tracking-widest text-orange-500 mb-4">
            STUDENT STORIES
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Voices of Success
          </h2>

          <p className="text-lg text-gray-500 max-w-3xl mx-auto mb-16">
            Hear from our students and alumni about their transformative experiences.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                text:
                  "The research opportunities at SRIT helped me land my dream job at a leading tech company.",
                name: "Sarah Chen",
                role: "CSE Graduate, 2024",
                initials: "SC",
              },
              {
                text:
                  "The diverse community opened doors I never thought possible.",
                name: "Marcus Johnson",
                role: "ECE Graduate, 2023",
                initials: "MJ",
              },
              {
                text:
                  "Career services helped me secure internships that shaped my journey.",
                name: "Emily Rodriguez",
                role: "Engineering Student, 2025",
                initials: "ER",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="relative bg-white rounded-3xl border border-gray-200
                p-10 text-left shadow-md hover:shadow-xl transition"
              >
                <div className="absolute top-6 right-6 text-yellow-200 text-6xl">
                  “”
                </div>

                <p className="text-gray-800 text-lg mb-10 italic">
                  "{item.text}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-400
                  flex items-center justify-center font-bold text-black">
                    {item.initials}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="relative py-28 px-6 bg-gradient-to-br
        from-[#0B1C3D] via-[#132A5E] to-[#0B1C3D]
        text-white overflow-hidden">

        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Ready to Begin Your Journey?
          </h2>

          <p className="text-lg text-blue-100 max-w-3xl mx-auto mb-12">
            Take the first step towards your future with SRIT.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              className="px-10 py-4 bg-yellow-400 hover:bg-yellow-500
              text-black font-bold rounded-xl transition"
            >
              Apply Now →
            </button>

            <button
              className="px-10 py-4 border-2 border-yellow-400
              text-yellow-300 hover:bg-yellow-400/10
              font-bold rounded-xl transition"
            >
              Request Information
            </button>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#1b2b50] text-gray-300 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-400">
            © 2026 SRIT. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bell,
  Calendar,
  FileText,
  ArrowRight,
  Play,
} from "lucide-react";
import sritBg from "../assets/campus/srit.png";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden font-sans bg-[#020617]">

      {/* ================= HERO ================= */}
      <section
        className="relative min-h-screen flex items-center px-6 md:px-16 lg:px-24"
        style={{
          backgroundImage: `
            radial-gradient(circle at top left, #38BDF833, transparent 50%),
            radial-gradient(circle at bottom right, #FACC1533, transparent 50%),
            url(${sritBg})
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-3xl text-white"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Shape Your Future at
            <span className="block text-orange-400 text-6xl md:text-7xl font-black mt-2">
              SRIT
            </span>
          </h1>

          <p className="text-lg text-blue-100 mb-10 bg-white/10 backdrop-blur-xl
            border border-white/20 p-6 rounded-2xl">
            Srinivasa Ramanujan Institute of Technology empowers students
            with academic excellence, innovation, and industry readiness.
          </p>

          <div className="flex flex-wrap gap-6">
            <Link
              to="/admissions"
              className="px-8 py-4 rounded-xl font-bold text-black
              bg-orange-400 hover:bg-orange-500 transition flex items-center gap-2"
            >
              Apply Now <ArrowRight size={20} />
            </Link>

            <Link
              to="/about"
              className="px-8 py-4 rounded-xl font-bold
              border border-orange-400 text-orange-300
              bg-white/10 hover:bg-white/20 transition flex items-center gap-2"
            >
              <Play size={18} /> About SRIT
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ================= LATEST UPDATES ================= */}
      <section className="py-20 bg-[#020617]">
        <div className="max-w-6xl mx-auto px-6">

          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-full bg-orange-400/20 flex items-center justify-center">
              <Bell className="text-orange-400" />
            </div>
            <h2 className="text-2xl font-black text-white">
              Latest Updates
            </h2>
          </div>

          <div className="bg-white/10 backdrop-blur-xl
            rounded-2xl border border-white/20 divide-y divide-white/10">

            {[
              { icon: Bell, title: "Admissions Open for 2026 Batch", time: "Today" },
              { icon: Calendar, title: "Campus Placement Drive – March 15", time: "1 day ago" },
              { icon: FileText, title: "New Scholarship Program Announced", time: "2 days ago" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex gap-5 px-6 py-6">
                  <div className="w-12 h-12 rounded-full bg-orange-400/20 flex items-center justify-center">
                    <Icon className="text-orange-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-sm text-blue-200">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= DEPARTMENTS ================= */}
      <section className="py-24 bg-[#020617] text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-extrabold mb-6">
            Our <span className="text-orange-400">Departments</span>
          </h2>

          <p className="text-blue-200 mb-14">
            Excellence across engineering disciplines.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Computer Science Engineering",
              "Electronics & Communication",
              "Electrical & Electronics",
              "Mechanical Engineering",
              "Civil Engineering",
              "AI & Data Science",
            ].map((dept, i) => (
              <div
                key={i}
                className="p-8 bg-white/10 backdrop-blur-xl
                border border-white/20 rounded-2xl
                hover:border-orange-400 transition"
              >
                <h3 className="text-xl font-bold text-orange-400">
                  {dept}
                </h3>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <Link
              to="/departments"
              className="inline-block px-10 py-4 rounded-full font-bold
              bg-orange-400 text-black hover:bg-orange-500 transition"
            >
              View All Departments
            </Link>
          </div>
        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="py-24 bg-[#020617] px-6">
        <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-xl
          border border-white/20 rounded-3xl p-12 text-white">

          <h2 className="text-3xl font-extrabold mb-3">Newsletter</h2>
          <p className="text-blue-200 mb-8">
            Get campus updates, events & opportunities.
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl bg-white/10
              text-white border border-white/20 outline-none"
            />
            <button className="px-8 py-4 rounded-xl font-bold
              bg-orange-400 text-black hover:bg-orange-500 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-24 bg-[#020617] text-white text-center">
        <h2 className="text-4xl font-extrabold mb-6">
          Begin Your Journey at SRIT
        </h2>
        <p className="text-blue-200 mb-10">
          Admissions, placements and excellence — all in one campus.
        </p>

        <div className="flex justify-center gap-6">
          <Link
            to="/admissions"
            className="px-10 py-4 rounded-xl font-bold
            bg-orange-400 text-black hover:bg-orange-500 transition"
          >
            Apply Now
          </Link>
          <Link
            to="/contact"
            className="px-10 py-4 rounded-xl font-bold
            border border-orange-400 text-orange-300 hover:bg-white/10 transition"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
}

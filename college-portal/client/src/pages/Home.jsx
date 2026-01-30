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
    <div className="w-full overflow-x-hidden font-sans bg-[#020617]">

      {/* ================= HERO SECTION ================= */}
      <section
        className="relative min-h-screen flex items-start px-6 md:px-16 lg:px-24 pt-28"
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
        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
          className="relative z-10 max-w-3xl"
        >
          {/* Heading */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6"
          >
            Shape Your Future at
            <br />
            <span className="block text-yellow-400 text-6xl md:text-7xl font-black mt-2 drop-shadow-[0_0_30px_#FACC15]">
              SRIT
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-lg text-blue-100 mb-10
            bg-white/10 backdrop-blur-xl
            border border-white/20
            p-6 rounded-2xl shadow-lg"
          >
            Join a legacy of excellence. Our world-class faculty, cutting-edge
            research facilities, and vibrant campus community prepare you to
            lead and innovate in an ever-changing world.
          </motion.p>

          {/* Stats */}
          <motion.div className="flex gap-16 mb-10">
            {[
              { value: "15+", label: "Years of Excellence" },
              { value: "10k+", label: "Students Enrolled" },
              { value: "95%", label: "Placement Rate" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.12 }}
                className="cursor-pointer"
              >
                <p className="text-4xl font-extrabold text-yellow-400">
                  {stat.value}
                </p>
                <p className="text-blue-100 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Buttons */}
          <div className="flex gap-6">
            <Link
              to="/admissions"
              className="px-8 py-4 rounded-xl font-bold text-black
              bg-gradient-to-r from-yellow-400 to-yellow-500
              shadow-[0_0_30px_#FACC15AA]
              hover:shadow-[0_0_60px_#FACC15]
              transition flex items-center gap-2"
            >
              Start Your Application <ArrowRight size={20} />
            </Link>

            <Link
              to="/about"
              className="px-8 py-4 rounded-xl font-bold
              border border-yellow-400/60 text-yellow-300
              bg-white/10 backdrop-blur-xl
              hover:bg-white/20 transition flex items-center gap-2"
            >
              <Play size={18} /> Take a Virtual Tour
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ================= LATEST UPDATES ================= */}
      <section className="py-20 bg-gradient-to-b from-[#020617] to-[#020617]">
        <div className="max-w-6xl mx-auto px-6">

          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center">
              <Bell className="text-yellow-400" size={20} />
            </div>
            <h2 className="text-2xl font-black text-white">
              Latest Updates
            </h2>
          </div>

          <div className="bg-white/10 backdrop-blur-2xl
            rounded-2xl shadow-xl border border-white/20 divide-y divide-white/10">

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
              {
                icon: Bell,
                title: "Library Extended Hours During Finals Week",
                time: "3 days ago",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                  className="flex gap-5 px-6 py-6 cursor-pointer transition"
                >
                  <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center">
                    <Icon className="text-yellow-400" size={22} />
                  </div>

                  <div>
                    <p className="font-semibold text-white">
                      {item.title}
                    </p>
                    <p className="text-sm text-blue-200 mt-1">
                      {item.time}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-6">
            <button className="flex items-center gap-2 text-yellow-400 font-semibold hover:text-yellow-300 transition">
              View All Updates
              <ArrowRight size={18} />
            </button>
          </div>

        </div>
      </section>

      {/* ======= NEXT PART CONTINUES BELOW ======= */}
      {/* ================= DEPARTMENTS SECTION ================= */}
      <section className="py-24 md:py-32 bg-[#020617] text-white">
        <div className="max-w-7xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold">
              Our <span className="text-yellow-400">Departments</span>
            </h2>
            <p className="mt-4 text-blue-200 max-w-2xl mx-auto">
              Explore diverse academic departments built for innovation and excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
  { code: "CSE", name: "Computer Science & Engineering" },
  { code: "CSM", name: "Computer Science (AI & ML)" },
  { code: "ECE", name: "Electronics & Communication" },
  { code: "EEE", name: "Electrical & Electronics Engineering" },
  { code: "ME", name: "Mechanical Engineering", center: true },
  { code: "CE", name: "Civil Engineering", center: true }
].map((dept, i) => (
  <motion.div
    key={i}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.15, type: "spring", stiffness: 120 }}
    whileHover={{ scale: 1.05, y: -5 }}
    className={`group p-8 bg-white/10 backdrop-blur-md 
      border border-white/20 rounded-2xl shadow-md 
      hover:bg-white/20 hover:border-yellow-400/50 
      transition-all duration-300 cursor-pointer
      ${
        dept.center
          ? "lg:col-span-2 lg:mx-auto lg:w-1/2"
          : ""
      }
    `}
  >
    <h3 className="text-4xl font-bold text-yellow-400 mb-3">
      {dept.code}
    </h3>
    <p className="text-white/90 font-medium mb-4 group-hover:text-white transition">
      {dept.name}
    </p>
    <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-yellow-400 to-yellow-300 rounded transition-all duration-300"></div>
  </motion.div>
))}
          </div>  
          <div className="mt-14 text-center">
            <a
              href="/departments"
              className="inline-block px-10 py-4 rounded-full font-bold
              bg-yellow-400 text-black
              shadow-[0_0_30px_#FACC15AA]
              hover:shadow-[0_0_60px_#FACC15]
              transition"
            >
              View All Departments
            </a>
          </div>
        </div>
      </section>

      {/* ================= NEWSLETTER SECTION ================= */}
      <section className="py-24 px-6 bg-[#020617]">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl p-12
            bg-white/10 backdrop-blur-2xl
            border border-white/20
            shadow-[0_0_80px_#00000055] overflow-hidden">

            <div className="absolute -top-32 -right-32 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-yellow-400/20
                flex items-center justify-center mb-6 text-yellow-400 text-xl">
                ✉️
              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
                Newsletter
              </h2>

              <p className="text-blue-200 mb-8 max-w-2xl">
                Get weekly updates on campus news, events & opportunities.
              </p>

              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl bg-white/10
                  text-white placeholder-blue-200
                  border border-white/20 outline-none
                  focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 transition"
                />

                <button
                  className="px-10 py-4 rounded-xl font-bold text-black
                  bg-gradient-to-r from-yellow-400 to-yellow-500
                  shadow-[0_0_30px_#FACC15AA]
                  hover:shadow-[0_0_60px_#FACC15] transition"
                >
                  Subscribe →
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
            Real journeys. Real impact.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                text: "SRIT gave me exposure beyond textbooks. Hackathons & research shaped my career.",
                name: "Sarah Chen",
                role: "CSE Graduate, 2024",
                initials: "SC",
              },
              {
                text: "The campus culture helped me grow technically and personally.",
                name: "Marcus Johnson",
                role: "ECE Graduate, 2023",
                initials: "MJ",
              },
              {
                text: "Career guidance here is unmatched. I felt industry-ready.",
                name: "Emily Rodriguez",
                role: "Engineering Student, 2025",
                initials: "ER",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -12 }}
                className="relative bg-white rounded-3xl
                border border-gray-200 p-10 text-left
                shadow-md hover:shadow-2xl transition"
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
      <section className="relative py-28 px-6 bg-[#020617] text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Ready to Begin Your Journey?
          </h2>

          <p className="text-lg text-blue-200 max-w-3xl mx-auto mb-12">
            Your future starts here at SRIT.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-10 py-4 rounded-xl font-bold text-black bg-yellow-400 hover:bg-yellow-500 transition">
              Apply Now →
            </button>

            <button className="px-10 py-4 rounded-xl font-bold
              border-2 border-yellow-400 text-yellow-300 hover:bg-yellow-400/10 transition">
              Request Information
            </button>
          </div>
        </div>
      </section>
      {/* ================= FOOTER ================= */}
<footer className="relative bg-gradient-to-br from-[#020617] via-[#081A33] to-[#020617] text-gray-300 pt-20 pb-10">
  <div className="max-w-7xl mx-auto px-6">

    {/* TOP GRID */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

      {/* ABOUT */}
      <div>
        <h3 className="text-white text-xl font-bold mb-4">SRIT</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          Srinivasa Ramanujan Institute of Technology is committed to delivering
          quality technical education and fostering innovation, leadership,
          and ethical values.
        </p>

        {/* Social Icons */}
        <div className="flex gap-3">
          <a
            href="https://www.facebook.com/sritatp/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-yellow-400/20 flex items-center justify-center transition"
          >
            <FaFacebookF />
          </a>

          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-yellow-400/20 flex items-center justify-center transition"
          >
            <FaTwitter />
          </a>

          <a
            href="https://www.linkedin.com/company/sritatp/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-yellow-400/20 flex items-center justify-center transition"
          >
            <FaLinkedinIn />
          </a>

          <a
            href="https://www.instagram.com/sritatp/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-yellow-400/20 flex items-center justify-center transition"
          >
            <FaInstagram />
          </a>

          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-yellow-400/20 flex items-center justify-center transition"
          >
            <FaYoutube />
          </a>
        </div>
      </div>

      {/* QUICK LINKS */}
      <div>
        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
        <ul className="space-y-3 text-gray-400 text-sm">
          <li><Link to="/about" className="hover:text-yellow-400 transition">About Us</Link></li>
          <li><Link to="/admissions" className="hover:text-yellow-400 transition">Admissions</Link></li>
          <li><Link to="/departments" className="hover:text-yellow-400 transition">Departments</Link></li>
          <li><Link to="/placements" className="hover:text-yellow-400 transition">Placements</Link></li>
          <li><Link to="/contact" className="hover:text-yellow-400 transition">Contact Us</Link></li>
        </ul>
      </div>

      {/* DEPARTMENTS */}
      <div>
        <h4 className="text-white font-semibold mb-4">Departments</h4>
        <ul className="space-y-3 text-gray-400 text-sm">
          <li><Link to="/departments/cse" className="hover:text-yellow-400 transition">Computer Science (CSE)</Link></li>
          <li><Link to="/departments/ece" className="hover:text-yellow-400 transition">Electronics (ECE)</Link></li>
          <li><Link to="/departments/eee" className="hover:text-yellow-400 transition">Electrical (EEE)</Link></li>
          <li><Link to="/departments/me" className="hover:text-yellow-400 transition">Mechanical (ME)</Link></li>
          <li><Link to="/departments/ce" className="hover:text-yellow-400 transition">Civil (CE)</Link></li>
        </ul>
      </div>

      {/* CONTACT */}
      <div>
        <h4 className="text-white font-semibold mb-4">Contact</h4>
        <ul className="space-y-4 text-gray-400 text-sm">
          <li className="flex gap-2">
            📍 Rotarypuram Village, BK Samudram Mandal,<br />
            Ananthapuramu – 515701, AP
          </li>

          <li className="flex gap-2">
            📞 <a href="tel:+919876543210" className="hover:text-yellow-400 transition">
              +91 98765 43210
            </a>
          </li>

          <li className="flex gap-2">
            ✉️ <a href="mailto:info@srit.ac.in" className="hover:text-yellow-400 transition">
              info@srit.ac.in
            </a>
          </li>
        </ul>
      </div>
    </div>

    {/* DIVIDER */}
    <div className="border-t border-white/10 mt-14 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
      <p>© 2026 SRIT. All rights reserved.</p>

      <div className="flex gap-6 mt-4 md:mt-0">
        <Link to="/privacy-policy" className="hover:text-yellow-400 transition">
          Privacy Policy
        </Link>
        <Link to="/terms" className="hover:text-yellow-400 transition">
          Terms of Service
        </Link>
      </div>
    </div>

  </div>
</footer>
    </div>
  );
}
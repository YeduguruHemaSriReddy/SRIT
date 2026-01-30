import { useState } from "react";
import Footer from "../components/Footer";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Clock,
  ShieldCheck,
  Headphones,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { motion } from "framer-motion";

/* ================= REUSABLE GLASS CARD ================= */
function GlassCard({ children, className = "" }) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        rotateX: 4,
        rotateY: -4,
        scale: 1.02,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className={`
        relative group
        bg-white/10 backdrop-blur-2xl
        border border-white/20
        rounded-[2.5rem]
        shadow-[0_0_40px_rgba(56,189,248,0.25)]
        hover:shadow-[0_0_80px_rgba(251,191,36,0.35)]
        overflow-hidden
        ${className}
      `}
    >
      {/* neon edge */}
      <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none
        opacity-0 group-hover:opacity-100 transition
        ring-1 ring-cyan-300/40" />

      {/* light sweep */}
      <div className="absolute -inset-x-1/2 -inset-y-full
        bg-gradient-to-r from-transparent via-white/20 to-transparent
        rotate-12 group-hover:translate-y-[200%]
        transition duration-700" />

      {children}
    </motion.div>
  );
}

/* ================= MAIN PAGE ================= */
export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen font-sans text-slate-100
      bg-gradient-to-br from-[#020617] via-[#0B1F3A] to-[#164E63]">

      {/* ================= HERO ================= */}
      <section className="relative pt-40 pb-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#38BDF855,transparent_65%)]" />

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black mb-6
            bg-gradient-to-r from-[#FBBF24] via-[#67E8F9] to-[#22D3EE]
            bg-clip-text text-transparent drop-shadow-2xl"
        >
          Get in Touch
        </motion.h1>

        <p className="text-xl max-w-2xl mx-auto text-cyan-100">
          We’re here to guide you — admissions, academics, or campus life.
        </p>
      </section>

      {/* ================= CONTACT CARDS ================= */}
      <section className="py-20">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: MapPin,
              title: "Campus Location",
              value: "Rotarypuram Village, Anantapur, AP – 515701",
            },
            {
              icon: Phone,
              title: "Call Support",
              value: "+91 95156 11111",
            },
            {
              icon: Mail,
              title: "Email Queries",
              value: "info@srit.ac.in",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <GlassCard key={i} className="p-10 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl
                  bg-gradient-to-br from-[#FBBF24] to-[#22D3EE]
                  flex items-center justify-center text-black
                  group-hover:scale-110 transition">
                  <Icon className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-black text-[#FBBF24] mb-2">
                  {item.title}
                </h4>
                <p className="text-cyan-100">{item.value}</p>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* ================= FORM + INFO ================= */}
      <section className="py-28">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16">

          {/* FORM */}
          <GlassCard className="p-12">
            <h3 className="text-3xl font-black mb-8
              bg-gradient-to-r from-[#FBBF24] to-[#22D3EE]
              bg-clip-text text-transparent">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {["name", "email", "subject"].map((field) => (
                <input
                  key={field}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  required
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full px-6 py-4 rounded-2xl
                    bg-white/10 backdrop-blur-xl
                    border border-white/20
                    text-white placeholder:text-cyan-200
                    focus:ring-2 focus:ring-cyan-300
                    outline-none transition"
                />
              ))}

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                required
                placeholder="Your Message"
                className="w-full px-6 py-4 rounded-2xl
                  bg-white/10 backdrop-blur-xl
                  border border-white/20
                  text-white placeholder:text-cyan-200
                  focus:ring-2 focus:ring-cyan-300
                  outline-none transition"
              />

              <button
                type="submit"
                className="w-full py-5 rounded-full font-black text-black
                  bg-gradient-to-r from-[#FBBF24] to-[#22D3EE]
                  shadow-[0_0_40px_#22D3EEAA]
                  hover:shadow-[0_0_80px_#FBBF24AA]
                  hover:scale-105 transition flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" /> Send Message
              </button>
            </form>
          </GlassCard>

          {/* WHY SRIT */}
          <GlassCard className="p-12">
            <h3 className="text-2xl font-black mb-8 text-[#FBBF24]">
              Why SRIT Support?
            </h3>

            <ul className="space-y-6 text-cyan-100">
              <li className="flex gap-4 items-center">
                <Clock className="text-[#22D3EE]" /> 24/7 Availability
              </li>
              <li className="flex gap-4 items-center">
                <ShieldCheck className="text-[#22D3EE]" /> Verified Responses
              </li>
              <li className="flex gap-4 items-center">
                <Headphones className="text-[#22D3EE]" /> Direct Mentorship
              </li>
            </ul>
          </GlassCard>
        </div>
      </section>

      {/* ================= SOCIAL ================= */}
      <section className="py-24 text-center">
        <h4 className="text-2xl font-black mb-10 text-cyan-100">
          Join the SRIT Community
        </h4>

        <div className="flex justify-center gap-10">
          {[Facebook, Instagram, Linkedin].map((Icon, i) => (
            <motion.a
              key={i}
              whileHover={{ y: -8, scale: 1.1 }}
              className="w-16 h-16 rounded-2xl
                bg-white/10 backdrop-blur-xl
                border border-white/20
                flex items-center justify-center
                text-cyan-300 hover:text-black
                hover:bg-gradient-to-br from-[#FBBF24] to-[#22D3EE]
                transition"
            >
              <Icon />
            </motion.a>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

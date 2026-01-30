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

/* ================= REUSABLE CARD ================= */
function Card({ children, className = "" }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 160, damping: 18 }}
      className={`bg-white border border-gray-200 rounded-2xl
      shadow-md hover:shadow-xl transition ${className}`}
    >
      {children}
    </motion.div>
  );
}

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
          Get in Touch
        </motion.h1>

        <p className="text-xl max-w-2xl mx-auto text-gray-700">
          We’re here to guide you — admissions, academics, or campus life.
        </p>
      </section>

      {/* ================= CONTACT CARDS ================= */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 px-6 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
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
              <Card key={i} className="p-10 text-center">
                <div
                  className="w-16 h-16 mx-auto mb-6 rounded-xl
                  bg-orange-500 text-white
                  flex items-center justify-center"
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-black text-orange-500 mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-700">{item.value}</p>
              </Card>
            );
          })}
        </div>
      </motion.section>

      {/* ================= FORM + INFO ================= */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-28 px-6"
      >
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">

          {/* FORM */}
          <Card className="p-12">
            <h3 className="text-3xl font-black mb-8 text-orange-500">
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
                  className="w-full px-6 py-4 rounded-xl
                  border border-gray-300
                  focus:ring-2 focus:ring-orange-500
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
                className="w-full px-6 py-4 rounded-xl
                border border-gray-300
                focus:ring-2 focus:ring-orange-500
                outline-none transition"
              />

              <button
                type="submit"
                className="w-full py-5 rounded-full font-black
                bg-orange-500 text-white hover:bg-orange-600
                transition flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" /> Send Message
              </button>
            </form>
          </Card>

          {/* WHY SRIT */}
          <Card className="p-12">
            <h3 className="text-2xl font-black mb-8 text-orange-500">
              Why SRIT Support?
            </h3>

            <ul className="space-y-6 text-gray-700">
              <li className="flex gap-4 items-center">
                <Clock className="text-orange-500" /> 24/7 Availability
              </li>
              <li className="flex gap-4 items-center">
                <ShieldCheck className="text-orange-500" /> Verified Responses
              </li>
              <li className="flex gap-4 items-center">
                <Headphones className="text-orange-500" /> Direct Mentorship
              </li>
            </ul>
          </Card>
        </div>
      </motion.section>

      {/* ================= SOCIAL ================= */}
      <section className="py-24 text-center px-6 bg-gray-50">
        <h4 className="text-2xl font-black mb-10 text-orange-500">
          Join the SRIT Community
        </h4>

        <div className="flex justify-center gap-10">
          {[Facebook, Instagram, Linkedin].map((Icon, i) => (
            <motion.a
              key={i}
              whileHover={{ y: -6, scale: 1.05 }}
              className="w-16 h-16 rounded-xl
              bg-white border border-gray-200
              flex items-center justify-center
              text-blue-600 hover:bg-orange-500 hover:text-white
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

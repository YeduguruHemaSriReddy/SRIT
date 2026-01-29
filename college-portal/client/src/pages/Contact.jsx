import { useState } from "react";
import Footer from "../components/Footer";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Linkedin,
  Facebook,
  Send,
  Clock,
  ShieldCheck,
  Headphones,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

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
    alert("Message sent! Our support team will reach out to you within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const contactCards = [
    {
      icon: MapPin,
      title: "Campus Location",
      value:
        "Rotarypuram Village, B.K. Samudram Mandal, Anantapur, Andhra Pradesh – 515701",
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
  ];

  return (
    <div className="min-h-screen bg-blue-50">

      {/* HERO */}
      <section className="pt-32 pb-24 bg-blue-100 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black text-orange-500 mb-6"
        >
          Get In Touch
        </motion.h1>
        <p className="text-xl text-black max-w-2xl mx-auto">
          Whether you're a prospective student, parent, or partner, we're here to help.
        </p>
      </section>

      {/* CONTACT CARDS */}
      <section className="py-20">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
          {contactCards.map((card, i) => (
            <motion.div
              key={i}
              {...fadeInUp}
              className="p-8 rounded-3xl bg-blue-100 hover:bg-indigo-600 hover:text-white transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6">
                <card.icon className="w-7 h-7" />
              </div>
              <h4 className="text-2xl font-black text-orange-500 mb-2">
                {card.title}
              </h4>
              <p>{card.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="py-24">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16">

          {/* FORM */}
          <motion.div {...fadeInUp} className="bg-blue-100 p-12 rounded-[3rem]">
            <h3 className="text-3xl font-black text-blue-600 mb-6">Send Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className="w-full rounded-2xl px-6 py-4"
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Your Email"
                className="w-full rounded-2xl px-6 py-4"
              />
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                placeholder="Subject"
                className="w-full rounded-2xl px-6 py-4"
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Message"
                className="w-full rounded-2xl px-6 py-4"
              />
              <Button className="w-full py-6 bg-blue-200 hover:bg-indigo-600">
                <Send className="w-5 h-5" /> Send Message
              </Button>
            </form>
          </motion.div>

          {/* INFO */}
          <motion.div {...fadeInUp} className="bg-blue-100 p-12 rounded-[3rem]">
            <h3 className="text-2xl font-black text-blue-600 mb-6">
              Why SRIT Support?
            </h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <Clock /> 24/7 Availability
              </li>
              <li className="flex gap-4">
                <ShieldCheck /> Verified Responses
              </li>
              <li className="flex gap-4">
                <Headphones /> Direct Mentorship
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* SOCIAL CONNECT */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h4 className="text-2xl font-black mb-8">
            Join the SRIT Community Online
          </h4>

          <div className="flex justify-center gap-8">
            <SocialBtn
              icon={<Facebook />}
              label="Facebook"
              link="https://www.facebook.com/sritatp/"
            />
            <SocialBtn
              icon={<Instagram />}
              label="Instagram"
              link="https://www.instagram.com/sritatp/"
            />
            <SocialBtn
              icon={<Linkedin />}
              label="LinkedIn"
              link="https://www.linkedin.com/company/sritatp/"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function SocialBtn({ icon, label, link }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -6 }}
      className="flex flex-col items-center gap-2"
    >
      <div className="w-16 h-16 rounded-2xl bg-white text-indigo-600 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-xs font-bold uppercase tracking-widest">
        {label}
      </span>
    </motion.a>
  );
}

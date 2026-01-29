import { useState } from "react";
import Footer from "../components/Footer";
import { MapPin, Phone, Mail, Instagram, Linkedin, Facebook, Send, Clock, ShieldCheck, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! Our support team will reach out to you within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const contactCards = [
    {
      icon: MapPin,
      title: "Campus Location",
      value: "Rotarypuram Village, B.K. Samudram Mandal, Anantapur, Andhra Pradesh – 515701",
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

      {/* ================= HERO ================= */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-blue-100">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 bg-indigo-600 text-white rounded-full text-xs font-bold tracking-widest uppercase mb-6"
          >
            Connect With Us
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-orange-500 mb-6"
          >
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-black max-w-2xl mx-auto"
          >
            Whether you're a prospective student, parent, or partner, we're here 
            to answer your questions and provide the support you need.
          </motion.p>
        </div>
      </section>

      {/* ================= CONTACT CARDS ================= */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {contactCards.map((card, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-blue-100 border border-transparent hover:bg-indigo-600 hover:text-white transition-colors group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm mb-6 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                  <card.icon className="w-7 h-7" />
                </div>
                <h4 className="text-2xl font-black text-orange-500 mb-2 group-hover:text-white">{card.title}</h4>
                <p className="text-black group-hover:text-white">{card.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FORM + INFO ================= */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* FORM */}
            <motion.div {...fadeInUp} className="bg-blue-100 p-10 md:p-16 rounded-[3rem] shadow-xl border border-transparent hover:bg-indigo-600 hover:text-white transition-colors">
              <h3 className="text-3xl font-black text-blue-600 mb-2">Send Message</h3>
              <p className="text-black mb-10 font-medium">Expected response time: Within 24 hours</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your Name" className="w-full bg-white rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600 outline-none transition-all" />
                  <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className="w-full bg-white rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600 outline-none transition-all" />
                </div>
                <input type="text" name="subject" value={form.subject} onChange={handleChange} required placeholder="How can we help?" className="w-full bg-white rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600 outline-none transition-all" />
                <textarea name="message" value={form.message} onChange={handleChange} required rows={4} placeholder="Your message here..." className="w-full bg-white rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600 outline-none transition-all resize-none" />
                <Button className="w-full py-6 rounded-2xl bg-blue-200 hover:bg-indigo-600 hover:text-white font-black text-lg transition-colors">
                  <Send className="w-5 h-5" /> Send Message
                </Button>
              </form>
            </motion.div>

            {/* INFO CARDS */}
            <div className="space-y-12">
              <motion.div {...fadeInUp} className="bg-blue-100 rounded-[3rem] p-10 shadow-xl border border-transparent hover:bg-indigo-600 hover:text-white transition-colors">
                <h3 className="text-2xl font-black text-blue-600 mb-8">Why SRIT Support?</h3>
                <div className="space-y-8">
                  {[{icon: Clock, title:"24/7 Availability", text:"Our automated systems and dedicated staff ensure your queries are logged instantly."},
                    {icon: ShieldCheck, title:"Verified Response", text:"Every response is reviewed for accuracy by department heads."},
                    {icon: Headphones, title:"Direct Mentorship", text:"Prospective students get direct access to faculty counselors."},
                  ].map((item,i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-indigo-600 transition-colors">
                        <item.icon className="w-6 h-6 text-indigo-600 group-hover:text-indigo-600 transition-colors"/>
                      </div>
                      <div>
                        <h4 className="text-orange-500 font-bold text-lg">{item.title}</h4>
                        <p className="text-black group-hover:text-white">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div {...fadeInUp} className="bg-blue-100 rounded-[3rem] shadow-xl border border-transparent hover:bg-indigo-600 hover:text-white transition-colors overflow-hidden">
                <iframe
                  title="SRIT Location"
                  src="https://www.google.com/maps?q=Srinivasa%20Ramanujan%20Institute%20of%20Technology%20Anantapur&output=embed"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  loading="lazy"
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DEPARTMENT DIRECTORY ================= */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-black text-blue-600 mb-4">Direct <span className="text-orange-500">Directory</span></h2>
            <p className="text-black text-lg font-medium">Reach out directly to the right department for faster resolution.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { dept: "Admissions", name: "Mr. A.V. Dhanunjaya Reddy", phone: "7893005519", email: "doa@srit.ac.in" },
              { dept: "Principal", name: "Dr. G. Balakrishna", phone: "7893005520", email: "principal@srit.ac.in" },
              { dept: "Placement", name: "Dr. M. Ranjit Reddy", phone: "9515711111", email: "tpo@srit.ac.in" },
              { dept: "Examinations", name: "Dr. T. V. N. Jayudu", phone: "9885258147", email: "dcoe@srit.ac.in" },
              { dept: "Women Cell", name: "Dr. P. Vinatha", phone: "9959803183", email: "wepcell@srit.ac.in" },
              { dept: "Student Support", name: "General Help Desk", phone: "9515611111", email: "support@srit.ac.in" },
            ].map((item, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                transition={{ delay: i * 0.05 }}
                className="p-8 rounded-3xl bg-blue-100 border border-transparent hover:bg-indigo-600 hover:text-white transition-colors group"
              >
                <h4 className="text-orange-500 font-black text-xs uppercase tracking-widest mb-2 group-hover:text-white">{item.dept}</h4>
                <h5 className="text-orange-500 text-xl font-black mb-4 group-hover:text-white">{item.name}</h5>
                <div className="space-y-2">
                  <a href={`tel:${item.phone}`} className="flex items-center gap-3 text-black hover:text-white transition font-bold text-sm">
                    <Phone className="w-4 h-4" /> {item.phone}
                  </a>
                  <a href={`mailto:${item.email}`} className="flex items-center gap-3 text-black hover:text-white transition font-bold text-sm">
                    <Mail className="w-4 h-4" /> {item.email}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SOCIAL CONNECT ================= */}
      <section className="py-20 bg-indigo-600 relative overflow-hidden text-white">
        <div className="container mx-auto px-6 text-center">
          <h4 className="text-2xl font-black mb-8">Join the SRIT Community Online</h4>
          <div className="flex justify-center gap-8">
            <SocialBtn icon={<Facebook />} label="Facebook" />
            <SocialBtn icon={<Instagram />} label="Instagram" />
            <SocialBtn icon={<Linkedin />} label="LinkedIn" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function SocialBtn({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <motion.a
      href="#"
      whileHover={{ y: -5 }}
      className="flex flex-col items-center gap-2 group"
    >
      <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-indigo-600 transition-all duration-300">
        {icon}
      </div>
      <span className="text-xs font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100">{label}</span>
    </motion.a>
  );
}

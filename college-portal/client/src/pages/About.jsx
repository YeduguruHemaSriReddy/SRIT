import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Trophy,
  BookOpen,
  Calendar,
  Sparkles,
  ArrowRight
} from "lucide-react";
import Footer from "../components/Footer";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-50 font-sans text-slate-900">
      <section className="relative min-h-[80vh] flex items-center justify-center bg-blue-100">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-200 text-orange-600 rounded-full text-sm font-bold uppercase mb-6"
          >
            <Sparkles className="w-4 h-4" /> Excellence Since 2007
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black mb-6 text-blue-700"
          >
            Building the <br />
            <span className="text-orange-500 italic">Future of Engineering</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg md:text-2xl max-w-3xl mx-auto mb-10 text-slate-700"
          >
            Srinivasa Ramanujan Institute of Technology: A hub of innovation and academic excellence.
          </motion.p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate("/programs")}
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-indigo-600 flex items-center gap-2 transition"
            >
              Explore Programs <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="px-8 py-4 border-2 border-blue-600 text-indigo-600 rounded-full font-bold hover:bg-indigo-50 transition"
            >
              Contact Admissions
            </button>
          </div>
        </div>
      </section>

      <section className="-mt-16 container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-blue-100 p-10 rounded-[2.5rem] shadow-xl">
          <StatItem value="2007" label="Established" icon={<Calendar className="text-blue-600" />} />
          <StatItem value="3000+" label="Students" icon={<Users className="text-blue-600" />} />
          <StatItem value="20+" label="Programs" icon={<BookOpen className="text-blue-600" />} />
          <StatItem value="90%+" label="Placements" icon={<Trophy className="text-blue-600" />} />
        </div>
      </section>

      <section className="py-24 bg-blue-50">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="rounded-3xl overflow-hidden">
            <div className="relative rounded-3xl overflow-hidden group">
  <img
    src="/images/srit-campus.jpg"
    className="w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition duration-500" />
</div>

          </div>

          <div className="space-y-6">
            <h2 className="text-5xl font-black text-blue-700">
              A Legacy of <span className="text-orange-500">Excellence</span>
            </h2>

            <p className="text-lg text-slate-800">
              Founded in 2007, SRIT stands as a premier engineering institute nurturing innovation and leadership.
            </p>

            <p className="bg-blue-100 p-6 rounded-xl border-l-4 border-indigo-600 italic text-slate-800">
              “We shape engineers who shape the future.”
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-blue-100">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
          <FeatureCard title="Academics" desc="Strong fundamentals" icon={<BookOpen />} />
          <FeatureCard title="Industry" desc="Real-world exposure" icon={<Users />} />
          <FeatureCard title="Placements" desc="Top recruiters" icon={<Trophy />} />
        </div>
      </section>

      <Footer />
    </div>
  );
}

function StatItem({ value, label, icon }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 mx-auto bg-blue-200 rounded-full flex items-center justify-center mb-3">
        {icon}
      </div>
      <h3 className="text-3xl font-black text-blue-700">{value}</h3>
      <p className="text-sm text-slate-700 uppercase font-semibold">{label}</p>
    </div>
  );
}

function FeatureCard({ title, desc, icon }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03 }}
      className="p-8 bg-blue-50 rounded-[2.5rem] shadow hover:shadow-2xl transition"
    >
      <div className="w-12 h-12 bg-blue-200 rounded-xl flex items-center justify-center mb-4 text-blue-700">
        {icon}
      </div>
      <h3 className="text-xl font-black text-blue-700 mb-2">{title}</h3>
      <p className="text-slate-700">{desc}</p>
    </motion.div>
  );
}

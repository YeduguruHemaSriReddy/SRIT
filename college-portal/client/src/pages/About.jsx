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
  return (
    <div className="min-h-screen bg-blue-50 font-sans text-slate-900">

      {/* ================= HERO ================= */}
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
            className="text-5xl md:text-8xl font-black mb-6 text-orange-600"
          >
            Building the <br />
            <span className="text-blue-700 italic">Future of Engineering</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg md:text-2xl max-w-3xl mx-auto mb-10 text-slate-700"
          >
            Srinivasa Ramanujan Institute of Technology: A hub of innovation and academic excellence.
          </motion.p>

          <div className="flex justify-center gap-4">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 flex items-center gap-2">
              Explore Programs <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 border-2 border-blue-600 text-orange-600 rounded-full font-bold hover:bg-blue-100">
              Contact Admissions
            </button>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="-mt-16 container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-blue-100 p-10 rounded-3xl shadow-xl">
          <StatItem value="2007" label="Established" icon={<Calendar className="text-blue-600" />} />
          <StatItem value="3000+" label="Students" icon={<Users className="text-blue-600" />} />
          <StatItem value="20+" label="Programs" icon={<BookOpen className="text-blue-600" />} />
          <StatItem value="90%+" label="Placements" icon={<Trophy className="text-blue-600" />} />
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="py-24 bg-blue-50">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          <div className="rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1562774053-701939374585"
              alt="Campus"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-5xl font-black text-orange-600">
              A Legacy of <span className="text-blue-700">Excellence</span>
            </h2>

            <p className="text-lg text-slate-700">
              Founded in 2007, SRIT stands as a premier engineering institute nurturing innovation and leadership.
            </p>

            <p className="bg-blue-100 p-6 rounded-xl border-l-4 border-blue-600 italic text-slate-800">
              “We shape engineers who shape the future.”
            </p>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
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

/* ================= COMPONENTS ================= */

function StatItem({ value, label, icon }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 mx-auto bg-blue-200 rounded-full flex items-center justify-center mb-3">
        {icon}
      </div>
      <h3 className="text-3xl font-black text-orange-600">{value}</h3>
      <p className="text-sm text-slate-700 uppercase font-semibold">{label}</p>
    </div>
  );
}

function FeatureCard({ title, desc, icon }) {
  return (
    <motion.div className="p-8 bg-blue-50 rounded-3xl shadow hover:shadow-xl transition">
      <div className="w-12 h-12 bg-blue-200 rounded-xl flex items-center justify-center mb-4 text-blue-700">
        {icon}
      </div>
      <h3 className="text-xl font-black text-orange-600 mb-2">{title}</h3>
      <p className="text-slate-700">{desc}</p>
    </motion.div>
  );
}
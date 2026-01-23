import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative py-32 bg-gradient-to-br from-indigo-700 via-blue-600 to-orange-500 text-white">
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold mb-6"
          >
            Srinivasa Ramanujan <br />
            <span className="text-yellow-300">Institute of Technology</span>
          </motion.h1>

          <p className="text-lg md:text-xl max-w-4xl mx-auto text-white/90 leading-relaxed">
            A premier engineering institution at Anantapur shaping
            future-ready engineers through innovation, ethics, and excellence.
          </p>
        </div>
      </section>

      {/* ================= FLOATING STATS ================= */}
      <section className="-mt-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-6">
          <StatCard title="Established" value="2007" color="from-blue-500 to-indigo-600" />
          <StatCard title="Students" value="3000+" color="from-emerald-500 to-teal-600" />
          <StatCard title="Programs" value="20+" color="from-orange-500 to-red-500" />
          <StatCard title="Placements" value="90%+" color="from-purple-500 to-fuchsia-600" />
        </div>
      </section>

      {/* ================= ABOUT CONTENT ================= */}
      <section className="py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-6 space-y-10 text-lg text-gray-700 leading-relaxed">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <b className="text-primary">Srinivasa Ramanujan Institute of Technology (SRIT)</b>,
            established in <b>November 2007</b> by <b>Sri Aluru Sambasiva Reddy</b>,
            stands as a symbol of quality technical education in Andhra Pradesh.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Located at <b>Anantapur</b>, SRIT is affiliated to
            <b> JNTU Anantapur</b>, approved by <b>AICTE</b>,
            and accredited by <b>NAAC</b>. The institute blends academic rigor
            with real-world industry exposure.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            SRIT nurtures students with strong technical foundations,
            leadership qualities, ethical values, and innovation-driven thinking
            to succeed in a competitive global environment.
          </motion.p>
        </div>
      </section>

      {/* ================= VISION & MISSION ================= */}
      <section className="py-28 bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-800 text-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20"
          >
            <h2 className="text-3xl font-bold mb-4 text-yellow-300">Our Vision</h2>
            <p className="text-white/90 leading-relaxed">
              To emerge as a center of excellence in engineering education
              fostering innovation, research, leadership, and ethical values
              for the betterment of society.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20"
          >
            <h2 className="text-3xl font-bold mb-4 text-orange-300">Our Mission</h2>
            <ul className="space-y-3 text-white/90">
              <li>✔ Deliver quality technical education</li>
              <li>✔ Encourage research & innovation</li>
              <li>✔ Strengthen industry collaboration</li>
              <li>✔ Develop ethical & responsible professionals</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ================= WHY SRIT ================= */}
      <section className="py-28 bg-gradient-to-br from-orange-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center mb-14">
            Why <span className="text-primary">Choose SRIT?</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature text="Academic Excellence" />
            <Feature text="Industry-Oriented Curriculum" />
            <Feature text="Strong Placement Support" />
            <Feature text="Modern Infrastructure" />
            <Feature text="Experienced Faculty" />
            <Feature text="Student-Centric Learning" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value, color }) {
  return (
    <div
      className={`bg-gradient-to-br ${color} text-white rounded-2xl p-8 shadow-xl text-center`}
    >
      <h3 className="text-4xl font-extrabold mb-2">{value}</h3>
      <p className="uppercase tracking-wide text-sm">{title}</p>
    </div>
  );
}

function Feature({ text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-8 text-center shadow-lg hover:scale-105 transition font-semibold text-gray-700"
    >
      {text}
    </motion.div>
  );
}

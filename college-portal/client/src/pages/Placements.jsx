import Footer from "../components/Footer";
import { motion } from "framer-motion";
import {
  Users,
  Building,
  TrendingUp,
  Award,
  GraduationCap,
  Star,
} from "lucide-react";
import { Button } from "../components/ui/button";

export default function Placements() {
  const stats = [
    { icon: Users, value: "850+", label: "Students Placed", color: "from-blue-200 to-blue-300" },
    { icon: Building, value: "120+", label: "Recruiting Companies", color: "from-emerald-200 to-teal-300" },
    { icon: TrendingUp, value: "12 LPA", label: "Highest Package", color: "from-blue-200 to-blue-300" },
    { icon: Award, value: "4.5 LPA", label: "Average Package", color: "from-purple-200 to-pink-300" },
  ];

  const branches = [
    { name: "CSE / CSM / CSD", rate: "95%" },
    { name: "ECE", rate: "90%" },
    { name: "EEE", rate: "85%" },
    { name: "MECH", rate: "80%" },
    { name: "CIVIL", rate: "75%" },
  ];

  const recruiters = [
    "TCS", "Infosys", "Wipro", "Accenture", "Cognizant",
    "Capgemini", "Tech Mahindra", "Amazon", "Deloitte",
    "IBM", "HCL", "Oracle",
  ];

  const features = [
    "CRT training from 1st year",
    "Dedicated placement cell",
    "Mock interviews & aptitude tests",
    "Soft skills & communication training",
    "Internships & industry projects",
    "Alumni mentorship support",
  ];

  return (
    <div className="min-h-screen bg-blue-50">

      {/* ================= HERO ================= */}
      <section className="pt-36 pb-28 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-extrabold mb-6 text-slate-900"
        >
          Career Opportunities at <span className="text-orange-500">SRIT</span>
        </motion.h1>
        <p className="text-xl text-gray-700 max-w-4xl mx-auto">
          Our Training & Placement Cell ensures students are industry-ready
          through continuous skill development, internships, and top-company
          recruitment drives.
        </p>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`rounded-3xl p-8 text-slate-900 shadow-lg bg-gradient-to-br ${item.color} hover:from-indigo-500 hover:to-indigo-700 transition-colors`}
              >
                <Icon className="w-10 h-10 mb-4" />
                <h3 className="text-4xl font-extrabold">{item.value}</h3>
                <p className="opacity-90 mt-2">{item.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ================= BRANCH WISE ================= */}
      <section className="py-24 text-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Branch-Wise Placement Performance
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {branches.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-blue-100 p-8 rounded-2xl shadow-md text-center hover:bg-indigo-600 hover:text-white transition-colors"
              >
                <GraduationCap className="w-10 h-10 mx-auto mb-4 text-orange-500" />
                <h3 className="text-xl font-bold">{b.name}</h3>
                <p className="text-3xl font-extrabold mt-3">{b.rate}</p>
                <p className="opacity-80 mt-1">Placement Rate</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRAINING ================= */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14 text-slate-900">
            Training & Career Development
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 bg-blue-100 p-6 rounded-2xl shadow-md hover:bg-indigo-600 hover:text-white transition-colors"
              >
                <Star className="w-7 h-7 text-orange-500 mt-1" />
                <p className="font-medium">{f}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= RECRUITERS ================= */}
      <section className="py-24 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6 text-slate-900">
            Top Recruiters
          </h2>
          <p className="text-gray-700 mb-12">
            Leading companies regularly recruit SRIT graduates
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {recruiters.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="px-6 py-3 rounded-full bg-blue-100 shadow-md font-semibold text-slate-900 hover:bg-indigo-600 hover:text-white transition-colors"
              >
                {r}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-28 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900">
            Transforming Students into Professionals
          </h2>
          <p className="text-lg max-w-3xl mx-auto mb-10 text-slate-700">
            SRIT’s placement ecosystem is designed to ensure every student gets
            the opportunity to succeed in their chosen career path.
          </p>

          <Button size="lg" variant="secondary" className="px-12 py-6 text-lg bg-blue-100 hover:bg-indigo-600 hover:text-white transition-colors">
            Contact Placement Cell
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
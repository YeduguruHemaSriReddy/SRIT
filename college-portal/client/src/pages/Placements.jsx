import Footer from "../components/Footer";
import { motion } from "framer-motion";
import {
  Users,
  Building,
  TrendingUp,
  Award,
  GraduationCap,
  Star,
  ArrowRight,
} from "lucide-react";
import { Button } from "../components/ui/button";

export default function Placements() {
  const stats = [
    { icon: Users, value: "850+", label: "Students Placed" },
    { icon: Building, value: "120+", label: "Recruiting Companies" },
    { icon: TrendingUp, value: "12 LPA", label: "Highest Package" },
    { icon: Award, value: "4.5 LPA", label: "Average Package" },
  ];

  const branches = [
    { name: "CSE / CSM / CSD", rate: "95%" },
    { name: "ECE", rate: "90%" },
    { name: "EEE", rate: "85%" },
    { name: "MECH", rate: "80%" },
    { name: "CIVIL", rate: "75%" },
  ];

  const recruiters = [
    "TCS","Infosys","Wipro","Accenture","Cognizant",
    "Capgemini","Tech Mahindra","Amazon","Deloitte",
    "IBM","HCL","Oracle",
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
    /* 🔑 FIX FOR FIXED NAVBAR */
    <div className="min-h-screen font-sans bg-white text-black pt-[220px]">

      {/* ================= HERO ================= */}
      <section className="py-32 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-black mb-6 text-orange-500"
        >
          Careers that Shape the Future
        </motion.h1>

        <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700">
          Our Training & Placement Cell ensures students are industry-ready
          through continuous skill development and top-company recruitment.
        </p>
      </section>

      {/* ================= STATS ================= */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="px-6"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl
                p-8 text-center shadow-md hover:shadow-xl transition"
              >
                <div className="w-14 h-14 mx-auto mb-3 rounded-full
                  bg-orange-500 text-white flex items-center justify-center">
                  <Icon />
                </div>
                <h3 className="text-3xl font-black text-orange-500">
                  {item.value}
                </h3>
                <p className="text-sm text-gray-600 uppercase font-semibold">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* ================= BRANCH WISE ================= */}
      <section className="py-32 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-16 text-orange-500">
            Branch-Wise Placement Performance
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {branches.map((b, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="bg-white border border-gray-200 rounded-2xl
                p-8 text-center shadow-md hover:shadow-xl transition"
              >
                <GraduationCap className="w-10 h-10 mx-auto mb-4 text-orange-500" />
                <h3 className="text-xl font-bold">{b.name}</h3>
                <p className="text-4xl font-black mt-4 text-blue-600">
                  {b.rate}
                </p>
                <p className="text-sm text-gray-600 mt-1">Placement Rate</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRAINING ================= */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-16 text-orange-500">
            Training & Career Development
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {features.map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 6 }}
                className="flex gap-4 items-center
                bg-white border border-gray-200
                p-6 rounded-2xl shadow-md hover:shadow-xl transition"
              >
                <Star className="w-6 h-6 text-orange-500" />
                <p className="font-medium text-gray-700">{f}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= RECRUITERS ================= */}
      <section className="py-32 text-center px-6 bg-gray-50">
        <h2 className="text-4xl font-black mb-12 text-orange-500">
          Top Recruiters
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {recruiters.map((r, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="px-6 py-3 rounded-full
              bg-white border border-gray-200
              shadow-md hover:shadow-xl font-semibold transition"
            >
              {r}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-28 text-center px-6">
        <h2 className="text-4xl md:text-5xl font-black mb-6 text-orange-500">
          Transforming Students into Professionals
        </h2>

        <p className="text-lg mb-10 text-gray-700">
          SRIT’s placement ecosystem ensures real-world exposure for every student.
        </p>

        <a href="tel:+919876543210">
          <Button
            size="lg"
            className="px-14 py-6 text-lg font-black
            bg-orange-500 text-white hover:bg-orange-600 transition"
          >
            Contact Placement Cell <ArrowRight className="ml-2" />
          </Button>
        </a>
      </section>

      <Footer />
    </div>
  );
}

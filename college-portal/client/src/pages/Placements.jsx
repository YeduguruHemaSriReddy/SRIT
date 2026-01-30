import Footer from "../components/Footer";
import { motion } from "framer-motion";
import {
  Users,
  Building,
  TrendingUp,
  Award,
  GraduationCap,
  Star,
  Sparkles,
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
    <div className="min-h-screen font-sans bg-gradient-to-br from-[#020617] via-[#0B1F3A] to-[#164E63] text-[#F8FAFC]">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#22D3EE55,transparent_65%)]" />

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2
            bg-white/10 backdrop-blur-xl text-[#FBBF24]
            rounded-full text-sm font-extrabold uppercase mb-6
            border border-white/20 shadow-[0_0_30px_#22D3EE66]"
          >
            <Sparkles size={16} /> Placements @ SRIT
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6
            bg-gradient-to-r from-[#FBBF24] via-[#67E8F9] to-[#22D3EE]
            bg-clip-text text-transparent drop-shadow-2xl"
          >
            Careers that <br /> Shape the Future
          </motion.h1>

          <p className="text-lg md:text-xl max-w-3xl mx-auto text-[#E0F2FE]">
            Our Training & Placement Cell ensures students are industry-ready with
            continuous skill development and top-company recruitment drives.
          </p>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="-mt-24 container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6
          bg-white/10 backdrop-blur-2xl p-10 rounded-3xl
          border border-white/20 shadow-[0_0_60px_#22D3EE55]">
          {stats.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto mb-3 rounded-full
                  bg-gradient-to-br from-[#FBBF24] to-[#22D3EE]
                  flex items-center justify-center text-black shadow-lg">
                  <Icon />
                </div>
                <h3 className="text-3xl font-black text-[#FBBF24]">{item.value}</h3>
                <p className="text-sm text-[#CBD5F5] uppercase font-semibold">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ================= BRANCH WISE ================= */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-black text-center mb-16
            bg-gradient-to-r from-[#FBBF24] to-[#22D3EE]
            bg-clip-text text-transparent">
            Branch-Wise Placement Performance
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {branches.map((b, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -12, scale: 1.05 }}
                className="p-8 rounded-3xl text-center
                bg-white/10 backdrop-blur-2xl
                border border-white/20
                shadow-[0_0_40px_#22D3EE55]
                hover:shadow-[0_0_80px_#FBBF24AA] transition"
              >
                <GraduationCap className="w-10 h-10 mx-auto mb-4 text-[#FBBF24]" />
                <h3 className="text-xl font-bold">{b.name}</h3>
                <p className="text-4xl font-black mt-4 text-[#67E8F9]">
                  {b.rate}
                </p>
                <p className="text-sm text-[#CBD5F5] mt-1">Placement Rate</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRAINING ================= */}
      <section className="py-32 bg-gradient-to-br from-[#020617] to-[#0B1F3A]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-black text-center mb-16
            bg-gradient-to-r from-[#FBBF24] to-[#22D3EE]
            bg-clip-text text-transparent">
            Training & Career Development
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {features.map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 10 }}
                className="flex gap-4 items-center
                bg-white/10 backdrop-blur-xl
                p-6 rounded-2xl
                border border-white/20
                shadow-[0_0_30px_#22D3EE44]
                hover:shadow-[0_0_60px_#FBBF24AA] transition"
              >
                <Star className="w-6 h-6 text-[#FBBF24]" />
                <p className="font-medium text-[#E5E7EB]">{f}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= RECRUITERS ================= */}
      <section className="py-32 text-center">
        <h2 className="text-4xl font-black mb-12
          bg-gradient-to-r from-[#FBBF24] to-[#22D3EE]
          bg-clip-text text-transparent">
          Top Recruiters
        </h2>

        <div className="flex flex-wrap justify-center gap-4 px-6">
          {recruiters.map((r, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.15 }}
              className="px-6 py-3 rounded-full
              bg-white/10 backdrop-blur-xl
              border border-white/20
              shadow-[0_0_25px_#22D3EE55]
              hover:shadow-[0_0_50px_#FBBF24AA]
              font-semibold transition"
            >
              {r}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-28 text-center bg-gradient-to-br from-[#020617] to-[#0B1F3A]">
        <h2 className="text-4xl md:text-5xl font-black mb-6
          bg-gradient-to-r from-[#FBBF24] to-[#22D3EE]
          bg-clip-text text-transparent">
          Transforming Students into Professionals
        </h2>

        <p className="text-lg mb-10 text-[#CBD5F5]">
          SRIT’s placement ecosystem ensures real-world exposure for every student.
        </p>

        <a href="tel:+919876543210">
          <Button
            size="lg"
            className="px-14 py-6 text-lg font-black text-black
            bg-gradient-to-r from-[#FBBF24] to-[#22D3EE]
            shadow-[0_0_40px_#22D3EEAA]
            hover:shadow-[0_0_80px_#FBBF24AA]
            hover:scale-105 transition"
          >
            Contact Placement Cell <ArrowRight className="ml-2" />
          </Button>
        </a>
      </section>

      <Footer />
    </div>
  );
}

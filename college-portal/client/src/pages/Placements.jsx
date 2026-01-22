import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import { motion } from "framer-motion";
import {
  Briefcase,
  Building,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";
import { Button } from "../components/ui/button";

export default function Placements() {
  const stats = [
    { icon: Users, label: "Students Placed", value: "850+" },
    { icon: Building, label: "Recruiting Companies", value: "120+" },
    { icon: TrendingUp, label: "Highest Package", value: "12 LPA" },
    { icon: Award, label: "Average Package", value: "4.5 LPA" },
  ];

  const recruiters = [
    "TCS",
    "Infosys",
    "Wipro",
    "Accenture",
    "Cognizant",
    "Capgemini",
    "Tech Mahindra",
    "Amazon",
    "Deloitte",
    "HCL",
    "IBM",
    "Oracle",
  ];

  const process = [
    {
      title: "Training & Skill Development",
      desc: "Aptitude, coding, communication, and soft-skills training from first year onwards.",
    },
    {
      title: "Industry Interaction",
      desc: "Guest lectures, industrial visits, and internships with leading companies.",
    },
    {
      title: "Placement Drives",
      desc: "On-campus and pooled drives conducted throughout the academic year.",
    },
    {
      title: "Career Support",
      desc: "Resume building, mock interviews, and continuous mentoring.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* ================= HERO ================= */}
      <section className="pt-32 pb-20 bg-gray-50 text-center">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Placements
          </motion.h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our dedicated Training & Placement Cell ensures excellent career
            opportunities for students through continuous training and industry collaboration.
          </p>
        </div>
      </section>

      {/* ================= PLACEMENT STATS ================= */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Placement Highlights"
            subtitle="Our Achievements"
            centered
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {stats.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-xl shadow-md text-center"
              >
                <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold">{item.value}</h3>
                <p className="text-gray-600">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PLACEMENT PROCESS ================= */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Placement Process"
            subtitle="How We Prepare You"
            centered
          />

          <div className="grid md:grid-cols-2 gap-10 mt-12">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-md"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Briefcase className="w-6 h-6 text-primary" />
                  <h4 className="font-bold text-lg">{step.title}</h4>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= RECRUITERS ================= */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Our Recruiters"
            subtitle="Industry Partners"
            centered
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
            {recruiters.map((company, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-4 rounded-lg shadow-sm text-center font-semibold text-gray-700"
              >
                {company}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-primary text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Building Careers, Creating Leaders
        </h2>
        <p className="text-lg mb-8 opacity-90 max-w-3xl mx-auto">
          SRIT is committed to shaping industry-ready graduates through
          continuous training and placement support.
        </p>

        <Button size="lg" variant="secondary">
          Contact Placement Cell
        </Button>
      </section>

      <Footer />
    </div>
  );
}

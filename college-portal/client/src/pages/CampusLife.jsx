import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import { motion } from "framer-motion";
import {
  Users,
  Music,
  Trophy,
  BookOpen,
  Dumbbell,
  Microscope,
  Camera,
  Coffee
} from "lucide-react";

export default function CampusLife() {
  const campusSections = [
    {
      icon: Users,
      title: "Student Clubs",
      desc: "Technical, cultural, literary and social clubs that nurture creativity and leadership.",
    },
    {
      icon: Microscope,
      title: "Laboratories",
      desc: "Well-equipped laboratories with modern tools and hands-on learning environment.",
    },
    {
      icon: BookOpen,
      title: "Library",
      desc: "Extensive digital and physical library resources supporting academic excellence.",
    },
    {
      icon: Trophy,
      title: "Sports & Games",
      desc: "Indoor and outdoor sports facilities encouraging fitness and teamwork.",
    },
    {
      icon: Music,
      title: "Cultural Activities",
      desc: "Annual fests, cultural nights, and celebrations that bring students together.",
    },
    {
      icon: Dumbbell,
      title: "Fitness & Wellness",
      desc: "Gymnasium, yoga, and wellness initiatives for holistic development.",
    },
    {
      icon: Camera,
      title: "Events & Memories",
      desc: "Workshops, seminars, hackathons, and unforgettable campus moments.",
    },
    {
      icon: Coffee,
      title: "Cafeteria",
      desc: "Hygienic and affordable food options catering to students and staff.",
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
            Campus Life at SRIT
          </motion.h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience a vibrant campus environment that goes beyond classrooms,
            fostering innovation, creativity, and lifelong friendships.
          </p>
        </div>
      </section>

      {/* ================= CAMPUS LIFE SECTIONS ================= */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Life Beyond Academics"
            subtitle="Explore Campus Life"
            centered
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {campusSections.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <item.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STUDENT EXPERIENCE ================= */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            A Place to Learn, Grow & Lead
          </motion.h2>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            Campus life at SRIT is designed to shape confident professionals
            through collaborative learning, innovation hubs, and student-driven initiatives.
          </p>
        </div>
      </section>

      {/* ================= CAMPUS HIGHLIGHTS ================= */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Why Students Love SRIT"
            subtitle="Campus Highlights"
            centered
          />

          <div className="grid md:grid-cols-3 gap-10 mt-12">
            {[
              "Green & eco-friendly campus",
              "Industry interaction programs",
              "Hackathons & tech events",
              "Cultural & sports festivals",
              "Supportive faculty & mentors",
              "Safe and inclusive environment",
            ].map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xl shadow-md text-center"
              >
                <h4 className="font-semibold text-gray-800">{point}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

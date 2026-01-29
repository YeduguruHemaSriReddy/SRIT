import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Users, 
  Trophy, 
  BookOpen, 
  Microscope, 
  Coffee, 
  Music,
  Zap,
  Gamepad2
} from "lucide-react";
import Footer from "../components/Footer";

const campusLife = [
  {
    title: "Innovation Hub",
    desc: "State-of-the-art labs where theory meets reality. Our research cells are the birthplace of next-gen ideas.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    icon: Microscope,
    tag: "Research"
  },
  {
    title: "The Knowledge Hub",
    desc: "A massive central library with thousands of journals and digital access to global research papers.",
    img: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop",
    icon: BookOpen,
    tag: "Academic"
  },
  {
    title: "Arena of Champions",
    desc: "From professional cricket grounds to indoor badminton courts, we prioritize physical excellence.",
    img: "https://images.unsplash.com/photo-1526676023131-d35216858f0a?q=80&w=2070&auto=format&fit=crop",
    icon: Trophy,
    tag: "Sports"
  },
  {
    title: "Creative Pulse",
    desc: "Annual fests, music nights, and drama workshops that keep the campus spirit alive and thriving.",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
    icon: Music,
    tag: "Cultural"
  },
  {
    title: "Tech Society",
    desc: "Student-run coding clubs and robotics teams that compete and win at national level hackathons.",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
    icon: Zap,
    tag: "Technology"
  },
  {
    title: "Social Lounge",
    desc: "A vibrant cafeteria serving hygienic, diverse cuisines – the favorite hangout for brainstorming.",
    img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop",
    icon: Coffee,
    tag: "Lifestyle"
  },
];

const testimonials = [
  {
    name: "Arjun Varma",
    role: "B.Tech CSE, 4th Year",
    text: "The tech clubs at SRIT changed my perspective on engineering. I'm not just learning to code; I'm learning to build products that matter.",
  },
  {
    name: "Priya Reddy",
    role: "B.Tech EEE, Alumna",
    text: "Campus life here is a perfect balance. One day you're in a high-tech lab, and the next you're performing on stage at the annual fest.",
  },
  {
    name: "Karthik S.",
    role: "B.Tech Mech, 3rd Year",
    text: "The sports facilities are top-notch. Representing SRIT in the inter-college cricket tournament was a highlight of my college life.",
  },
];

const stats = [
  { title: "Student Clubs", value: "18+", icon: Users },
  { title: "Tech Events", value: "25+", icon: Zap },
  { title: "Sports Cups", value: "15+", icon: Trophy },
  { title: "Annual Fests", value: "03", icon: Gamepad2 },
];

export default function CampusLife() {
  const navigate = useNavigate();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-blue-50 text-slate-900">
      <section className="relative h-[60vh] flex items-center justify-center bg-blue-100">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover" 
            alt="Campus"
          />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-blue-700 mb-6"
          >
            Campus <span className="text-orange-500">Life</span>
          </motion.h1>

          <p className="text-xl max-w-2xl mx-auto text-slate-700">
            Where academic excellence meets vibrant culture and lifelong memories.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-black text-blue-700">{stat.value}</div>
              <div className="text-sm font-bold uppercase text-slate-700">
                {stat.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-blue-50">
        <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campusLife.map((item, index) => (
            <motion.div
              key={index}
              {...fadeInUp}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-md"
            >
              <img src={item.img} className="h-64 w-full object-cover" alt={item.title} />
              <div className="p-8">
                <h3 className="text-2xl font-black text-blue-700 mb-4">
                  {item.title}
                </h3>
                <p className="text-slate-700">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-center text-blue-700 mb-16">
            Voices of <span className="text-orange-500">SRIT</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                className="bg-blue-50 p-8 rounded-[2.5rem]"
              >
                <h4 className="font-bold text-blue-700">{t.name}</h4>
                <p className="text-sm text-slate-600 mb-4">{t.role}</p>
                <p className="text-slate-700 italic">"{t.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-100 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-blue-700 mb-8">
          Ready to start your journey at SRIT?
        </h2>
        <button
          onClick={() => navigate("/admissions")}
          className="px-10 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-indigo-600 transition"
        >
          Apply for Admission 2026
        </button>
      </section>

      <Footer />
    </div>
  );
}

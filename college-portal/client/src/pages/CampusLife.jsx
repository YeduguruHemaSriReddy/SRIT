
import { motion } from "framer-motion";
import { 
  Users, 
  Trophy, 
  BookOpen, 
  Microscope, 
  Camera, 
  Coffee, 
  Activity,
  Heart,
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
    color: "bg-orange-500",
    tag: "Research"
  },
  {
    title: "The Knowledge Hub",
    desc: "A massive central library with thousands of journals and digital access to global research papers.",
    img: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop",
    icon: BookOpen,
    color: "bg-orange-600",
    tag: "Academic"
  },
  {
    title: "Arena of Champions",
    desc: "From professional cricket grounds to indoor badminton courts, we prioritize physical excellence.",
    img: "https://images.unsplash.com/photo-1526676023131-d35216858f0a?q=80&w=2070&auto=format&fit=crop",
    icon: Trophy,
    color: "bg-orange-700",
    tag: "Sports"
  },
  {
    title: "Creative Pulse",
    desc: "Annual fests, music nights, and drama workshops that keep the campus spirit alive and thriving.",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
    icon: Music,
    color: "bg-orange-400",
    tag: "Cultural"
  },
  {
    title: "Tech Society",
    desc: "Student-run coding clubs and robotics teams that compete and win at national level hackathons.",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
    icon: Zap,
    color: "bg-orange-500",
    tag: "Technology"
  },
  {
    title: "Social Lounge",
    desc: "A vibrant cafeteria serving hygienic, diverse cuisines – the favorite hangout for brainstorming.",
    img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop",
    icon: Coffee,
    color: "bg-orange-600",
    tag: "Lifestyle"
  },
];

const testimonials = [
  {
    name: "Arjun Varma",
    role: "B.Tech CSE, 4th Year",
    text: "The tech clubs at SRIT changed my perspective on engineering. I'm not just learning to code; I'm learning to build products that matter.",
    img: "https://i.pravatar.cc/150?u=arjun",
  },
  {
    name: "Priya Reddy",
    role: "B.Tech EEE, Alumna",
    text: "Campus life here is a perfect balance. One day you're in a high-tech lab, and the next you're performing on stage at the annual fest.",
    img: "https://i.pravatar.cc/150?u=priya",
  },
  {
    name: "Karthik S.",
    role: "B.Tech Mech, 3rd Year",
    text: "The sports facilities are top-notch. Representing SRIT in the inter-college cricket tournament was a highlight of my college life.",
    img: "https://i.pravatar.cc/150?u=karthik",
  },
];

const stats = [
  { title: "Student Clubs", value: "18+", icon: Users },
  { title: "Tech Events", value: "25+", icon: Zap },
  { title: "Sports Cups", value: "15+", icon: Trophy },
  { title: "Annual Fests", value: "03", icon: Gamepad2 },
];

export default function CampusLife() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover" 
            alt="Campus Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-slate-900" />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 bg-orange-600 text-white rounded-full text-sm font-bold tracking-widest uppercase mb-6"
          >
            The Full Experience
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-6"
          >
            Campus <span className="text-orange-600">Life</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Where academic excellence meets vibrant culture. Discover a community 
            that inspires growth, creativity, and lifelong connections.
          </motion.p>
        </div>
      </section>

      {/* ================= STATS STRIP ================= */}
      <section className="py-12 bg-orange-600">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center text-white"
              >
                <div className="text-4xl font-black mb-1">{stat.value}</div>
                <div className="text-sm font-bold uppercase tracking-widest text-orange-200">{stat.title}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURES GRID ================= */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campusLife.map((item, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60" />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white uppercase tracking-wider">
                    {item.tag}
                  </div>
                </div>
                
                <div className="p-8 relative">
                  <div className={`absolute -top-10 left-8 w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-white shadow-xl transform -rotate-6 group-hover:rotate-0 transition-transform`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 pt-4">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Voices of <span className="text-orange-600">SRIT</span></h2>
            <p className="text-xl text-slate-600">Don't just take our word for it – hear from our students.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div 
                key={i}
                {...fadeInUp}
                className="bg-slate-50 p-8 rounded-[2.5rem] relative group hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-orange-100"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img src={t.img} alt={t.name} className="w-14 h-14 rounded-2xl object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-900">{t.name}</h4>
                    <p className="text-sm text-orange-600 font-bold">{t.role}</p>
                  </div>
                </div>
                <p className="text-slate-600 italic leading-relaxed">"{t.text}"</p>
                <div className="absolute top-8 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Heart className="w-12 h-12 text-orange-600" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div 
            {...fadeInUp}
            className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600 rounded-full blur-[100px] opacity-20 translate-x-1/2 -translate-y-1/2" />
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 relative z-10">
              Ready to start your <br />
              <span className="text-orange-600">Journey at SRIT?</span>
            </h2>
            <button className="px-10 py-5 bg-orange-600 text-white font-bold rounded-full hover:bg-orange-700 transition-all hover:scale-105 shadow-xl shadow-orange-600/20 relative z-10">
              Apply for Admission 2026
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

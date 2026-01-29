import Footer from "../components/Footer";
import { Cpu, Zap, Settings, PenTool, Radio, Code2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Departments() {
  const departments = [
    {
      id: "cse",
      name: "Computer Science",
      abbr: "CSE",
      desc: "Exploring the frontiers of computing, AI, and software engineering.",
      icon: Code2,
      color: "blue"
    },
    {
      id: "ece",
      name: "Electronics & Comm.",
      abbr: "ECE",
      desc: "Bridging the gap between hardware and communication systems.",
      icon: Radio,
      color: "indigo"
    },
    {
      id: "eee",
      name: "Electrical & Electronics",
      abbr: "EEE",
      desc: "Powering the future with sustainable energy solutions.",
      icon: Zap,
      color: "yellow"
    },
    {
      id: "me",
      name: "Mechanical Engineering",
      abbr: "ME",
      desc: "Designing and manufacturing the machines of tomorrow.",
      icon: Settings,
      color: "orange"
    },
    {
      id: "ce",
      name: "Civil Engineering",
      abbr: "CE",
      desc: "Building the infrastructure for a sustainable world.",
      icon: PenTool,
      color: "green"
    },
    {
      id: "ai",
      name: "Artificial Intelligence",
      abbr: "CSM",
      desc: "Creating intelligent systems for complex problem solving.",
      icon: Cpu,
      color: "purple"
    }
  ];

  const getColorClass = (color) => {
    const map = {
      blue: "text-blue-600 bg-blue-100 group-hover:bg-indigo-600 group-hover:text-white",
      indigo: "text-indigo-600 bg-indigo-100 group-hover:bg-indigo-600 group-hover:text-white",
      yellow: "text-yellow-600 bg-yellow-100 group-hover:bg-indigo-600 group-hover:text-white",
      orange: "text-orange-600 bg-orange-100 group-hover:bg-indigo-600 group-hover:text-white",
      green: "text-green-600 bg-green-100 group-hover:bg-indigo-600 group-hover:text-white",
      purple: "text-purple-600 bg-purple-100 group-hover:bg-indigo-600 group-hover:text-white",
    };
    return map[color] || map.blue;
  };

  return (
    <div className="min-h-screen bg-blue-50 font-sans">

      {/* Hero */}
      <section className="bg-blue-50 py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            Academic <span className="text-orange-500">Departments</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Our departments are centers of excellence, fostering innovation and providing rigorous academic training.
          </p>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept, i) => {
            const Icon = dept.icon;
            return (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-8 shadow-lg border border-slate-100 group cursor-pointer bg-white ${getColorClass(dept.color)} hover:shadow-2xl transition-all`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 rounded-xl ${getColorClass(dept.color)} transition-colors`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <span className="text-4xl font-black text-slate-100 group-hover:text-white transition-colors">
                    {dept.abbr}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-white transition-colors">
                  {dept.name}
                </h3>
                <p className="text-slate-600 mb-6 group-hover:text-white/90 transition-colors">
                  {dept.desc}
                </p>
                
                <div className="flex items-center text-blue-600 font-semibold group-hover:text-white transition-colors">
                  Explore Department <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Why Choose SRIT */}
      <section className="py-20 bg-blue-50 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">Why Choose SRIT?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Expert Faculty", desc: "Learn from Ph.D. holders and industry veterans." },
              { title: "Modern Labs", desc: "Hands-on experience with cutting-edge equipment." },
              { title: "Industry Ties", desc: "Strong partnerships for internships and placements." },
            ].map((feature, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-indigo-600 hover:text-white transition-colors">
                <h3 className="text-xl font-bold mb-3 text-orange-400 group-hover:text-white">{feature.title}</h3>
                <p className="text-blue-100 group-hover:text-white">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

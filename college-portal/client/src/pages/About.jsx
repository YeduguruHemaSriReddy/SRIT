
import { motion } from "framer-motion";
import { 
  Users,
  Trophy,
  BookOpen,
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from "lucide-react";
import Footer from "../components/Footer";

export default function About() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-50">
        {/* Abstract Background Graphics */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-orange-200 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-orange-300 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-bold tracking-wider uppercase flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Excellence Since 2007
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-5xl md:text-8xl font-black mb-6 tracking-tight leading-[1.1]"
            >
              Building the <br />
              <span className="text-orange-600 italic">Future of Engineering</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-lg md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10"
            >
              Srinivasa Ramanujan Institute of Technology: A hub of innovation, 
              academic rigor, and professional excellence in the heart of Anantapur.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <button className="px-8 py-4 bg-orange-600 text-white rounded-full font-bold shadow-lg shadow-orange-200 hover:bg-orange-700 transition-all hover:scale-105 flex items-center gap-2">
                Explore Programs <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-white text-orange-600 border-2 border-orange-100 rounded-full font-bold hover:bg-orange-50 transition-all">
                Contact Admissions
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FLOATING STATS ================= */}
      <section className="relative z-20 -mt-16 container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-orange-100 border border-orange-50"
        >
          <StatItem value="2007" label="Established" icon={<Calendar className="text-orange-500" />} />
          <StatItem value="3000+" label="Active Students" icon={<Users className="text-orange-500" />} />
          <StatItem value="20+" label="Global Programs" icon={<BookOpen className="text-orange-500" />} />
          <StatItem value="90%+" label="Placement Rate" icon={<Trophy className="text-orange-500" />} />
        </motion.div>
      </section>

      {/* ================= ABOUT CONTENT ================= */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-orange-100 rounded-[3rem] overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986&auto=format&fit=crop" 
                  alt="College Campus" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-orange-600/10 mix-blend-multiply" />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-white p-4 rounded-3xl shadow-xl hidden md:block border border-orange-50">
                <div className="w-full h-full bg-orange-600 rounded-2xl flex flex-col items-center justify-center text-white text-center p-4">
                  <span className="text-3xl font-black">NAAC</span>
                  <span className="text-xs font-bold uppercase tracking-widest">Accredited</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                  A Legacy of <span className="text-orange-600">Technical Brilliance</span>
                </h2>
                <div className="w-20 h-2 bg-orange-600 rounded-full" />
              </div>
              
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  Founded in <span className="font-bold text-slate-900">November 2007</span> by the visionary 
                  <span className="font-bold text-slate-900"> Sri Aluru Sambasiva Reddy</span>, SRIT has grown 
                  from a promising startup to a premier technical destination in Andhra Pradesh.
                </p>
                <p>
                  Affiliated with <span className="text-orange-600 font-semibold">JNTU Anantapur</span> and 
                  approved by <span className="text-orange-600 font-semibold">AICTE</span>, we provide an 
                  environment where academic rigor meets industry practicality.
                </p>
                <p className="bg-orange-50 p-6 rounded-2xl border-l-4 border-orange-600 italic">
                  "Our goal is not just to produce engineers, but to nurture innovative minds ready to 
                  tackle the world's most complex challenges with ethics and integrity."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= VISION & MISSION ================= */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 hover:shadow-2xl transition-all group"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-colors">
                <Sparkles className="w-8 h-8 text-orange-600 group-hover:text-white" />
              </div>
              <h3 className="text-3xl font-black mb-4 text-slate-900">Our Vision</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                To emerge as a center of excellence in engineering education fostering innovation, 
                research, leadership, and ethical values for the betterment of society and the 
                global engineering landscape.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-orange-600 p-10 rounded-[2.5rem] shadow-xl text-white hover:shadow-2xl transition-all"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-black mb-4">Our Mission</h3>
              <ul className="space-y-4 text-orange-50">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>Deliver high-quality technical education</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>Encourage multi-disciplinary research</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>Strengthen industry-academia collaboration</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>Develop socially responsible professionals</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Decorative Graphic */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[500px] h-[500px] bg-orange-50 rounded-full blur-[100px] -z-10" />
        
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-4xl md:text-6xl font-black text-slate-900">
              The SRIT <span className="text-orange-600">Advantage</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We provide the tools, the network, and the mentorship to transform 
              your potential into global professional success.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <FeatureCard 
              title="Academic Excellence" 
              desc="Comprehensive curriculum with a focus on core engineering principles." 
              icon={<BookOpen />}
            />
            <FeatureCard 
              title="Industry Ties" 
              desc="Partnerships with top tech firms for internships and real-world projects." 
              icon={<Users />}
            />
            <FeatureCard 
              title="Career Launchpad" 
              desc="90%+ placement rate with alumni at Google, Microsoft, and Amazon." 
              icon={<Trophy />}
            />
            <FeatureCard 
              title="Digital Campus" 
              desc="Smart classrooms, hi-tech labs, and 24/7 digital library access." 
              icon={<Sparkles />}
            />
            <FeatureCard 
              title="Expert Faculty" 
              desc="Learn from researchers and PhD holders with deep industry experience." 
              icon={<Calendar />}
            />
            <FeatureCard 
              title="Holistic Growth" 
              desc="Focus on soft skills, leadership, and ethical professional values." 
              icon={<CheckCircle2 />}
            />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */

function StatItem({ value, label, icon }) {
  return (
    <div className="flex flex-col items-center text-center p-4">
      <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-4">
        {icon}
      </div>
      <span className="text-2xl md:text-4xl font-black text-slate-900 mb-1">{value}</span>
      <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest">{label}</span>
    </div>
  );
}

function FeatureCard({ title, desc, icon }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-orange-100 transition-all group"
    >
      <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-6 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
        {icon}
      </div>
      <h3 className="text-xl font-black mb-3 text-slate-900 group-hover:text-orange-600 transition-colors">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

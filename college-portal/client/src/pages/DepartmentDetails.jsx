import { BookOpen, Users, GraduationCap, Code2, Radio, Zap, Wrench, Building2, Briefcase, PenTool, Award, TrendingUp, ArrowRight } from "lucide-react";
import { useState } from "react";
import DepartmentDetails from "../pages/DepartmentDetails";
import { useParams } from "react-router-dom";
/* ================= DEPARTMENTS DATA ================= */
const departments = [
  {
    tag: "CSE",
    title: "Computer Science & Engineering",
    desc: "Focused on software development, AI, data science, and modern computing technologies.",
    students: 620,
    faculty: 45,
    courses: 32,
    awards: 3,
    established: 1998,
    hod: "Dr. Rajesh Kumar",
    about:
      "The Department of Computer Science & Engineering is one of the leading departments with a strong focus on innovation, research, and industry readiness.",
    vision:
      "To be a globally recognized center of excellence in computer science education.",
    mission:
      "To provide quality education, promote research, and nurture ethical professionals.",
    achievements: [
      {
        title: "Smart India Hackathon",
        desc: "National level winners",
        year: "2024",
      },
      {
        title: "Research Publications",
        desc: "50+ IEEE papers published",
        year: "2023",
      },
    ],
    icon: Code2,
    bgGradient: "from-blue-500 to-cyan-500",
    bgLight: "bg-blue-50",
    color: "text-blue-600",
  },

  {
    tag: "ECE",
    title: "Electronics & Communication Engineering",
    desc: "Covers communication systems, VLSI, embedded systems, and signal processing.",
    students: 540,
    faculty: 38,
    courses: 30,
    awards: 2,
    established: 1999,
    hod: "Dr. Anil Verma",
    about:
      "The ECE department emphasizes modern communication technologies and hands-on learning.",
    vision:
      "To excel in electronics and communication engineering education and research.",
    mission:
      "To produce skilled engineers for industry and research organizations.",
    achievements: [
      {
        title: "Industry Collaboration",
        desc: "MoU with leading telecom firms",
        year: "2022",
      },
    ],
    icon: Radio,
    bgGradient: "from-purple-500 to-pink-500",
    bgLight: "bg-purple-50",
    color: "text-purple-600",
  },

  {
    tag: "EEE",
    title: "Electrical & Electronics Engineering",
    desc: "Focuses on power systems, machines, and control engineering.",
    students: 480,
    faculty: 34,
    courses: 26,
    awards: 2,
    established: 1997,
    hod: "Dr. Suresh Rao",
    about:
      "EEE department trains students in power generation, automation, and energy systems.",
    vision: "To lead in electrical engineering education.",
    mission: "To develop competent electrical engineers.",
    achievements: [
      {
        title: "Green Energy Project",
        desc: "Solar microgrid implementation",
        year: "2023",
      },
    ],
    icon: Zap,
    bgGradient: "from-yellow-500 to-orange-500",
    bgLight: "bg-yellow-50",
    color: "text-yellow-600",
  },

  {
    tag: "ME",
    title: "Mechanical Engineering",
    desc: "Design, manufacturing, and thermal engineering studies.",
    students: 500,
    faculty: 40,
    courses: 28,
    awards: 2,
    established: 1995,
    hod: "Dr. Vinod Sharma",
    about:
      "Mechanical Engineering focuses on core engineering principles and industrial exposure.",
    vision: "To create innovative mechanical engineers.",
    mission: "To blend theory with practical applications.",
    achievements: [
      {
        title: "Formula Student",
        desc: "National level participation",
        year: "2024",
      },
    ],
    icon: Wrench,
    bgGradient: "from-red-500 to-orange-500",
    bgLight: "bg-red-50",
    color: "text-red-600",
  },

  {
    tag: "CE",
    title: "Civil Engineering",
    desc: "Construction, infrastructure, and structural design.",
    students: 520,
    faculty: 36,
    courses: 28,
    awards: 2,
    established: 1994,
    hod: "Dr. Kiran Patel",
    about:
      "Civil Engineering department focuses on sustainable infrastructure development.",
    vision: "To lead in civil and structural engineering.",
    mission: "To train professionals for nation-building.",
    achievements: [
      {
        title: "Smart City Project",
        desc: "Urban planning collaboration",
        year: "2023",
      },
    ],
    icon: Building2,
    bgGradient: "from-amber-500 to-orange-500",
    bgLight: "bg-amber-50",
    color: "text-amber-600",
  },

  {
    tag: "IT",
    title: "Information Technology",
    desc: "Web, cloud computing, databases, and cybersecurity.",
    students: 560,
    faculty: 42,
    courses: 30,
    awards: 2,
    established: 2000,
    hod: "Dr. Neha Singh",
    about:
      "IT department focuses on modern software systems and enterprise technologies.",
    vision: "To innovate in information technology education.",
    mission: "To produce industry-ready IT professionals.",
    achievements: [
      {
        title: "Cloud Certification",
        desc: "AWS academy partnership",
        year: "2024",
      },
    ],
    icon: Code2,
    bgGradient: "from-emerald-500 to-teal-500",
    bgLight: "bg-emerald-50",
    color: "text-emerald-600",
  },

  {
    tag: "MBA",
    title: "Business Administration",
    desc: "Management education with industry exposure.",
    students: 320,
    faculty: 25,
    courses: 22,
    awards: 2,
    established: 2002,
    hod: "Dr. Pooja Mehta",
    about:
      "MBA program focuses on leadership, strategy, and entrepreneurship.",
    vision: "To develop future business leaders.",
    mission: "To deliver value-driven management education.",
    achievements: [
      {
        title: "Startup Incubation",
        desc: "10+ startups incubated",
        year: "2023",
      },
    ],
    icon: Briefcase,
    bgGradient: "from-indigo-500 to-purple-500",
    bgLight: "bg-indigo-50",
    color: "text-indigo-600",
  },

  {
    tag: "ARCH",
    title: "Architecture",
    desc: "Designing sustainable and aesthetic spaces.",
    students: 280,
    faculty: 20,
    courses: 18,
    awards: 2,
    established: 2001,
    hod: "Ar. Ramesh Iyer",
    about:
      "Architecture department nurtures creativity with technical excellence.",
    vision: "To lead in sustainable architectural design.",
    mission: "To create responsible architects.",
    achievements: [
      {
        title: "National Design Award",
        desc: "Best campus design",
        year: "2024",
      },
    ],
    icon: PenTool,
    bgGradient: "from-pink-500 to-rose-500",
    bgLight: "bg-pink-50",
    color: "text-pink-600",
  },
];

export default function Departments() {
  const [selectedDept, setSelectedDept] = useState(null);
  const [hoveredDept, setHoveredDept] = useState(null);

  return (
    <div className="w-full bg-gradient-to-b from-slate-50 to-white">
      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-br from-[#0B1C3D] via-[#132F5E] to-[#0B1C3D] text-white px-6 md:px-20 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-yellow-400/20 rounded-full border border-yellow-400/30">
            <BookOpen size={18} className="text-yellow-400" />
            <span className="text-sm text-yellow-200">Explore Academic Excellence</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-300">Academic Departments</span>
          </h1>

          <p className="mt-6 max-w-2xl text-white/80 text-lg">
            Discover our diverse range of academic departments delivering world-class education across engineering, management, and design disciplines.
          </p>

          <div className="flex flex-wrap gap-8 md:gap-12 mt-14">
            <Stat icon={<BookOpen size={24} />} value="8" label="Departments" />
            <Stat icon={<Users size={24} />} value="4.4K+" label="Students" />
            <Stat icon={<GraduationCap size={24} />} value="242+" label="Faculty" />
            <Stat icon={<Award size={24} />} value="16+" label="Awards" />
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="px-6 md:px-20 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Departments at a Glance
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each department is equipped with state-of-the-art facilities, experienced faculty, and industry partnerships to ensure comprehensive learning.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => {
              const Icon = dept.icon;
              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredDept(index)}
                  onMouseLeave={() => setHoveredDept(null)}
                  onClick={() => setSelectedDept(dept)}
                  className="group cursor-pointer relative h-full"
                >
                  {/* Card background with gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${dept.bgGradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                  
                  <div className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 h-full border border-gray-100 hover:border-gray-200 ${hoveredDept === index ? 'scale-105' : ''}`}>
                    {/* Icon background */}
                    <div className={`w-16 h-16 ${dept.bgLight} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`${dept.color} w-8 h-8`} />
                    </div>

                    {/* Department tag */}
                    <div className="inline-flex items-center gap-2 mb-4">
                      <span className={`inline-block px-3 py-1 text-xs font-bold bg-gradient-to-r ${dept.bgGradient} text-white rounded-full`}>
                        {dept.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                      {dept.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                      {dept.desc}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-t border-gray-200">
                      <div className="text-center">
                        <p className="text-lg font-bold text-gray-900">{dept.students}</p>
                        <p className="text-xs text-gray-500">Students</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-gray-900">{dept.faculty}</p>
                        <p className="text-xs text-gray-500">Faculty</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-gray-900">{dept.courses}</p>
                        <p className="text-xs text-gray-500">Courses</p>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button className={`w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r ${dept.bgGradient} text-white font-semibold rounded-lg hover:shadow-lg transform group-hover:-translate-y-1 transition-all duration-300`}>
                      <span>Explore Department</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* Hover indicator */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${dept.bgGradient} rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= HIGHLIGHTS ================= */}
      <section className="px-6 md:px-20 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Departments?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <HighlightCard icon={<TrendingUp size={28} />} title="Industry Ready" desc="Curriculum aligned with industry standards" color="from-blue-500 to-cyan-500" />
            <HighlightCard icon={<Award size={28} />} title="Award Winning" desc="Multiple national and international awards" color="from-purple-500 to-pink-500" />
            <HighlightCard icon={<Users size={28} />} title="Expert Faculty" desc="Experienced and dedicated faculty members" color="from-amber-500 to-orange-500" />
            <HighlightCard icon={<Briefcase size={28} />} title="Career Support" desc="Strong industry partnerships and placements" color="from-emerald-500 to-teal-500" />
          </div>
        </div>
      </section>

      {/* ================= MODAL ================= */}
      {selectedDept && (
        <DepartmentDetails
          department={selectedDept}
          onClose={() => setSelectedDept(null)}
        />
      )}
    </div>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-yellow-400/20 text-yellow-400 shadow-lg">
        {icon}
      </div>
      <div>
        <p className="text-3xl font-bold text-white">{value}</p>
        <p className="text-sm text-white/70">{label}</p>
      </div>
    </div>
  );
}

function HighlightCard({ icon, title, desc, color }) {
  return (
    <div className="group relative">
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 blur-lg`}></div>
      <div className="relative bg-white rounded-2xl shadow-md hover:shadow-xl p-8 text-center transition-all duration-300 border border-gray-100 hover:border-gray-200">
        <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${color} text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <h3 className="font-bold text-gray-900 mb-2 text-lg">{title}</h3>
        <p className="text-gray-600 text-sm">{desc}</p>
      </div>
    </div>
  );
}
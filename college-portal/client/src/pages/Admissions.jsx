import Footer from "../components/Footer";
import { motion } from "framer-motion";
import {
  CheckCircle,
  FileText,
  Users,
  Phone,
  GraduationCap,
} from "lucide-react";
import { Button } from "../components/ui/button";

export default function Admissions() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ================= HERO ================= */}
      <section className="pt-36 pb-28 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold mb-6"
          >
            Admissions @ SRIT
          </motion.h1>

          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Join Srinivasa Ramanujan Institute of Technology through
            <b> AP EAMCET Counseling</b> and shape your future in engineering.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
              Apply via EAMCET
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Download Brochure
            </Button>
          </div>
        </div>
      </section>

      {/* ================= HIGHLIGHTS ================= */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-6">
          {[
            { title: "EAMCET Based", desc: "Government Counseling" },
            { title: "NAAC Accredited", desc: "Quality Assured" },
            { title: "90%+ Placements", desc: "Career Focused" },
            { title: "Modern Campus", desc: "Industry Ready" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-xl text-center shadow-lg"
            >
              <h3 className="text-2xl font-bold text-cyan-400 mb-2">
                {item.title}
              </h3>
              <p className="text-sm opacity-80">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ADMISSION FLOW (TIMELINE) ================= */}
      <section className="py-24 bg-white text-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Admission Process
          </h2>

          <div className="space-y-10">
            {[
              {
                icon: FileText,
                title: "AP EAMCET Application",
                desc: "Register and apply through official APSCHE portal.",
              },
              {
                icon: Users,
                title: "Counseling & Seat Allotment",
                desc: "Attend counseling and select SRIT branch.",
              },
              {
                icon: CheckCircle,
                title: "Document Verification",
                desc: "Verify certificates at allotted help center.",
              },
              {
                icon: GraduationCap,
                title: "Confirm Admission",
                desc: "Report to campus and start your journey.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="flex gap-6 items-start bg-slate-50 p-6 rounded-xl shadow-md"
              >
                <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
                  {index + 1}
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">{step.title}</h4>
                  <p className="text-slate-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ELIGIBILITY ================= */}
      <section className="py-20 bg-gradient-to-br from-cyan-600 to-blue-700">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8">Eligibility Criteria</h2>

          <ul className="space-y-4 text-lg">
            <li>✔ Passed 10+2 with MPC (Maths, Physics, Chemistry)</li>
            <li>✔ Qualified in AP EAMCET</li>
            <li>✔ Diploma holders eligible via ECET</li>
            <li>✔ As per APSCHE norms</li>
          </ul>
        </div>
      </section>

      {/* ================= CONTACT CTA ================= */}
      <section className="py-24 bg-slate-900 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Need Admission Assistance?
        </h2>
        <p className="text-lg opacity-80 mb-10">
          Our admission cell will guide you throughout the process.
        </p>

        <div className="flex justify-center gap-6 flex-wrap">
          <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600">
            Contact Admission Office
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white"
          >
            <Phone className="w-5 h-5 mr-2" /> Call Now
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0B1F3A] to-[#164E63] text-[#F8FAFC]">

      {/* ================= HERO ================= */}
      <section className="pt-40 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#22D3EE55,transparent_65%)]"></div>

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6 
              bg-gradient-to-r from-[#FBBF24] via-[#67E8F9] to-[#22D3EE]
              bg-clip-text text-transparent"
          >
            Admissions @ SRIT
          </motion.h1>

          <p className="text-xl max-w-3xl mx-auto text-[#E0F2FE]">
            Join Srinivasa Ramanujan Institute of Technology through{" "}
            <span className="text-[#FBBF24] font-semibold">
              AP EAMCET Counseling
            </span>{" "}
            and shape your future in engineering.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <a
              href="https://eapcet-sche.aptonline.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="px-10 py-6 rounded-full font-bold text-black
                  bg-gradient-to-r from-[#FBBF24] to-[#22D3EE]
                  shadow-[0_0_40px_#22D3EEAA]
                  hover:shadow-[0_0_80px_#FBBF24AA]
                  hover:scale-105 transition"
              >
                Apply via EAMCET / EAPCET
              </Button>
            </a>

            <Button
              size="lg"
              variant="outline"
              className="px-10 py-6 rounded-full border-2 border-[#67E8F9]
                text-[#67E8F9] hover:bg-[#67E8F9] hover:text-black
                shadow-[0_0_30px_#67E8F955] transition"
            >
              Download Brochure
            </Button>
          </div>
        </div>
      </section>

      {/* ================= HIGHLIGHTS ================= */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          {[
            { title: "EAMCET Based", desc: "Government Counseling" },
            { title: "NAAC Accredited", desc: "Quality Assured" },
            { title: "90%+ Placements", desc: "Career Focused" },
            { title: "Modern Campus", desc: "Industry Ready" },
          ].map((item, i) => (
            <motion.div
              whileHover={{ y: -10 }}
              key={i}
              className="bg-white/10 backdrop-blur-xl border border-white/20
                rounded-3xl p-8 text-center
                shadow-[0_0_40px_#22D3EE55]
                hover:shadow-[0_0_80px_#FBBF24AA] transition"
            >
              <h3 className="text-2xl font-black text-[#FBBF24] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[#CBD5F5]">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="py-28 bg-gradient-to-br from-[#020617] to-[#0B1F3A]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-black text-center mb-16 
            bg-gradient-to-r from-[#FBBF24] to-[#22D3EE]
            bg-clip-text text-transparent">
            Admission Process
          </h2>

          <div className="space-y-10">
            {[
              {
                title: "AP EAMCET Application",
                desc: "Register and apply through official APSCHE portal.",
              },
              {
                title: "Counseling & Seat Allotment",
                desc: "Attend counseling and select SRIT branch.",
              },
              {
                title: "Document Verification",
                desc: "Verify certificates at allotted help center.",
              },
              {
                title: "Confirm Admission",
                desc: "Report to campus and start your journey.",
              },
            ].map((step, index) => (
              <motion.div
                whileHover={{ scale: 1.02 }}
                key={index}
                className="flex gap-6 items-start
                  bg-white/10 backdrop-blur-xl border border-white/20
                  p-8 rounded-3xl shadow-[0_0_40px_#22D3EE55]"
              >
                <div className="w-14 h-14 rounded-full
                  bg-gradient-to-br from-[#FBBF24] to-[#22D3EE]
                  text-black flex items-center justify-center font-black text-xl">
                  {index + 1}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#FBBF24] mb-1">
                    {step.title}
                  </h4>
                  <p className="text-[#CBD5F5]">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ELIGIBILITY ================= */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-10 text-[#FBBF24]">
            Eligibility Criteria
          </h2>

          <ul className="space-y-4 text-lg text-[#CBD5F5]">
            <li className="flex items-center gap-3">
              <CheckCircle className="text-[#22D3EE]" /> Passed 10+2 with MPC
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-[#22D3EE]" /> Qualified in AP EAMCET
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-[#22D3EE]" /> Diploma holders via ECET
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-[#22D3EE]" /> As per APSCHE norms
            </li>
          </ul>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-28 text-center bg-gradient-to-br from-[#020617] to-[#0B1F3A]">
        <h2 className="text-4xl font-black mb-6 text-[#FBBF24]">
          Need Admission Assistance?
        </h2>
        <p className="text-lg mb-12 text-[#CBD5F5]">
          Our admission cell will guide you throughout the process.
        </p>

        <div className="flex justify-center gap-6 flex-wrap">
          <Button
            size="lg"
            className="px-10 py-6 rounded-full font-bold text-black
              bg-gradient-to-r from-[#FBBF24] to-[#22D3EE]
              hover:scale-105 transition"
            onClick={() => navigate("/contact")}
          >
            Contact Admission Office
          </Button>

          <a href="tel:+919999999999">
            <Button
              size="lg"
              variant="outline"
              className="px-10 py-6 rounded-full border-2 border-[#67E8F9]
                text-[#67E8F9] hover:bg-[#67E8F9] hover:text-black transition"
            >
              <Phone className="w-5 h-5 mr-2" /> Call Now
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

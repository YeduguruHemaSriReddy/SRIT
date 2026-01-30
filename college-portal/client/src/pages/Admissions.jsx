import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Phone,
} from "lucide-react";
import { Button } from "../components/ui/button";

export default function Admissions() {
  const navigate = useNavigate();

  return (
    /* 🔑 FIX FOR FIXED NAVBAR */
    <div className="min-h-screen bg-white text-black font-sans pt-[220px]">

      {/* ================= HERO ================= */}
      <section className="py-32 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-black mb-6 text-orange-500"
        >
          Admissions @ SRIT
        </motion.h1>

        <p className="text-xl max-w-3xl mx-auto text-gray-700">
          Join Srinivasa Ramanujan Institute of Technology through{" "}
          <span className="text-blue-600 font-semibold">
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
              className="px-10 py-6 rounded-full font-bold
              bg-orange-500 text-white hover:bg-orange-600 transition"
            >
              Apply via EAMCET / EAPCET
            </Button>
          </a>

          <Button
            size="lg"
            variant="outline"
            className="px-10 py-6 rounded-full border-2 border-orange-500
            text-orange-500 hover:bg-orange-500 hover:text-white transition"
          >
            Download Brochure
          </Button>
        </div>
      </section>

      {/* ================= HIGHLIGHTS ================= */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-24 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          {[
            { title: "EAMCET Based", desc: "Government Counseling" },
            { title: "NAAC Accredited", desc: "Quality Assured" },
            { title: "90%+ Placements", desc: "Career Focused" },
            { title: "Modern Campus", desc: "Industry Ready" },
          ].map((item, i) => (
            <motion.div
              whileHover={{ y: -6 }}
              key={i}
              className="bg-white border border-gray-200
              rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-2xl font-black text-orange-500 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ================= PROCESS ================= */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-28 px-6"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-16 text-orange-500">
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
                bg-white border border-gray-200
                p-8 rounded-2xl shadow-md"
              >
                <div className="w-14 h-14 rounded-full
                bg-orange-500 text-white flex items-center justify-center
                font-black text-xl">
                  {index + 1}
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">
                    {step.title}
                  </h4>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ================= ELIGIBILITY ================= */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-24 bg-gray-50 px-6"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black mb-10 text-orange-500">
            Eligibility Criteria
          </h2>

          <ul className="space-y-4 text-lg text-gray-700">
            {[
              "Passed 10+2 with MPC",
              "Qualified in AP EAMCET",
              "Diploma holders via ECET",
              "As per APSCHE norms",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <CheckCircle className="text-orange-500" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* ================= CTA ================= */}
      <section className="py-28 text-center px-6">
        <h2 className="text-4xl font-black mb-6 text-orange-500">
          Need Admission Assistance?
        </h2>

        <p className="text-lg mb-12 text-gray-700">
          Our admission cell will guide you throughout the process.
        </p>

        <div className="flex justify-center gap-6 flex-wrap">
          <Button
            size="lg"
            className="px-10 py-6 rounded-full font-bold
            bg-orange-500 text-white hover:bg-orange-600 transition"
            onClick={() => navigate("/contact")}
          >
            Contact Admission Office
          </Button>

          <a href="tel:+919999999999">
            <Button
              size="lg"
              variant="outline"
              className="px-10 py-6 rounded-full border-2 border-orange-500
              text-orange-500 hover:bg-orange-500 hover:text-white transition"
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

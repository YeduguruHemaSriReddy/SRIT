import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Admissions() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-50 text-slate-900">
      {/* HERO */}
      <section className="pt-36 pb-28 bg-gradient-to-br from-blue-100 via-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 text-blue-700"
          >
            Admissions @ <span className="text-orange-500">SRIT</span>
          </motion.h1>

          <p className="text-xl max-w-3xl mx-auto text-slate-700">
            Join Srinivasa Ramanujan Institute of Technology through{" "}
            <b>AP EAMCET Counseling</b> and shape your future in engineering.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {/* APPLY BUTTON */}
            <a
              href="https://eapcet-sche.aptonline.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-blue-600 text-white hover:bg-indigo-600">
                Apply via EAMCET / EAPCET
              </Button>
            </a>

            {/* DOWNLOAD BROCHURE */}
            <a
              href="/brochure/SRIT_Admissions_2026_Brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600"
              >
                Download Brochure
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="py-20 bg-blue-100">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-6">
          {[
            { title: "EAMCET Based", desc: "Government Counseling" },
            { title: "NAAC Accredited", desc: "Quality Assured" },
            { title: "90%+ Placements", desc: "Career Focused" },
            { title: "Modern Campus", desc: "Industry Ready" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-[2rem] text-center shadow-md"
            >
              <h3 className="text-2xl font-bold text-blue-700 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ADMISSION PROCESS */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-blue-700">
            Admission Process
          </h2>

          <div className="space-y-10">
            {[
              {
                title: "AP EAMCET Application",
                desc: "Register and apply through the official APSCHE portal.",
              },
              {
                title: "Counseling & Seat Allotment",
                desc: "Attend counseling and select SRIT as your preferred college.",
              },
              {
                title: "Document Verification",
                desc: "Verify certificates at the allotted help center.",
              },
              {
                title: "Confirm Admission",
                desc: "Report to SRIT campus and begin your academic journey.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="flex gap-6 items-start bg-blue-50 p-6 rounded-[2rem] shadow-sm"
              >
                <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
                  {index + 1}
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1 text-orange-500">
                    {step.title}
                  </h4>
                  <p className="text-slate-700">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ELIGIBILITY */}
      <section className="py-20 bg-blue-100">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8 text-blue-700">
            Eligibility Criteria
          </h2>

          <ul className="space-y-4 text-lg text-slate-800">
            <li>✔ Passed 10+2 with MPC (Maths, Physics, Chemistry)</li>
            <li>✔ Qualified in AP EAMCET / EAPCET</li>
            <li>✔ Diploma holders eligible via ECET</li>
            <li>✔ As per APSCHE norms</li>
          </ul>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="py-24 bg-blue-200 text-center">
        <h2 className="text-4xl font-bold mb-6 text-blue-700">
          Need Admission Assistance?
        </h2>
        <p className="text-lg mb-10 text-slate-700">
          Our admissions team is here to guide you at every step.
        </p>

        <div className="flex justify-center gap-6 flex-wrap">
          <Button
            size="lg"
            className="bg-blue-600 text-white hover:bg-indigo-600"
            onClick={() => navigate("/contact")}
          >
            Contact Admission Office
          </Button>

          <a href="tel:+919999999999">
            <Button
              size="lg"
              variant="outline"
              className="border-blue-600 text-blue-600 flex items-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

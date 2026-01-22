import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import { motion } from "framer-motion";
import { CheckCircle, FileText, Users, Calendar, Phone } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Admissions() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* ================= HERO ================= */}
      <section className="pt-32 pb-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Admissions
          </motion.h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join Srinivasa Ramanujan Institute of Technology and take the first
            step towards a successful engineering career.
          </p>
        </div>
      </section>

      {/* ================= ADMISSION OVERVIEW ================= */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Admission Overview"
            subtitle="How to Apply"
          />

          <p className="text-gray-600 max-w-4xl leading-relaxed">
            Admissions at SRIT are conducted as per the guidelines of the Andhra
            Pradesh State Council of Higher Education (APSCHE). Candidates are
            admitted through merit-based entrance examinations and institutional
            quota as applicable.
          </p>
        </div>
      </section>

      {/* ================= ADMISSION PROCESS ================= */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Admission Process"
            subtitle="Step-by-Step"
            centered
          />

          <div className="grid md:grid-cols-4 gap-8 mt-12">
            {[
              {
                icon: FileText,
                title: "Apply Online",
                desc: "Fill out the application form through official counseling portals.",
              },
              {
                icon: CheckCircle,
                title: "Eligibility Check",
                desc: "Candidates must meet academic and entrance exam requirements.",
              },
              {
                icon: Users,
                title: "Counseling",
                desc: "Attend counseling sessions and select preferred branch.",
              },
              {
                icon: Calendar,
                title: "Confirmation",
                desc: "Complete admission formalities and confirm seat.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md text-center"
              >
                <step.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h4 className="font-bold mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ELIGIBILITY ================= */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Eligibility Criteria"
            subtitle="Who Can Apply"
          />

          <ul className="list-disc list-inside text-gray-600 space-y-3 max-w-3xl">
            <li>
              Candidates must have passed 10+2 or equivalent examination with
              Mathematics, Physics, and Chemistry.
            </li>
            <li>
              Admission is primarily through state-level entrance examinations
              such as EAPCET.
            </li>
            <li>
              Lateral entry candidates must possess a Diploma in Engineering.
            </li>
            <li>
              Institutional quota admissions are subject to government norms.
            </li>
          </ul>
        </div>
      </section>

      {/* ================= IMPORTANT DATES ================= */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Important Dates"
            subtitle="Admission Timeline"
            centered
          />

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              { title: "Application Start", date: "April 2026" },
              { title: "Counseling Process", date: "June – July 2026" },
              { title: "Commencement of Classes", date: "August 2026" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md text-center"
              >
                <h4 className="font-bold mb-2">{item.title}</h4>
                <p className="text-primary font-semibold">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACT CTA ================= */}
      <section className="py-20 bg-primary text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Need Help with Admissions?
        </h2>
        <p className="text-lg mb-8 opacity-90">
          Our admission team is here to guide you at every step.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary">
            Contact Admission Cell
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white">
            <Phone className="w-5 h-5 mr-2" /> Call Us
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

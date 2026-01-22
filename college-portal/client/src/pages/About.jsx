import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import { motion } from "framer-motion";
import { Award, Target, Eye, BookOpen, Users } from "lucide-react";

export default function About() {
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
            About Our Institution
          </motion.h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Srinivasa Ramanujan Institute of Technology (SRIT) is committed to
            academic excellence, innovation, and holistic student development.
          </p>
        </div>
      </section>

      {/* ================= ABOUT CONTENT ================= */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT */}
            <div>
              <SectionHeader
                title="Who We Are"
                subtitle="About SRIT"
              />

              <p className="text-gray-600 leading-relaxed mb-6">
                Established in 2007, Srinivasa Ramanujan Institute of Technology
                has grown into a premier engineering institution offering
                quality education in science, technology, and management.
              </p>

              <p className="text-gray-600 leading-relaxed mb-6">
                Our institution emphasizes academic rigor, industry exposure,
                research culture, and ethical values to prepare students for
                real-world challenges.
              </p>

              <p className="text-gray-600 leading-relaxed">
                With experienced faculty, modern infrastructure, and strong
                placement support, SRIT strives to nurture future leaders and
                innovators.
              </p>
            </div>

            {/* RIGHT */}
            <div className="bg-gray-100 rounded-2xl p-10 shadow-md">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl text-center shadow">
                  <Users className="w-8 h-8 mx-auto text-primary mb-2" />
                  <h4 className="font-bold">3000+</h4>
                  <p className="text-sm text-gray-500">Students</p>
                </div>

                <div className="bg-white p-6 rounded-xl text-center shadow">
                  <BookOpen className="w-8 h-8 mx-auto text-primary mb-2" />
                  <h4 className="font-bold">20+</h4>
                  <p className="text-sm text-gray-500">Programs</p>
                </div>

                <div className="bg-white p-6 rounded-xl text-center shadow">
                  <Award className="w-8 h-8 mx-auto text-primary mb-2" />
                  <h4 className="font-bold">NAAC</h4>
                  <p className="text-sm text-gray-500">Accredited</p>
                </div>

                <div className="bg-white p-6 rounded-xl text-center shadow">
                  <Target className="w-8 h-8 mx-auto text-primary mb-2" />
                  <h4 className="font-bold">100%</h4>
                  <p className="text-sm text-gray-500">Commitment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VISION & MISSION ================= */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Our Purpose"
            subtitle="Vision & Mission"
            centered
          />

          <div className="grid md:grid-cols-2 gap-10 mt-12">
            {/* VISION */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md"
            >
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-bold">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To become a center of excellence in technical education by
                fostering innovation, research, and ethical values for societal
                development.
              </p>
            </motion.div>

            {/* MISSION */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md"
            >
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-bold">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To provide quality education, promote research and innovation,
                strengthen industry collaboration, and develop responsible
                professionals with strong ethical foundations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
}

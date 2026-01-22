import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "../components/ui/button";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔗 Backend integration can be added here later
    alert("Thank you for contacting us! We will get back to you soon.");

    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* ================= HERO ================= */}
      <section className="pt-32 pb-20 bg-gray-50 text-center">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Contact Us
          </motion.h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We’d love to hear from you. Reach out to us for admissions,
            academic queries, or any assistance.
          </p>
        </div>
      </section>

      {/* ================= CONTACT DETAILS ================= */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Get in Touch"
            subtitle="Contact Information"
            centered
          />

          <div className="grid md:grid-cols-4 gap-8 mt-12">
            <div className="bg-gray-50 p-6 rounded-xl shadow-md text-center">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="font-bold mb-1">Address</h4>
              <p className="text-sm text-gray-600">
                SRIT Campus, Anantapur, Andhra Pradesh
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-md text-center">
              <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="font-bold mb-1">Phone</h4>
              <p className="text-sm text-gray-600">
                +91 98765 43210
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-md text-center">
              <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="font-bold mb-1">Email</h4>
              <p className="text-sm text-gray-600">
                info@srit.ac.in
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-md text-center">
              <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="font-bold mb-1">Office Hours</h4>
              <p className="text-sm text-gray-600">
                Mon – Sat : 9:00 AM – 5:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT FORM ================= */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeader
            title="Send Us a Message"
            subtitle="We’re Here to Help"
            centered
          />

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-lg mt-12"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-3 w-full"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-3 w-full"
              />
            </div>

            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              className="border rounded-lg px-4 py-3 w-full mt-6 h-32"
            ></textarea>

            <div className="text-center mt-8">
              <Button size="lg" className="px-10">
                Send Message <Send className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* ================= MAP ================= */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Our Location"
            subtitle="Find Us on Map"
            centered
          />

          <div className="mt-12 rounded-xl overflow-hidden shadow-lg">
            <iframe
              title="SRIT Location"
              src="https://www.google.com/maps?q=Anantapur%20Andhra%20Pradesh&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

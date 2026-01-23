import { useState } from "react";
import Footer from "../components/Footer";
import { MapPin, Phone, Mail } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Our team will contact you shortly.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* ================= HEADER STRIP ================= */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-extrabold mb-3">Contact Us</h1>
          <p className="text-white/90 max-w-2xl">
            Srinivasa Ramanujan Institute of Technology, Anantapur –  
            We are here to help you with admissions, academics & support.
          </p>
        </div>
      </section>

      {/* ================= QUICK INFO ================= */}
      <section className="-mt-12">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          {[
            {
              icon: MapPin,
              title: "Campus Address",
              value:
                "Rotarypuram Village, B.K. Samudram Mandal, Anantapur – 515701",
            },
            {
              icon: Phone,
              title: "Phone",
              value: "+91 95156 11111",
            },
            {
              icon: Mail,
              title: "Email",
              value: "info@srit.ac.in",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-md border-t-4 border-orange-500"
            >
              <item.icon className="w-7 h-7 text-orange-600 mb-3" />
              <h4 className="font-bold mb-1">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= MAP + FORM ================= */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-start">
          {/* MAP */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-orange-600 text-white px-6 py-3 font-semibold">
              Campus Location
            </div>
            <iframe
              title="SRIT Location"
              src="https://www.google.com/maps?q=Srinivasa%20Ramanujan%20Institute%20of%20Technology%20Anantapur&output=embed"
              width="100%"
              height="420"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold mb-2">Get in Touch</h3>
            <p className="text-sm text-gray-600 mb-6">
              Fill the form below and our team will respond shortly.
            </p>

            <div className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
              />

              <Button
                size="lg"
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                Submit Message
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* ================= OFFICIAL CONTACT TABLE ================= */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gray-900 text-white px-6 py-3 font-semibold">
              Official Contact Details – SRIT Anantapur
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-orange-100 text-gray-800">
                  <tr>
                    <th className="p-3 border">Department</th>
                    <th className="p-3 border">Name</th>
                    <th className="p-3 border">Phone</th>
                    <th className="p-3 border">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "Admissions",
                      "Mr. A.V. Dhanunjaya Reddy",
                      "7893005519",
                      "doa@srit.ac.in",
                    ],
                    [
                      "Principal",
                      "Dr. G. Balakrishna",
                      "7893005520",
                      "principal@srit.ac.in",
                    ],
                    [
                      "Training & Placement",
                      "Dr. M. Ranjit Reddy",
                      "9515711111",
                      "tpo@srit.ac.in",
                    ],
                    [
                      "Examinations",
                      "Dr. T. Venkata Naga Jayudu",
                      "9885258147",
                      "dcoe@srit.ac.in",
                    ],
                    [
                      "Women Empowerment Cell",
                      "Dr. P. Vinatha",
                      "9959803183",
                      "wepcell@srit.ac.in",
                    ],
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      {row.map((cell, j) => (
                        <td key={j} className="p-3 border">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import EventCard from "../components/EventCard";
import { Button } from "../components/ui/button";

import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  DollarSign,
  Users,
  Download,
} from "lucide-react";

import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

/* ---------- IMAGES ---------- */
import heroImg from "../assets/campus/hero.jpg";
import labImg from "../assets/campus/lab.jpg";
import libraryImg from "../assets/campus/library.jpg";
import eventImg from "../assets/campus/event.jpg";
import hostelImg from "../assets/campus/hostel.jpg";
import groundImg from "../assets/campus/ground.jpg";

/* ---------- STATIC DATA ---------- */
const departments = [
  { code: "CSE", name: "Computer Science & Engineering" },
  { code: "ECE", name: "Electronics & Communication" },
  { code: "ME", name: "Mechanical Engineering" },
  { code: "CE", name: "Civil Engineering" },
];

export default function Home() {
  const plugin = useRef(Autoplay({ delay: 3500 }));
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/notices?role=all")
      .then((res) => res.json())
      .then((data) => setEvents(data || []))
      .catch(() => setEvents([]));
  }, []);

  return (
    <div className="bg-white">

      {/* ================= HERO WITH IMAGE ================= */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt="SRIT Campus"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center text-white px-6 max-w-5xl"
        >
          <span className="inline-block bg-orange-500 px-6 py-2 rounded-full text-sm font-bold mb-6">
            Empowering Innovation Since 2008
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Srinivasa Ramanujan <br />
            <span className="text-orange-400">Institute of Technology</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-10">
            Excellence in Education • Innovation • Future Leaders
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/admissions">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                Admissions Open <ArrowRight className="ml-2" />
              </Button>
            </Link>

            <Link to="/login">
              <Button size="lg" variant="outline" className="border-white text-white">
                Login to Dashboard
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ================= QUICK HIGHLIGHTS ================= */}
      <section className="-mt-20 relative z-20">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-6">
          {[
            { title: "Courses", icon: BookOpen },
            { title: "Admissions", icon: Users },
            { title: "Scholarships", icon: GraduationCap },
            { title: "Affordable Fees", icon: DollarSign },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl shadow-xl p-8 text-center hover:-translate-y-1 transition"
            >
              <item.icon className="w-10 h-10 text-orange-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* ================= DASHBOARD PORTALS ================= */}
      <section className="py-28 bg-gray-100">
        <div className="container mx-auto px-6">
          <SectionHeader title="Login Portals" subtitle="Dashboards" centered />

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <PortalCard title="Student Portal" link="/login" color="from-blue-600 to-purple-600" />
            <PortalCard title="Faculty Portal" link="/login" color="from-emerald-600 to-teal-500" />
            <PortalCard title="Admin Portal" link="/login" color="from-orange-600 to-red-500" />
          </div>
        </div>
      </section>

      {/* ================= CAMPUS GALLERY ================= */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeader title="Campus Life" subtitle="Inside SRIT" centered />

          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {[labImg, libraryImg, eventImg, hostelImg, groundImg, heroImg].map(
              (img, i) => (
                <div key={i} className="overflow-hidden rounded-2xl shadow-lg group">
                  <img
                    src={img}
                    alt="Campus"
                    className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ================= DEPARTMENTS ================= */}
      <section className="py-28 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6">
          <SectionHeader title="Departments" subtitle="Academics" centered />

          <div className="grid md:grid-cols-4 gap-8 mt-16">
            {departments.map((d) => (
              <div key={d.code} className="bg-white/10 backdrop-blur rounded-xl p-8 text-center">
                <h3 className="text-3xl font-bold mb-2">{d.code}</h3>
                <p className="text-white/90">{d.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EVENTS ================= */}
      <section className="py-28 bg-gray-100">
        <div className="container mx-auto px-6">
          <SectionHeader title="Events & Notices" subtitle="Campus Updates" />

          <Carousel plugins={[plugin.current]}>
            <CarouselContent>
              {events.map((e) => (
                <CarouselItem key={e.id} className="md:basis-1/2 lg:basis-1/3">
                  <EventCard event={{ title: e.title, date: e.created_at }} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex justify-center mt-6 gap-4">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-28 bg-orange-500 text-white text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Ready to Shape Your Future?
        </h2>
        <p className="text-xl mb-10">
          Join SRIT and become a part of excellence.
        </p>

        <div className="flex justify-center gap-6">
          <Button size="lg" className="bg-white text-orange-600">
            Download Brochure <Download className="ml-2" />
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white">
            Contact Us
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ---------- PORTAL CARD ---------- */
function PortalCard({ title, link, color }) {
  return (
    <Link to={link}>
      <div
        className={`bg-gradient-to-r ${color} text-white p-10 rounded-2xl shadow-xl hover:scale-105 transition`}
      >
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="opacity-90">Secure access to dashboard</p>
        <div className="mt-6 font-semibold">Login →</div>
      </div>
    </Link>
  );
}

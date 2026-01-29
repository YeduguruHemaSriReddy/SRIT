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

import heroImg from "../assets/campus/hero.jpg";
import labImg from "../assets/campus/lab.jpg";
import libraryImg from "../assets/campus/library.jpg";
import eventImg from "../assets/campus/event.jpg";
import hostelImg from "../assets/campus/hostel.jpg";
import groundImg from "../assets/campus/ground.jpg";

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
    <div className="bg-blue-50">

      {/* HERO */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
        <img src={heroImg} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-blue-500/40" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-6 max-w-5xl"
        >
          <span className="inline-block bg-blue-100 px-6 py-2 rounded-full text-sm font-bold mb-6 text-blue-600">
            Empowering Innovation Since 2008
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-blue-600">
            Srinivasa Ramanujan <br />
            <span className="text-orange-500">Institute of Technology</span>
          </h1>

          <p className="text-xl md:text-2xl mb-10 text-black">
            Excellence in Education • Innovation • Future Leaders
          </p>

          <div className="flex justify-center gap-6">
            <Link to="/admissions">
              <Button className="bg-blue-600 hover:bg-cyan-500 text-white">
                Admissions Open <ArrowRight className="ml-2" />
              </Button>
            </Link>

            <Link to="/login">
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-cyan-500 hover:text-white"
              >
                Login to Dashboard
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* QUICK HIGHLIGHTS */}
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
              className="bg-blue-100 rounded-2xl p-8 text-center shadow
                         hover:bg-cyan-500 hover:text-white
                         transition-all duration-300"
            >
              <item.icon className="w-10 h-10 mx-auto mb-4 text-blue-600" />
              <h3 className="font-bold text-lg">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* PORTALS */}
      <section className="py-28 bg-blue-100">
        <div className="container mx-auto px-6">
          <SectionHeader
            title="Login Portals"
            subtitle="Dashboards"
            titleColor="text-blue-600"
            subtitleColor="text-orange-500"
            centered
          />

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <PortalCard title="Student Portal" />
            <PortalCard title="Faculty Portal" />
            <PortalCard title="Admin Portal" />
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section className="py-28 bg-blue-50">
        <div className="container mx-auto px-6">
          <SectionHeader
            title="Events & Notices"
            subtitle="Campus Updates"
            titleColor="text-blue-600"
            subtitleColor="text-orange-500"
          />

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

      {/* CTA */}
      <section className="py-28 bg-blue-200 text-center">
        <h2 className="text-5xl font-extrabold mb-6 text-blue-600">
          Ready to Shape Your Future?
        </h2>

        <div className="flex justify-center gap-6">
          <Button className="bg-blue-600 hover:bg-cyan-500 text-white">
            Download Brochure <Download className="ml-2" />
          </Button>

          <Link to="/contact">
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-cyan-500 hover:text-white"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function PortalCard({ title }) {
  return (
    <Link to="/login">
      <div className="bg-blue-600 text-white p-10 rounded-2xl shadow-xl
                      hover:bg-cyan-500 hover:scale-105
                      transition-all duration-300">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p>Secure access to dashboard</p>
        <div className="mt-6 font-semibold">Login →</div>
      </div>
    </Link>
  );
}
import React, { useRef, useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import EventCard from "../components/EventCard";
import { Button } from "../components/ui/button"; // Your custom button.jsx

import { ArrowRight, BookOpen, GraduationCap, DollarSign, Users, Download } from "lucide-react";
import { motion } from "framer-motion";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

/* ---------------- STATIC DATA ---------------- */
const mockDepartments = [
  { id: 1, code: "CSE", name: "Computer Science & Engineering", description: "Excellence in computing and AI research." },
  { id: 2, code: "ECE", name: "Electronics & Communication", description: "Innovative electronics and communication studies." },
  { id: 3, code: "ME", name: "Mechanical Engineering", description: "Mechanical systems, design & innovation." },
  { id: 4, code: "CE", name: "Civil Engineering", description: "Building sustainable infrastructure for tomorrow." },
];

const mockAchievements = [
  { id: 1, title: "Robotics Championship", rank: 1, description: "Won first prize in National Robotics Competition.", category: "Technical" },
  { id: 2, title: "Startup Pitch", rank: 2, description: "Runner-up in state-level startup competition.", category: "Entrepreneurship" },
  { id: 3, title: "IEEE Publication", description: "Research published in IEEE Transactions.", category: "Research" },
];

/* ---------------- HOME ---------------- */
export default function Home() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/notices?role=all")
      .then((res) => res.json())
      .then((data) => setEvents(data || []))
      .catch((err) => console.error("Failed to load events", err));
  }, []);

  const heroCards = [
    { title: "Courses Offered", icon: BookOpen, desc: "Explore our UG & PG programs" },
    { title: "Admission Procedure", icon: Users, desc: "Step-by-step guidance" },
    { title: "Fees Structure", icon: DollarSign, desc: "Transparent financial details" },
    { title: "Scholarships", icon: GraduationCap, desc: "Financial aid opportunities" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* ================= HERO ================= */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gray-50 -z-20"></div>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
              <div className="inline-block px-4 py-2 rounded-full bg-orange-100 text-primary font-bold text-sm mb-6">
                Empowering Innovation Since 2008
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                Shape Your <span className="text-primary">Future</span> With Us
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                Srinivasa Ramanujan Institute of Technology fosters academic excellence,
                innovation, and character building.
              </p>
              <div className="flex gap-4">
                <Button size="lg">
                  Apply Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg">
                  Virtual Tour
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="-mt-20 mb-20 relative z-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {heroCards.map((card) => (
            <div key={card.title} className="bg-white p-6 rounded-xl shadow-md">
              <card.icon className="w-6 h-6 text-primary mb-3" />
              <h3 className="font-bold">{card.title}</h3>
              <p className="text-sm text-gray-500">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= DEPARTMENTS ================= */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeader title="Academic Departments" subtitle="Our Programs" centered />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockDepartments.map((dept) => (
              <div key={dept.id} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-primary font-bold text-lg mb-2">{dept.code}</div>
                <h3 className="font-semibold">{dept.name}</h3>
                <p className="text-sm text-gray-500">{dept.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EVENTS / NEWS ================= */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader title="Campus Happenings" subtitle="Events & News" />
          <Carousel opts={{ align: "start", loop: true }} plugins={[plugin.current]}>
            <CarouselContent className="-ml-4">
              {events.map((event) => (
                <CarouselItem key={event.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <EventCard
                    event={{
                      title: event.title,
                      date: new Date(event.created_at).toDateString(),
                    }}
                  />
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

      {/* ================= ACHIEVEMENTS ================= */}
      <section className="py-20 bg-orange-50">
        <div className="container mx-auto px-4">
          <SectionHeader title="Our Achievements" subtitle="Pride of SRIT" centered />
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {mockAchievements.map((ach) => (
              <div key={ach.id} className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-bold">{ach.title}</h3>
                <p className="text-sm text-gray-600">{ach.description}</p>
                <span className="text-xs text-primary font-semibold">{ach.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-primary text-white text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
        <p className="text-lg mb-8">
          Admissions are open for the upcoming academic year.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg">
            Download Brochure <Download className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="outline" size="lg">
            Contact Admission Cell
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

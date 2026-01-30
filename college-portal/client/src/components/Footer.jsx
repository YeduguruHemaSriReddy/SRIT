import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-orange-500 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* BRAND */}
          <div className="space-y-6">
            <h2 className="font-black text-2xl">SRIT</h2>
            <p className="text-white/90 text-sm leading-relaxed">
              Srinivasa Ramanujan Institute of Technology is committed to
              delivering quality technical education and ethical values.
            </p>

            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram, Youtube].map(
                (Icon, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-black flex items-center
                    justify-center hover:bg-white hover:text-orange-500 transition"
                  >
                    <Icon size={18} />
                  </div>
                )
              )}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/admissions" className="hover:underline">Admissions</Link></li>
              <li><Link to="/departments" className="hover:underline">Departments</Link></li>
              <li><Link to="/placements" className="hover:underline">Placements</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>

          {/* DEPARTMENTS */}
          <div>
            <h4 className="font-bold text-lg mb-6">Departments</h4>
            <ul className="space-y-3 text-sm">
              <li>CSE</li>
              <li>ECE</li>
              <li>EEE</li>
              <li>ME</li>
              <li>CE</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li>📍 Anantapur, AP</li>
              <li>📞 +91 98765 43210</li>
              <li className="text-blue-200">✉️ info@srit.ac.in</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/40 pt-6 text-center text-sm text-white/90">
          © {new Date().getFullYear()} SRIT. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

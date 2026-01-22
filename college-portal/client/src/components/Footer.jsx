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
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* ================= BRAND ================= */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-bold text-white">
                S
              </div>
              <span className="font-bold text-2xl">SRIT</span>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              Srinivasa Ramanujan Institute of Technology is committed to
              delivering quality technical education and fostering innovation,
              leadership, and ethical values.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4">
              <a className="social-btn" href="#">
                <Facebook size={18} />
              </a>
              <a className="social-btn" href="#">
                <Twitter size={18} />
              </a>
              <a className="social-btn" href="#">
                <Linkedin size={18} />
              </a>
              <a className="social-btn" href="#">
                <Instagram size={18} />
              </a>
              <a className="social-btn" href="#">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/admissions" className="footer-link">Admissions</Link></li>
              <li><Link to="/departments" className="footer-link">Departments</Link></li>
              <li><Link to="/placements" className="footer-link">Placements</Link></li>
              <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
            </ul>
          </div>

          {/* ================= DEPARTMENTS ================= */}
          <div>
            <h4 className="font-bold text-lg mb-6">Departments</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-primary cursor-pointer">Computer Science (CSE)</li>
              <li className="hover:text-primary cursor-pointer">Electronics (ECE)</li>
              <li className="hover:text-primary cursor-pointer">Electrical (EEE)</li>
              <li className="hover:text-primary cursor-pointer">Mechanical (ME)</li>
              <li className="hover:text-primary cursor-pointer">Civil (CE)</li>
            </ul>
          </div>

          {/* ================= CONTACT ================= */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>📍 Rotarypuram Village, Anantapur – 515701, AP</li>
              <li>📞 +91 98765 43210</li>
              <li>✉️ info@srit.ac.in</li>
            </ul>
          </div>
        </div>

        {/* ================= BOTTOM ================= */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} SRIT. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* INLINE UTILITY STYLES */}
      <style>{`
        .social-btn {
          width: 40px;
          height: 40px;
          background: #1f2937;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }
        .social-btn:hover {
          background: var(--primary, #2563eb);
        }
        .footer-link {
          color: #9ca3af;
          transition: color 0.3s;
        }
        .footer-link:hover {
          color: var(--primary, #2563eb);
        }
      `}</style>
    </footer>
  );
};

export default Footer;

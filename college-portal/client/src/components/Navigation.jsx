import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/campus/srit-logo.png";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Admissions", path: "/admissions" },
    { name: "Departments", path: "/departments" },
    { name: "Campus Life", path: "/campus-life" },
    { name: "Placements", path: "/placements" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 w-full z-50">

      {/* TOP STRIP */}
      <div className="w-full bg-gradient-to-r from-[#020617] via-[#0B1F3A] to-[#164E63]
        text-xs text-[#E0F2FE] border-b border-white/10">
        <div className="w-full px-6 py-2 flex justify-between">
          <div className="flex gap-4">
            <span>📞 <span className="text-[#67E8F9]">+91 95156 11111</span></span>
            <span>✉️ <span className="text-[#67E8F9]">hr@srit.ac.in</span></span>
          </div>
          <span className="text-[#FBBF24] font-semibold tracking-wide">
            Autonomous Institution
          </span>
        </div>
      </div>

      {/* LOGO */}
      <div className="w-full bg-white border-b">
        <div
          className="h-[120px] bg-no-repeat bg-center bg-contain"
          style={{ backgroundImage: `url(${logo})` }}
        />
      </div>

      {/* NAV BAR */}
      <nav className="w-full bg-[#020617]/80 backdrop-blur-xl border-b border-white/10">
        <div className="w-full px-6">
          <div className="flex justify-between items-center py-4">

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex gap-3">
              {navLinks.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`
                      px-5 py-2 rounded-full text-sm font-semibold transition-all
                      backdrop-blur-xl border
                      ${active
                        ? "bg-gradient-to-r from-[#FBBF24] to-[#22D3EE] text-black shadow-[0_0_25px_#22D3EEAA]"
                        : "bg-white/10 text-[#E5E7EB] border-white/20 hover:bg-white/20 hover:shadow-[0_0_20px_#22D3EE66]"
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* LOGIN */}
            <Link
              to="/login"
              className="hidden lg:block px-6 py-2 rounded-full font-bold text-black
              bg-gradient-to-r from-[#FBBF24] to-[#22D3EE]
              shadow-[0_0_25px_#22D3EEAA] hover:shadow-[0_0_40px_#FBBF24AA] transition"
            >
              Login
            </Link>

            {/* MOBILE MENU */}
            <button
              className="lg:hidden text-3xl text-[#67E8F9]"
              onClick={() => setIsOpen(!isOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* MOBILE NAV */}
        {isOpen && (
          <div className="lg:hidden bg-[#020617]/95 backdrop-blur-xl border-t border-white/10">
            <div className="flex flex-col gap-3 px-6 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-3 rounded-full bg-white/10 text-[#E5E7EB]
                  border border-white/20 hover:bg-white/20 transition"
                >
                  {link.name}
                </Link>
              ))}

              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="mt-4 text-center px-5 py-3 rounded-full font-bold text-black
                bg-gradient-to-r from-[#FBBF24] to-[#22D3EE]"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

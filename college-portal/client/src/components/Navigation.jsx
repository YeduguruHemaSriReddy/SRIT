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

      {/* TOP ORANGE STRIP */}
      <div className="w-full bg-orange-500 text-white text-xs">
        <div className="w-full px-6 py-2 flex justify-between">
          <div className="flex gap-4">
            <span>📞 <span className="text-white/90">+91 95156 11111</span></span>
            <span>✉️ <span className="text-blue-200">hr@srit.ac.in</span></span>
          </div>
          <span className="font-semibold tracking-wide">
            Autonomous Institution
          </span>
        </div>
      </div>

      {/* LOGO */}
      <div className="w-full bg-white border-b border-gray-200">
        <div
          className="h-[120px] bg-no-repeat bg-center bg-contain"
          style={{ backgroundImage: `url(${logo})` }}
        />
      </div>

      {/* NAV BAR */}
      <nav className="w-full bg-black border-b-4 border-orange-500">
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
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition
                      ${active
                        ? "bg-orange-500 text-white"
                        : "text-white hover:bg-orange-500"
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* LOGIN */}
            <Link
              to="/login"
              className="hidden lg:block px-6 py-2 rounded-full font-bold
              bg-orange-500 text-white hover:bg-orange-600 transition"
            >
              Login
            </Link>

            {/* MOBILE MENU */}
            <button
              className="lg:hidden text-3xl text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* MOBILE NAV */}
        {isOpen && (
          <div className="lg:hidden bg-black border-t border-orange-500">
            <div className="flex flex-col gap-3 px-6 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-3 rounded-full text-white hover:bg-orange-500 transition"
                >
                  {link.name}
                </Link>
              ))}

              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="mt-4 text-center px-5 py-3 rounded-full font-bold
                bg-orange-500 text-white hover:bg-orange-600 transition"
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

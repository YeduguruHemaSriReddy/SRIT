import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/campus/srit-logo.png";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Admissions", path: "/admissions" },
    { name: "Departments", path: "/departments" },
    { name: "Campus Life", path: "/campus-life" },
    { name: "Placements", path: "/placements" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="w-full bg-white">

      {/* ================= TOP CONTACT STRIP ================= */}
      <div className="bg-orange-600 text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between">
          <div className="flex gap-4">
            <span>📞 91-951-561-1111</span>
            <span>✉️ hr@srit.ac.in</span>
          </div>
          {/* <div className="flex gap-4">
            <span>Faculty Login</span>
            <span>Student Login</span>
          </div> */}
        </div>
      </div>

      {/* ================= SRIT LOGO BANNER ================= */}
      <div
        className="w-full h-[140px] bg-no-repeat bg-center bg-contain border-b"
        style={{
          backgroundImage: `url(${logo})`,
        }}
      />

      {/* ================= NAVIGATION BAR ================= */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-3">

            {/* DESKTOP MENU */}
            <div className="hidden lg:flex gap-6 text-sm font-semibold text-gray-700">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`hover:text-orange-600 transition ${
                    location.pathname === link.path
                      ? "text-orange-600 border-b-2 border-orange-600 pb-1"
                      : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* LOGIN BUTTON */}
            <Link
              to="/login"
              className="hidden lg:block px-5 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition text-sm"
            >
              Login
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              className="lg:hidden text-2xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {isOpen && (
          <div className="lg:hidden border-t bg-white">
            <div className="flex flex-col px-4 py-4 gap-3 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-orange-600"
                >
                  {link.name}
                </Link>
              ))}

              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="mt-2 text-center bg-orange-600 text-white py-2 rounded"
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

import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Admissions", path: "/admissions" },
    { name: "Departments", path: "/departments" },
    { name: "Campus Life", path: "/campus-life" },
    { name: "Placements", path: "/placements" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 bg-white transition-all duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      {/* ================= TOP BAR ================= */}
      <div className="hidden lg:block bg-gray-900 text-white text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between">
          <div className="flex gap-6">
            <span>Chairperson</span>
            <span>Secretary</span>
            <span>Principal</span>
          </div>
          <div className="flex gap-6">
            <span>📞 +91 98765 43210</span>
            <span>✉️ info@srit.ac.in</span>
          </div>
        </div>
      </div>

      {/* ================= MAIN NAV ================= */}
      <div className={`transition-all ${scrolled ? "py-2" : "py-4"}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary text-white font-bold flex items-center justify-center rounded-lg">
              SRIT
            </div>
            <div>
              <div className="font-bold text-lg leading-none">SRIT</div>
              <div className="text-xs text-gray-500">ANANTAPUR</div>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all
                    ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-gray-600 hover:text-primary hover:bg-gray-100"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <Link
              to="/login"
              className="ml-4 px-6 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition"
            >
              Login
            </Link>
          </nav>

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
        <div className="lg:hidden bg-white border-t shadow-md">
          <div className="px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`p-3 rounded text-sm font-medium transition
                  ${
                    location.pathname === link.path
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                  }`}
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="mt-3 p-3 text-center bg-primary text-white rounded-lg font-semibold"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;

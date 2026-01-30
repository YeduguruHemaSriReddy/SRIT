import logo from "../assets/campus/srit-logo.png";

export default function PortalHeader({ title }) {
  return (
    <header className="w-full h-20 bg-white border-b border-gray-200
      flex items-center justify-between px-6 shadow-sm">

      {/* LEFT: LOGO + COLLEGE NAME */}
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt="SRIT Logo"
          className="h-12 w-auto"
        />
        <div>
          <h1 className="text-lg font-bold text-black">
            Srinivasa Ramanujan Institute of Technology
          </h1>
          <p className="text-sm text-gray-500">
            {title}
          </p>
        </div>
      </div>

      {/* RIGHT: OPTIONAL ACTIONS */}
      <button
        className="px-5 py-2 rounded-lg
        bg-orange-500 text-white font-semibold
        hover:bg-orange-600 transition"
      >
        Logout
      </button>
    </header>
  );
}

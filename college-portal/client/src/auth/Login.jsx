import { useState } from "react";
import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const [tab, setTab] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // SRIT student email format
  const studentRegex = /^[0-9]{2}g(1a|5a)[0-9]{4}@srit\.ac\.in$/i;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email.endsWith("@srit.ac.in")) {
      setLoading(false);
      return setError("Only SRIT official email IDs are allowed.");
    }

    const { data, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      setLoading(false);
      return setError("Invalid email or password.");
    }

    const { data: userRow, error: roleError } = await supabase
      .from("users")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (roleError || !userRow?.role) {
      setLoading(false);
      return setError("User role not assigned. Contact admin.");
    }

    if (userRow.role === "student" && !studentRegex.test(email)) {
      setLoading(false);
      return setError("Invalid student email format.");
    }

    navigate(`/${userRow.role}/dashboard`, { replace: true });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden font-sans">

      {/* ================= ANIMATED BACKGROUND ================= */}
      <div className="absolute inset-0 overflow-hidden">

        {/* Aurora gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br 
          from-[#0B1C3D] via-[#132A5E] to-[#0B1C3D]"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: "400% 400%" }}
        />

        {/* Glow orbs */}
        <motion.div
          className="absolute w-[420px] h-[420px] bg-cyan-400/30 rounded-full blur-[140px]"
          animate={{ x: [-120, 180, -120], y: [0, 140, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "-140px", left: "-140px" }}
        />

        <motion.div
          className="absolute w-[500px] h-[500px] bg-indigo-500/25 rounded-full blur-[160px]"
          animate={{ x: [0, -220, 0], y: [0, -160, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
          style={{ bottom: "-200px", right: "-200px" }}
        />

        {/* Floating glass bubbles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 rounded-full
              bg-white/10 backdrop-blur-md border border-white/20"
            animate={{
              y: [0, -60, 0],
              x: [0, i % 2 === 0 ? 40 : -40, 0],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              top: `${20 + i * 10}%`,
              left: `${10 + i * 12}%`,
            }}
          />
        ))}

        {/* Wireframe shapes */}
        <motion.div
          className="absolute w-40 h-40 border border-cyan-400/30 rounded-xl"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          style={{ top: "18%", right: "14%" }}
        />

        <motion.div
          className="absolute w-28 h-28 border border-indigo-400/30 rounded-xl"
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
          style={{ bottom: "22%", left: "16%" }}
        />
      </div>

      {/* ================= LOGIN CARD ================= */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md
        bg-white/90 backdrop-blur-xl
        rounded-3xl shadow-[0_40px_80px_rgba(0,0,0,0.3)]
        border border-white/40 p-8"
      >

        {/* Role Switch */}
        <div className="flex mb-6 rounded-full bg-slate-100 p-1">
          <button
            onClick={() => setTab("student")}
            className={`w-1/2 py-2 rounded-full flex items-center justify-center gap-2 font-semibold transition ${
              tab === "student"
                ? "bg-indigo-600 text-white shadow"
                : "text-slate-600"
            }`}
          >
            <GraduationCap size={18} /> Student
          </button>

          <button
            onClick={() => setTab("faculty")}
            className={`w-1/2 py-2 rounded-full flex items-center justify-center gap-2 font-semibold transition ${
              tab === "faculty"
                ? "bg-indigo-600 text-white shadow"
                : "text-slate-600"
            }`}
          >
            <Users size={18} /> Faculty
          </button>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-extrabold text-center mb-1 text-slate-900">
          {tab === "student" ? "Student Login" : "Faculty Login"}
        </h2>

        <p className="text-sm text-slate-500 text-center mb-6">
          Sign in using your SRIT institutional email
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-600 text-sm text-center mb-4">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="SRIT Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl px-4 py-3 border
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl px-4 py-3 border
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-white
            bg-gradient-to-r from-indigo-600 to-blue-600
            hover:from-indigo-700 hover:to-blue-700
            transition shadow-lg"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-xs text-slate-400 text-center mt-6">
          © {new Date().getFullYear()} Srinivasa Ramanujan Institute of Technology
        </p>
      </motion.div>
    </div>
  );
}

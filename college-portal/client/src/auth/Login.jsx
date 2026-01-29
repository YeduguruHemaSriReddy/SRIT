import { useState } from "react";
import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Users } from "lucide-react";

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

    /* ================= BASIC DOMAIN CHECK ================= */
    if (!email.endsWith("@srit.ac.in")) {
      setLoading(false);
      return setError("Only SRIT official email IDs are allowed.");
    }

    /* ================= AUTHENTICATE FIRST ================= */
    const { data, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      setLoading(false);
      return setError("Invalid email or password.");
    }

    /* ================= FETCH ROLE ================= */
    const { data: userRow, error: roleError } = await supabase
      .from("users")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (roleError || !userRow?.role) {
      setLoading(false);
      return setError("User role not assigned. Contact admin.");
    }

    /* ================= STUDENT FORMAT CHECK (AFTER LOGIN) ================= */
    if (
      userRow.role === "student" &&
      !studentRegex.test(email)
    ) {
      setLoading(false);
      return setError("Invalid student email format.");
    }

    /* ================= REDIRECT ================= */
    navigate(`/${userRow.role}/dashboard`, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-orange-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        {/* ================= ROLE SWITCH ================= */}
        <div className="flex mb-6 rounded-full bg-gray-100 p-1">
          <button
            onClick={() => setTab("student")}
            className={`w-1/2 py-2 rounded-full flex items-center justify-center gap-2 font-semibold transition ${
              tab === "student"
                ? "bg-indigo-600 text-white"
                : "text-gray-600"
            }`}
          >
            <GraduationCap size={18} />
            Student
          </button>

          <button
            onClick={() => setTab("faculty")}
            className={`w-1/2 py-2 rounded-full flex items-center justify-center gap-2 font-semibold transition ${
              tab === "faculty"
                ? "bg-indigo-600 text-white"
                : "text-gray-600"
            }`}
          >
            <Users size={18} />
            Faculty 
          </button>
        </div>

        {/* ================= TITLE ================= */}
        <h2 className="text-xl font-bold text-center mb-1">
          {tab === "student"
            ? "Student Login"
            : "Faculty Login"}
        </h2>

        <p className="text-sm text-gray-500 text-center mb-5">
          Sign in using your SRIT institutional email
        </p>

        {/* ================= ERROR ================= */}
        {error && (
          <p className="text-red-600 text-sm text-center mb-4">
            {error}
          </p>
        )}

        {/* ================= FORM ================= */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="SRIT Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <button
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* ================= FOOTER ================= */}
        <p className="text-xs text-gray-400 text-center mt-6">
          © {new Date().getFullYear()} Srinivasa Ramanujan Institute of Technology
        </p>
      </div>
    </div>
  );
}

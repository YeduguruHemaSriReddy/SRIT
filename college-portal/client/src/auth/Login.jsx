import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [tab, setTab] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // SRIT student roll format
  // eg: 21g1a3312@srit.ac.in | 22g5a1023@srit.ac.in
  const studentRegex = /^[0-9]{2}g(1a|5a)[0-9]{2}[0-9]{2}@srit\.ac\.in$/i;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    /* ---------- BASIC VALIDATION ---------- */
    if (!email.endsWith("@srit.ac.in")) {
      setLoading(false);
      return setError("Only SRIT email IDs are allowed");
    }

    if (tab === "student" && !studentRegex.test(email)) {
      setLoading(false);
      return setError("Invalid student roll number email format");
    }

    if (tab === "faculty" && studentRegex.test(email)) {
      setLoading(false);
      return setError("Faculty must use official faculty email");
    }

    /* ---------- SUPABASE AUTH ---------- */
    const { data, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      setLoading(false);
      return setError(authError.message);
    }

    /* ---------- FETCH ROLE ---------- */
    const { data: userData, error: roleError } = await supabase
      .from("users")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (roleError || !userData) {
      setLoading(false);
      return setError("Role not assigned. Contact admin.");
    }

    /* ---------- ROLE CHECK ---------- */
    if (userData.role !== tab) {
      setLoading(false);
      return setError(`You are not authorized as ${tab}`);
    }

    /* ---------- REDIRECT ---------- */
    if (userData.role === "student") navigate("/student");
    if (userData.role === "faculty") navigate("/faculty");
    if (userData.role === "admin") navigate("/admin");

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        {/* TABS */}
        <div className="flex mb-6 rounded-full bg-gray-100 p-1">
          {["student", "faculty"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`w-1/2 py-2 rounded-full font-semibold transition ${
                tab === t
                  ? "bg-orange-600 text-white"
                  : "text-gray-600"
              }`}
            >
              {t === "student" ? "Student Login" : "Faculty Login"}
            </button>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">
          {tab === "student" ? "Student Portal" : "Faculty Portal"}
        </h2>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="SRIT Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

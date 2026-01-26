import { useState } from "react";
import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [tab, setTab] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const studentRegex = /^[0-9]{2}g(1a|5a)[0-9]{4}@srit\.ac\.in$/i;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ Common domain check
    if (!email.endsWith("@srit.ac.in")) {
      return setError("Only SRIT emails allowed");
    }

    // ✅ Student email format check
    if (tab === "student" && !studentRegex.test(email)) {
      return setError("Invalid student email format");
    }

    // ✅ Faculty/Admin should NOT use student format
    if (tab !== "student" && studentRegex.test(email)) {
      return setError("Invalid email for this role");
    }

    const { data, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      setError(authError.message);
      return;
    }

    // 🔑 Fetch role ONCE (single source)
    const { data: userRow, error: roleError } = await supabase
      .from("users")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (roleError || !userRow?.role) {
      setError("User role not assigned. Contact admin.");
      return;
    }

    // ✅ Role-based redirect
    navigate(`/${userRow.role}/dashboard`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-orange-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        <div className="flex mb-6 rounded-full bg-gray-100 p-1">
          {["student", "faculty", "admin"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`w-1/3 py-2 rounded-full font-semibold ${
                tab === t ? "bg-indigo-600 text-white" : "text-gray-600"
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        <h2 className="text-xl font-bold text-center mb-4">
          {tab.toUpperCase()} LOGIN
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="SRIT Email"
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

          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

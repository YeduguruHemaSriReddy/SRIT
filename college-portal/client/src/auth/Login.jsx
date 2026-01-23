import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api"; // Your Render backend

export default function Login() {
  const [tab, setTab] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // SRIT student mail pattern
  const studentRegex = /^[0-9]{2}g(1a|5a)[0-9]{4}@srit\.ac\.in$/i;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Email validation
    if (!email.endsWith("@srit.ac.in")) {
      return setError("Only SRIT email IDs are allowed");
    }

    if (tab === "student" && !studentRegex.test(email)) {
      return setError("Invalid student roll number email");
    }

    if (tab === "faculty" && studentRegex.test(email)) {
      return setError("Faculty must use official faculty email");
    }

    try {
      // Call your backend login API
      const response = await API.post("/login", { email, password });
      const { token, role } = response.data; // Assuming backend returns JWT + role

      // Save token locally
      localStorage.setItem("token", token);

      // Navigate based on role
      if (role === "student") navigate("/student");
      else if (role === "faculty") navigate("/faculty");
      else if (role === "admin") navigate("/admin");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-orange-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white text-center py-6">
          <h1 className="text-xl font-bold">
            Srinivasa Ramanujan Institute of Technology
          </h1>
          <p className="text-sm opacity-90">Anantapur</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mt-6">
          <div className="bg-gray-100 rounded-full p-1 flex w-[90%]">
            <button
              onClick={() => setTab("student")}
              className={`w-1/2 py-2 rounded-full text-sm font-semibold transition ${
                tab === "student" ? "bg-orange-600 text-white" : "text-gray-600"
              }`}
            >
              Student Login
            </button>
            <button
              onClick={() => setTab("faculty")}
              className={`w-1/2 py-2 rounded-full text-sm font-semibold transition ${
                tab === "faculty" ? "bg-blue-700 text-white" : "text-gray-600"
              }`}
            >
              Faculty Login
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="px-8 py-6 space-y-4">
          <h2 className="text-center text-lg font-bold text-gray-800">
            {tab === "student" ? "Student Portal" : "Faculty Portal"}
          </h2>

          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          <input
            type="email"
            placeholder="SRIT Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

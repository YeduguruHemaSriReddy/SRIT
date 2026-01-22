import { useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { role } = useAuth(); // role will update via AuthContext

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    // 1️⃣ Supabase Auth Login
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      alert(error.message);
      return;
    }

    // 2️⃣ Let AuthContext update role, then redirect
    setTimeout(() => {
      if (role === "student") navigate("/student");
      else if (role === "admin") navigate("/admin");
      else if (role === "faculty") navigate("/faculty");
      else navigate("/");
    }, 500);

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="card" style={{ width: "400px", margin: "auto" }}>
        <h3 style={{ marginBottom: "20px" }}>Login</h3>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px" }}
        />
        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px" }}
        />
        <br />
        <br />

        <button
          className="btn"
          onClick={handleLogin}
          disabled={loading}
          style={{ width: "100%" }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

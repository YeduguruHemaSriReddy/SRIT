import { useState } from "react";
import supabase from "../supabaseClient";
import API from "../api";

import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    setLoading(true);

    // 1️⃣ Create auth user (Supabase Auth)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      alert(error.message);
      return;
    }

    const userId = data.user.id;

    // 2️⃣ Call backend to create users + students rows
    const response = await API.post("/register/student", {
      id: userId,
      name,
      email,
      department: "CSE",
      year: 3,
      section: "A",
    });

    if (response.status !== 200) {
      setLoading(false);
      alert(response.data.error || "Registration failed");
      return;
    }

    alert("Registration successful! Please login.");
    setLoading(false);
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleRegister}
        className="card"
        style={{ width: "400px", margin: "auto" }}
      >
        <h2 style={{ marginBottom: "20px" }}>Student Registration</h2>

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

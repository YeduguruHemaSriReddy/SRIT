import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  const { user, loading: authLoading } = useAuth();

  const [student, setStudent] = useState(null);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    loadDashboard();
  }, [user]);

  const loadDashboard = async () => {
    try {
      // 1️⃣ Student profile (RLS-safe read)
      const { data: studentData, error: studentError } = await supabase
        .from("students")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (studentError) {
        console.error(studentError.message);
      } else {
        setStudent(studentData);
      }

      // 2️⃣ Notices (via backend – RLS safe)
      const res = await fetch(
        "http://localhost:5000/api/notices?role=student"
      );
      const noticeData = await res.json();
      setNotices(noticeData || []);
    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return <p style={{ padding: "30px" }}>Loading dashboard...</p>;
  }

  if (!student) {
    return <p style={{ padding: "30px" }}>Student profile not found</p>;
  }

  return (
    <div className="container" style={{ padding: "30px" }}>
      <h2 style={{ marginBottom: "20px" }}>🎓 Student Dashboard</h2>

      {/* PROFILE CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: "20px",
        }}
      >
        <div className="card">
          <h4>Department</h4>
          <p>{student.department}</p>
        </div>

        <div className="card">
          <h4>Year</h4>
          <p>{student.year}</p>
        </div>

        <div className="card">
          <h4>Roll Number</h4>
          <p>{student.roll_number || "—"}</p>
        </div>

        <div className="card">
          <h4>Phone</h4>
          <p>{student.phone || "—"}</p>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div style={{ marginTop: "30px" }}>
        <h3>Quick Actions</h3>
        <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
          <Link className="btn" to="/student/notices">
            View Notices
          </Link>
          <Link className="btn" to="/student/downloads">
            Downloads
          </Link>
          <Link className="btn" to="/student/grievances">
            Grievances
          </Link>
        </div>
      </div>

      {/* RECENT NOTICES */}
      <div style={{ marginTop: "40px" }}>
        <h3>Recent Notices</h3>

        {notices.length === 0 && <p>No notices available</p>}

        {notices.slice(0, 3).map((n) => (
          <div key={n.id} className="card" style={{ marginTop: "15px" }}>
            <h4>{n.title}</h4>
            <p>{n.description}</p>
            <small>
              {new Date(n.created_at).toLocaleDateString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

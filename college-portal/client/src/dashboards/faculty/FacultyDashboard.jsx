import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function FacultyDashboard() {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <p style={{ padding: "30px" }}>Loading...</p>;
  }

  if (!user || role !== "faculty") {
    return <p style={{ padding: "30px" }}>Unauthorized</p>;
  }

  return (
    <div className="container" style={{ padding: "30px" }}>
      {/* HEADER */}
      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "bold" }}>
          👨‍🏫 Faculty Dashboard
        </h2>
        <p style={{ color: "#666", marginTop: "6px" }}>
          Welcome to the faculty portal
        </p>
      </div>

      {/* INFO CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        <div className="card">
          <h4>📢 Notices</h4>
          <p style={{ color: "#555" }}>
            View important academic & administrative notices
          </p>
        </div>

        <div className="card">
          <h4>📁 Downloads</h4>
          <p style={{ color: "#555" }}>
            Access circulars, timetables & documents
          </p>
        </div>

        <div className="card">
          <h4>🏫 Departments</h4>
          <p style={{ color: "#555" }}>
            Faculty academic information
          </p>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div style={{ marginTop: "40px" }}>
        <h3 style={{ marginBottom: "15px" }}>Quick Actions</h3>

        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          <Link className="btn" to="/faculty/notices">
            View Notices
          </Link>

          <Link className="btn" to="/faculty/downloads">
            Downloads
          </Link>
        </div>
      </div>

      {/* FOOTER NOTE */}
      <div
        style={{
          marginTop: "50px",
          padding: "20px",
          background: "#f9f9f9",
          borderRadius: "8px",
          color: "#555",
        }}
      >
        <p>
          This portal allows faculty members to stay updated with institutional
          announcements and academic resources.
        </p>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="container" style={{ padding: "30px" }}>
      <h2>🛠 Admin Dashboard</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <Link className="btn" to="/admin/notices">Manage Notices</Link>
        <Link className="btn" to="/admin/downloads">Manage Downloads</Link>
        <Link className="btn" to="/admin/grievances">View Grievances</Link>
      </div>
    </div>
  );
}

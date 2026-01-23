import { useEffect, useState } from "react";
import API from "../../api";

export default function StudentNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await API.get("/notices?role=student");
      setNotices(response.data || []);
    } catch (err) {
      console.error("Failed to fetch notices", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p style={{ padding: "30px" }}>Loading notices...</p>;
  }

  return (
    <div className="container" style={{ padding: "30px" }}>
      <h2>📢 Latest Notices</h2>

      {notices.length === 0 && (
        <p style={{ marginTop: "20px" }}>No notices available</p>
      )}

      {notices.map((n) => (
        <div key={n.id} className="card" style={{ marginTop: "15px" }}>
          <h4>{n.title}</h4>
          <p>{n.description}</p>
          <small>
            {new Date(n.created_at).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
}

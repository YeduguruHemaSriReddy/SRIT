import { useEffect, useState } from "react";

export default function FacultyNotices() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/notices?role=faculty")
      .then(res => res.json())
      .then(setNotices);
  }, []);

  return (
    <div className="container" style={{ padding: "30px" }}>
      <h2>📢 Faculty Notices</h2>

      {notices.map(n => (
        <div key={n.id} className="card" style={{ marginTop: "15px" }}>
          <h4>{n.title}</h4>
          <p>{n.description}</p>
          <small>{new Date(n.created_at).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
}

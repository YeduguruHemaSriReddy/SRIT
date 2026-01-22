import { useEffect, useState } from "react";

export default function FacultyDownloads() {
  const [downloads, setDownloads] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/downloads?role=faculty")
      .then(res => res.json())
      .then(setDownloads);
  }, []);

  return (
    <div className="container" style={{ padding: "30px" }}>
      <h2>📁 Faculty Downloads</h2>

      {downloads.map(d => (
        <div key={d.id} className="card" style={{ marginTop: "15px" }}>
          <h4>{d.title}</h4>
          <a className="btn" href={d.file_url} target="_blank" rel="noreferrer">
            Download
          </a>
        </div>
      ))}
    </div>
  );
}

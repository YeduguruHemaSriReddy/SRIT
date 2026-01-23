import { useEffect, useState } from "react";
import API from "../../api";

export default function FacultyDownloads() {
  const [downloads, setDownloads] = useState([]);

  useEffect(() => {
    API.get("/downloads?role=faculty")
      .then(response => setDownloads(response.data));
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

import { useEffect, useState } from "react";
import API from "../../api";

export default function StudentDownloads() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDownloads();
  }, []);

  const fetchDownloads = async () => {
    try {
      const response = await API.get("/downloads?role=student");
      setDownloads(response.data || []);
    } catch (err) {
      console.error("Failed to fetch downloads", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p style={{ padding: "30px" }}>Loading downloads...</p>;
  }

  return (
    <div className="container" style={{ padding: "30px" }}>
      <h2>📁 Downloads</h2>

      {downloads.length === 0 && (
        <p style={{ marginTop: "20px" }}>No files available</p>
      )}

      {downloads.map((file) => (
        <div
          key={file.id}
          className="card"
          style={{
            marginTop: "15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h4>{file.title}</h4>
            <small>
              Uploaded on{" "}
              {new Date(file.created_at).toLocaleDateString()}
            </small>
          </div>

          <a
            href={file.file_url}
            target="_blank"
            rel="noreferrer"
            className="btn"
          >
            Download
          </a>
        </div>
      ))}
    </div>
  );
}

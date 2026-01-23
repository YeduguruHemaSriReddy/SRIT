import { useEffect, useState } from "react";
import API from "../../api";

export default function AdminGrievances() {
  const [grievances, setGrievances] = useState([]);

  useEffect(() => {
    API.get("/grievances")
      .then(response => setGrievances(response.data));
  }, []);

  const updateStatus = async (id, status) => {
    await API.put("/grievances", { id, status });

    setGrievances(g =>
      g.map(gr => gr.id === id ? { ...gr, status } : gr)
    );
  };

  return (
    <div className="container" style={{ padding: "30px" }}>
      <h2>📋 Student Grievances</h2>

      {grievances.map(g => (
        <div key={g.id} className="card" style={{ marginTop: "15px" }}>
          <p>{g.message}</p>
          <small>Status: {g.status}</small>
          <br />
          <button onClick={() => updateStatus(g.id, "Resolved")}>
            Mark Resolved
          </button>
        </div>
      ))}
    </div>
  );
}

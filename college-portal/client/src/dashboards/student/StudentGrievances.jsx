import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import API from "../../api";

export default function StudentGrievances() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [grievances, setGrievances] = useState([]);

  useEffect(() => {
    fetchGrievances();
  }, []);

  const fetchGrievances = async () => {
    const response = await API.get(`/grievances/student/${user.id}`);
    setGrievances(response.data || []);
  };

  const submitGrievance = async () => {
    if (!message) return alert("Enter grievance");

    await API.post("/grievances", {
      user_id: user.id,
      message,
    });

    setMessage("");
    fetchGrievances();
  };

  return (
    <div className="container" style={{ padding: "30px" }}>
      <h2>📝 Grievances</h2>

      <textarea
        placeholder="Write your grievance..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "100%", height: "100px" }}
      />

      <button className="btn" onClick={submitGrievance}>
        Submit
      </button>

      <h3 style={{ marginTop: "30px" }}>Previous Grievances</h3>

      {grievances.map((g) => (
        <div key={g.id} className="card" style={{ marginTop: "10px" }}>
          <p>{g.message}</p>
          <small>Status: {g.status}</small>
        </div>
      ))}
    </div>
  );
}

import { useState } from "react";
import { supabase } from "../../services/supabase";

export default function AdminNotices() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetRole, setTargetRole] = useState("student");

  const createNotice = async () => {
    const { error } = await supabase.from("notices").insert([
      { title, description, target_role: targetRole }
    ]);

    if (error) alert(error.message);
    else {
      alert("Notice Posted");
      setTitle("");
      setDescription("");
    }
  };

  return (
    <div className="container" style={{ padding: "30px" }}>
      <h2>🛠️ Post New Notice</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <br /><br />

      <textarea
        placeholder="Description"
        rows="5"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <br /><br />

      <select onChange={e => setTargetRole(e.target.value)}>
        <option value="student">Students</option>
        <option value="faculty">Faculty</option>
        <option value="all">All</option>
      </select>

      <br /><br />
      <button className="btn" onClick={createNotice}>
        Publish Notice
      </button>
    </div>
  );
}

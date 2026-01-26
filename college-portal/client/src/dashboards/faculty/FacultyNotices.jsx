import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function FacultyNotices() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    const { data } = await supabase
      .from("notices")
      .select("*")
      .in("audience", ["faculty", "both"])
      .order("created_at", { ascending: false });

    setNotices(data || []);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Faculty Notices</h1>

      {notices.map((n) => (
        <div key={n.id} className="border p-3 rounded mb-2">
          <h3 className="font-semibold">{n.title}</h3>
          <p>{n.content}</p>
          <small className="text-gray-500">
            {new Date(n.created_at).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
}

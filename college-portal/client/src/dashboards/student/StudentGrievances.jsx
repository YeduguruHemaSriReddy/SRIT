import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function StudentGrievances() {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    category: "Academic",
    description: "",
    priority: "Medium",
  });

  useEffect(() => {
    fetchGrievances();
  }, []);

  const fetchGrievances = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: student } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!student) return;

    const { data } = await supabase
      .from("grievances")
      .select("*")
      .eq("student_id", student.id)
      .order("created_at", { ascending: false });

    setGrievances(data || []);
    setLoading(false);
  };

  const submitGrievance = async () => {
    if (!form.title || !form.description) {
      alert("Please fill all fields");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: student } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", user.id)
      .single();

    const { error } = await supabase.from("grievances").insert([
      {
        student_id: student.id,
        ...form,
      },
    ]);

    if (error) {
      alert("Failed to submit grievance");
    } else {
      alert("Grievance submitted");
      setForm({
        title: "",
        category: "Academic",
        description: "",
        priority: "Medium",
      });
      fetchGrievances();
    }
  };

  if (loading) return <p className="p-6">Loading grievances...</p>;

  return (
    <div className="p-6 max-w-4xl space-y-6">
      <h1 className="text-2xl font-semibold">📩 Student Grievances</h1>

      {/* RAISE GRIEVANCE */}
      <div className="bg-white p-5 rounded shadow space-y-3">
        <h2 className="font-semibold">Raise New Grievance</h2>

        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="w-full border px-3 py-2 rounded"
        />

        <select
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
          className="w-full border px-3 py-2 rounded"
        >
          <option>Academic</option>
          <option>Examination</option>
          <option>Facilities</option>
          <option>Administration</option>
        </select>

        <select
          value={form.priority}
          onChange={(e) =>
            setForm({ ...form, priority: e.target.value })
          }
          className="w-full border px-3 py-2 rounded"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <textarea
          placeholder="Describe your issue"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="w-full border px-3 py-2 rounded"
        />

        <button
          onClick={submitGrievance}
          className="bg-indigo-600 text-white px-6 py-2 rounded"
        >
          Submit Grievance
        </button>
      </div>

      {/* MY GRIEVANCES */}
      <div className="bg-white p-5 rounded shadow">
        <h2 className="font-semibold mb-3">My Grievances</h2>

        {grievances.length === 0 ? (
          <p className="text-gray-500">No grievances raised</p>
        ) : (
          <div className="space-y-3">
            {grievances.map((g) => (
              <div
                key={g.id}
                className="border rounded p-4"
              >
                <p className="font-medium">{g.title}</p>
                <p className="text-sm text-gray-600">
                  {g.category} • Priority: {g.priority}
                </p>
                <p className="text-sm mt-1">
                  Status:{" "}
                  <span className="font-medium">
                    {g.status}
                  </span>
                </p>

                {g.admin_reply && (
                  <p className="text-sm mt-2 text-green-700">
                    Admin Reply: {g.admin_reply}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

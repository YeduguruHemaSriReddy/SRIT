import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function StudentGrievances() {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "Academic",
    description: "",
    priority: "Medium",
  });

  useEffect(() => {
    fetchGrievances();
  }, []);

  /* ---------- LOAD STUDENT GRIEVANCES ---------- */
  const fetchGrievances = async () => {
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return setLoading(false);

    const { data: student } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!student) return setLoading(false);

    const { data } = await supabase
      .from("grievances")
      .select("*")
      .eq("student_id", student.id)
      .order("created_at", { ascending: false });

    setGrievances(data || []);
    setLoading(false);
  };

  /* ---------- SUBMIT GRIEVANCE ---------- */
  const submitGrievance = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      alert("Please fill all fields");
      return;
    }

    setSubmitting(true);

    const { data: { user } } = await supabase.auth.getUser();
    const { data: student } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", user.id)
      .single();

    const { error } = await supabase.from("grievances").insert({
      student_id: student.id,
      title: form.title,
      category: form.category,
      description: form.description,
      priority: form.priority,
      status: "Pending",
    });

    if (!error) {
      setForm({
        title: "",
        category: "Academic",
        description: "",
        priority: "Medium",
      });
      fetchGrievances();
    } else {
      alert("Failed to submit grievance");
    }

    setSubmitting(false);
  };

  if (loading) {
    return <p className="p-6 text-gray-500">Loading grievances...</p>;
  }

  return (
    <div className="p-6 max-w-4xl space-y-6">
      <h1 className="text-2xl font-semibold">📩 Student Grievances</h1>

      {/* RAISE GRIEVANCE */}
      <div className="bg-white p-5 rounded shadow space-y-4">
        <h2 className="font-semibold text-lg">Raise New Grievance</h2>

        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="border px-3 py-2 rounded"
          >
            <option>Academic</option>
            <option>Examination</option>
            <option>Facilities</option>
            <option>Administration</option>
          </select>

          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
            className="border px-3 py-2 rounded"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <textarea
          placeholder="Describe your issue clearly"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={4}
          className="w-full border px-3 py-2 rounded"
        />

        <button
          onClick={submitGrievance}
          disabled={submitting}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit Grievance"}
        </button>
      </div>

      {/* MY GRIEVANCES */}
      <div className="bg-white p-5 rounded shadow">
        <h2 className="font-semibold mb-4 text-lg">My Grievances</h2>

        {grievances.length === 0 ? (
          <p className="text-gray-500">No grievances raised yet</p>
        ) : (
          <div className="space-y-4">
            {grievances.map((g) => (
              <div key={g.id} className="border rounded p-4 space-y-1">
                <div className="flex justify-between items-center">
                  <p className="font-medium">{g.title}</p>
                  <span className={`text-xs px-2 py-1 rounded ${
                    g.status === "Resolved"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {g.status}
                  </span>
                </div>

                <p className="text-sm text-gray-600">
                  {g.category} • Priority: {g.priority}
                </p>

                <p className="text-sm mt-2">{g.description}</p>

                {g.admin_reply && (
                  <div className="mt-2 text-sm text-green-700">
                    <strong>Admin Reply:</strong> {g.admin_reply}
                  </div>
                )}

                <div className="text-xs text-gray-400 mt-1">
                  Submitted on {new Date(g.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

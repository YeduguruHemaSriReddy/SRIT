import { useEffect, useState, useCallback } from "react";
import supabase from "../../supabaseClient";

export default function AdminGrievances() {
  const [grievances, setGrievances] = useState([]);
  const [filter, setFilter] = useState("Pending");

  /* ---------- LOAD GRIEVANCES ---------- */
  const loadGrievances = useCallback(async () => {
    const { data } = await supabase
      .from("grievances")
      .select(`
        id,
        title,
        description,
        category,
        priority,
        status,
        created_at,
        students (
          roll_number,
          department
        )
      `)
      .eq("status", filter)
      .order("created_at", { ascending: false });

    setGrievances(data || []);
  }, [filter]);

  useEffect(() => {
    loadGrievances();
  }, [loadGrievances]);

  /* ---------- UPDATE STATUS ---------- */
  const updateStatus = async (id, status) => {
    await supabase
      .from("grievances")
      .update({ status })
      .eq("id", id);

    loadGrievances();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">📌 Student Grievances</h1>

      {/* FILTER */}
      <div className="flex gap-3">
        {["Pending", "Resolved"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded font-medium ${
              filter === s
                ? "bg-purple-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="bg-white rounded shadow divide-y">
        {grievances.length === 0 && (
          <p className="p-6 text-gray-500">
            No {filter.toLowerCase()} grievances
          </p>
        )}

        {grievances.map((g) => (
          <div key={g.id} className="p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{g.title}</p>
                <p className="text-sm text-gray-600">
                  {g.students?.roll_number} • {g.students?.department}
                </p>
                <p className="text-xs text-gray-500">
                  {g.category} • Priority: {g.priority}
                </p>
              </div>

              {g.status === "Pending" && (
                <button
                  onClick={() => updateStatus(g.id, "Resolved")}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Mark Resolved
                </button>
              )}
            </div>

            <p className="text-sm">{g.description}</p>

            <p className="text-xs text-gray-400">
              Submitted on {new Date(g.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

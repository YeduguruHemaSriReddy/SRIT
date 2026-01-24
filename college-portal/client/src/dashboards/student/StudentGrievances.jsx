import { useEffect, useState, useCallback } from "react";
import supabase from "../../supabaseClient";
import { useAuth } from "../../context/AuthContext";

export default function StudentGrievances() {
  const { user } = useAuth();

  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGrievances = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("grievances")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setGrievances(data || []);
    } catch (err) {
      console.error("Grievances error:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchGrievances();
  }, [fetchGrievances]);

  if (loading) {
    return <p className="p-10 text-center">Loading grievances...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">📝 My Grievances</h1>

      {grievances.length === 0 ? (
        <p className="text-gray-500">No grievances submitted</p>
      ) : (
        <div className="space-y-4">
          {grievances.map((g) => (
            <div key={g.id} className="bg-white p-6 rounded-xl shadow">
              <p className="font-semibold">{g.category}</p>
              <p className="text-gray-600 text-sm mt-1">{g.message}</p>
              <p className="text-xs text-gray-400 mt-2">
                Status: {g.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

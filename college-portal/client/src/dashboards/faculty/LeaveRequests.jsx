import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function LeaveRequests() {
  const [leaves, setLeaves] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchLeaves = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    const { data: faculty } = await supabase
      .from("faculty")
      .select("id")
      .eq("user_id", user.id)
      .single();

    const { data, error } = await supabase
      .from("faculty_leaves")
      .select("*")
      .eq("faculty_id", faculty.id)
      .order("created_at", { ascending: false });

    if (!error) setLeaves(data);
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const submitLeave = async () => {
    if (!fromDate || !toDate || !reason) {
      alert("All fields are required");
      return;
    }

    if (toDate < fromDate) {
      alert("To date cannot be before From date");
      return;
    }

    setLoading(true);

    const {
      data: { user }
    } = await supabase.auth.getUser();

    const { data: faculty } = await supabase
      .from("faculty")
      .select("id")
      .eq("user_id", user.id)
      .single();

    const { error } = await supabase.from("faculty_leaves").insert([
      {
        faculty_id: faculty.id,
        from_date: fromDate,
        to_date: toDate,
        reason
      }
    ]);

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      setFromDate("");
      setToDate("");
      setReason("");
      fetchLeaves();
    }
  };

  const statusColor = (status) => {
    if (status === "approved") return "text-green-600";
    if (status === "rejected") return "text-red-600";
    return "text-yellow-600";
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Leave Requests</h1>

      {/* Apply Leave */}
      <div className="bg-white p-4 rounded shadow space-y-4">
        <h2 className="font-medium">Apply for Leave</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={submitLeave}
            disabled={loading}
            className="bg-blue-600 text-white rounded px-4 py-2"
          >
            {loading ? "Submitting..." : "Apply"}
          </button>
        </div>

        <textarea
          placeholder="Reason for leave"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Leave History */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-medium mb-4">Leave History</h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">From</th>
              <th className="text-left py-2">To</th>
              <th className="text-left py-2">Reason</th>
              <th className="text-left py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.id} className="border-b">
                <td className="py-2">{leave.from_date}</td>
                <td className="py-2">{leave.to_date}</td>
                <td className="py-2">{leave.reason}</td>
                <td className={`py-2 font-medium ${statusColor(leave.status)}`}>
                  {leave.status}
                </td>
              </tr>
            ))}

            {leaves.length === 0 && (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  No leave requests
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

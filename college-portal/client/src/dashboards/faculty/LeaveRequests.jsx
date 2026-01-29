import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function LeaveRequests() {
  const [leaves, setLeaves] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    const { data: faculty } = await supabase
      .from("faculty")
      .select("id")
      .eq("user_id", user.id)
      .single();

    const { data } = await supabase
      .from("faculty_leaves")
      .select("*")
      .eq("faculty_id", faculty.id)
      .order("created_at", { ascending: false });

    setLeaves(data || []);
  };

  const submitLeave = async () => {
    if (!fromDate || !toDate || !reason) {
      alert("All fields are required");
      return;
    }

    if (toDate < fromDate) {
      alert("End date cannot be before start date");
      return;
    }

    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();

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
        reason,
        status: "pending",
      },
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

  const statusBadge = (status) => {
    if (status === "approved")
      return "bg-green-100 text-green-700";
    if (status === "rejected")
      return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="p-6 max-w-6xl space-y-8">
      {/* ===== PAGE HEADER ===== */}
      <div>
        <h1 className="text-2xl font-semibold">Leave Requests</h1>
        <p className="text-sm text-gray-500">
          Apply for leave and track approval status
        </p>
      </div>

      {/* ===== APPLY LEAVE CARD ===== */}
      <div className="bg-white rounded-lg shadow border p-6 space-y-4">
        <h2 className="text-lg font-medium">
          Apply for Leave
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm text-gray-600">
              From Date
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              To Date
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">
              Reason
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for leave"
              className="border rounded px-3 py-2 w-full"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={submitLeave}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg"
          >
            {loading ? "Submitting..." : "Apply Leave"}
          </button>
        </div>
      </div>

      {/* ===== LEAVE HISTORY ===== */}
      <div className="bg-white rounded-lg shadow border p-6">
        <h2 className="text-lg font-medium mb-4">
          Leave History
        </h2>

        {leaves.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No leave requests submitted yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-2 text-left">
                    From
                  </th>
                  <th className="border px-3 py-2 text-left">
                    To
                  </th>
                  <th className="border px-3 py-2 text-left">
                    Reason
                  </th>
                  <th className="border px-3 py-2 text-center">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {leaves.map((leave) => (
                  <tr
                    key={leave.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="border px-3 py-2">
                      {leave.from_date}
                    </td>
                    <td className="border px-3 py-2">
                      {leave.to_date}
                    </td>
                    <td className="border px-3 py-2">
                      {leave.reason}
                    </td>
                    <td className="border px-3 py-2 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge(
                          leave.status
                        )}`}
                      >
                        {leave.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

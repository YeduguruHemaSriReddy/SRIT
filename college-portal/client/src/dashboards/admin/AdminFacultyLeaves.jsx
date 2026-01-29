import { useEffect, useState, useCallback } from "react";
import supabase from "../../supabaseClient";
import { CheckCircle, XCircle, Clock } from "lucide-react";

export default function AdminFacultyLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [filter, setFilter] = useState("pending");
  const [remarks, setRemarks] = useState({});

  const fetchLeaves = useCallback(async () => {
    const { data, error } = await supabase
      .from("faculty_leaves")
      .select(`
        id,
        from_date,
        to_date,
        reason,
        status,
        admin_remarks,
        faculty (
          name,
          department
        )
      `)
      .eq("status", filter)
      .order("created_at", { ascending: false });

    if (!error) setLeaves(data || []);
  }, [filter]);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  const updateStatus = async (id, status) => {
    const { error } = await supabase
      .from("faculty_leaves")
      .update({
        status,
        admin_remarks: remarks[id] || null,
        updated_at: new Date(),
      })
      .eq("id", id);

    if (!error) fetchLeaves();
  };

  const statusStyle = (status) => {
    if (status === "approved")
      return "bg-green-100 text-green-700";
    if (status === "rejected")
      return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="space-y-8 max-w-7xl">
      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-2xl font-semibold">
          Faculty Leave Requests
        </h1>
        <p className="text-sm text-gray-500">
          Review, approve, or reject faculty leave applications
        </p>
      </div>

      {/* ===== FILTER TABS ===== */}
      <div className="flex gap-3">
        {[
          { key: "pending", label: "Pending", icon: <Clock size={16} /> },
          { key: "approved", label: "Approved", icon: <CheckCircle size={16} /> },
          { key: "rejected", label: "Rejected", icon: <XCircle size={16} /> },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium ${
              filter === t.key
                ? "bg-emerald-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white rounded-lg shadow border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-3 text-left">Faculty</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">From</th>
              <th className="p-3 text-left">To</th>
              <th className="p-3 text-left">Reason</th>
              <th className="p-3 text-left">Remarks</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">
                  {leave.faculty?.name}
                </td>
                <td className="p-3">
                  {leave.faculty?.department}
                </td>
                <td className="p-3">{leave.from_date}</td>
                <td className="p-3">{leave.to_date}</td>
                <td className="p-3 max-w-xs">
                  {leave.reason}
                </td>

                <td className="p-3">
                  {leave.status === "pending" ? (
                    <input
                      type="text"
                      placeholder="Optional remarks"
                      className="border px-2 py-1 rounded w-full"
                      onChange={(e) =>
                        setRemarks((prev) => ({
                          ...prev,
                          [leave.id]: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    <span className="text-gray-600">
                      {leave.admin_remarks || "-"}
                    </span>
                  )}
                </td>

                <td className="p-3">
                  {leave.status === "pending" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          updateStatus(leave.id, "approved")
                        }
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          updateStatus(leave.id, "rejected")
                        }
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(
                        leave.status
                      )}`}
                    >
                      {leave.status.toUpperCase()}
                    </span>
                  )}
                </td>
              </tr>
            ))}

            {leaves.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="p-6 text-center text-gray-500"
                >
                  No {filter} leave requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

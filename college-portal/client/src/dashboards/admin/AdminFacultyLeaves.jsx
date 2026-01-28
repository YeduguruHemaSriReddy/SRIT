import { useEffect, useState, useCallback } from "react";
import supabase from "../../supabaseClient";

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
          id,
          name,
          department
        )
      `)
      .eq("status", filter)
      .order("created_at", { ascending: false });

    if (!error) setLeaves(data);
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

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Faculty Leave Requests</h1>

      {/* FILTER */}
      <div className="flex gap-3">
        {["pending", "approved", "rejected"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded ${
              filter === s
                ? "bg-emerald-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
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
              <tr key={leave.id} className="border-b">
                <td className="p-3">{leave.faculty?.name}</td>
                <td className="p-3">{leave.faculty?.department}</td>
                <td className="p-3">{leave.from_date}</td>
                <td className="p-3">{leave.to_date}</td>
                <td className="p-3">{leave.reason}</td>
                <td className="p-3">
                  {leave.status === "pending" ? (
                    <input
                      type="text"
                      placeholder="Remarks (optional)"
                      className="border p-1 rounded w-full"
                      onChange={(e) =>
                        setRemarks((prev) => ({
                          ...prev,
                          [leave.id]: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    leave.admin_remarks || "-"
                  )}
                </td>
                <td className="p-3 space-x-2">
                  {leave.status === "pending" ? (
                    <>
                      <button
                        onClick={() =>
                          updateStatus(leave.id, "approved")
                        }
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          updateStatus(leave.id, "rejected")
                        }
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="font-medium capitalize">
                      {leave.status}
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
                  No {filter} leave requests
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

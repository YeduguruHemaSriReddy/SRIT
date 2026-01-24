import { useEffect, useState, useCallback } from "react";
import supabase from "../../supabaseClient";
import { useAuth } from "../../context/AuthContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Attendance() {
  const { user } = useAuth();

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAttendance = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("attendance")
        .select("subject, status")
        .eq("student_id", user.id);

      if (error) throw error;
      setRecords(data || []);
    } catch (err) {
      console.error("Attendance error:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  // 🔹 Calculate summary
  let present = 0;
  let absent = 0;

  records.forEach((r) => {
    if (r.status === "present") present++;
    if (r.status === "absent") absent++;
  });

  const total = present + absent;
  const overallPercent = total
    ? Math.round((present / total) * 100)
    : 0;

  const chartData = [
    { name: "Present", value: present },
    { name: "Absent", value: absent },
  ];

  if (loading) {
    return <p className="p-10 text-center">Loading attendance...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">📊 Attendance Overview</h1>

      {/* ================= OVERALL CARD ================= */}
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <p className="text-gray-500">Overall Attendance</p>
        <h2 className="text-4xl font-bold mt-1">
          {overallPercent}%
        </h2>
        {overallPercent < 75 && (
          <p className="text-red-600 font-semibold mt-1">
            ⚠ Attendance below required limit
          </p>
        )}
      </div>

      {/* ================= CHART ================= */}
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <h2 className="font-semibold mb-4">Present vs Absent</h2>

        {total === 0 ? (
          <p className="text-gray-500">
            No attendance data available
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ================= SUMMARY TABLE ================= */}
      {total > 0 && (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4">Status</th>
                <th className="p-4">Count</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-4 font-medium">Present</td>
                <td className="p-4">{present}</td>
              </tr>
              <tr className="border-t">
                <td className="p-4 font-medium">Absent</td>
                <td className="p-4">{absent}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

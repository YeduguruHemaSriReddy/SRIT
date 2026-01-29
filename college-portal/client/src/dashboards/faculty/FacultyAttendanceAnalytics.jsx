import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

export default function FacultyAttendanceAnalytics() {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: faculty } = await supabase
      .from("faculty")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!faculty) return;

    const { data: facultySubjects } = await supabase
      .from("faculty_subjects")
      .select(`subject_id, subjects(id, name)`)
      .eq("faculty_id", faculty.id);

    const result = [];

    for (const fs of facultySubjects || []) {
      const subjectId = fs.subjects.id;
      const subjectName = fs.subjects.name;

      const { count: total } = await supabase
        .from("attendance")
        .select("*", { count: "exact", head: true })
        .eq("subject_id", subjectId);

      if (!total) {
        result.push({ subject: subjectName, percent: 0 });
        continue;
      }

      const { count: present } = await supabase
        .from("attendance")
        .select("*", { count: "exact", head: true })
        .eq("subject_id", subjectId)
        .eq("status", true);

      const percent = Math.round((present / total) * 100);
      result.push({ subject: subjectName, percent });
    }

    setSummary(result);
    setLoading(false);
  };

  const getStatus = (percent) => {
    if (percent < 65)
      return { label: "Critical", color: "text-red-600", bg: "bg-red-100" };
    if (percent < 75)
      return { label: "Warning", color: "text-orange-600", bg: "bg-orange-100" };
    return { label: "Good", color: "text-green-600", bg: "bg-green-100" };
  };

  if (loading) {
    return <p className="p-6">Loading attendance analytics...</p>;
  }

  return (
    <div className="p-6 space-y-8 max-w-6xl">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Attendance Analytics</h1>
        <p className="text-sm text-gray-500">
          Subject-wise attendance performance overview
        </p>
      </div>

      {/* SUMMARY TABLE */}
      <div className="bg-white rounded-lg shadow border p-6">
        <h2 className="text-lg font-medium mb-4">
          Attendance Summary
        </h2>

        {summary.length === 0 ? (
          <p className="text-gray-500">No attendance data available</p>
        ) : (
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2 text-left">Subject</th>
                <th className="border px-3 py-2 text-center">Attendance %</th>
                <th className="border px-3 py-2 text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {summary.map((s, i) => {
                const status = getStatus(s.percent);
                return (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">{s.subject}</td>
                    <td className="border px-3 py-2 text-center font-medium">
                      {s.percent}%
                    </td>
                    <td className="border px-3 py-2 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}
                      >
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* BAR CHART */}
      {summary.length > 0 && (
        <div className="bg-white rounded-lg shadow border p-6">
          <h2 className="text-lg font-medium mb-4">
            Attendance Percentage by Subject
          </h2>

          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={summary}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(v) => `${v}%`} />
                <Bar dataKey="percent" radius={[8, 8, 0, 0]}>
                  {summary.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        entry.percent < 65
                          ? "#dc2626"
                          : entry.percent < 75
                          ? "#f97316"
                          : "#16a34a"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

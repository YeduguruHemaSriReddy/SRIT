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

export default function FacultyMarksAnalytics() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [marksData, setMarksData] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    const { data: faculty } = await supabase
      .from("faculty")
      .select("id")
      .eq("user_id", user.id)
      .single();

    const { data } = await supabase
      .from("faculty_subjects")
      .select("subject_id, subjects(name)")
      .eq("faculty_id", faculty.id);

    setSubjects(data || []);
  };

  const loadMarks = async (subjectId) => {
    setSelectedSubject(subjectId);

    const { data } = await supabase
      .from("marks")
      .select(`total, students(roll_number)`)
      .eq("subject_id", subjectId);

    if (!data || data.length === 0) {
      setMarksData([]);
      setStats(null);
      return;
    }

    const chartData = data.map((m) => ({
      name: m.students.roll_number,
      marks: m.total,
    }));

    const totals = data.map((m) => m.total);
    const avg = totals.reduce((a, b) => a + b, 0) / totals.length;

    setMarksData(chartData);
    setStats({
      average: avg.toFixed(2),
      highest: Math.max(...totals),
      lowest: Math.min(...totals),
    });
  };

  return (
    <div className="p-6 space-y-8 max-w-6xl">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Marks Analytics</h1>
        <p className="text-sm text-gray-500">
          Subject-wise student performance insights
        </p>
      </div>

      {/* SUBJECT SELECT */}
      <div className="max-w-sm">
        <select
          className="w-full border rounded px-3 py-2 bg-white shadow-sm"
          onChange={(e) => loadMarks(e.target.value)}
        >
          <option value="">Select Subject</option>
          {subjects.map((s) => (
            <option key={s.subject_id} value={s.subject_id}>
              {s.subjects.name}
            </option>
          ))}
        </select>
      </div>

      {/* KPI CARDS */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KpiCard
            title="Average Marks"
            value={stats.average}
            color="bg-blue-50 text-blue-600"
          />
          <KpiCard
            title="Highest Marks"
            value={stats.highest}
            color="bg-green-50 text-green-600"
          />
          <KpiCard
            title="Lowest Marks"
            value={stats.lowest}
            color="bg-red-50 text-red-600"
          />
        </div>
      )}

      {/* CHART */}
      {marksData.length > 0 && (
        <div className="bg-white rounded-lg shadow border p-6">
          <h2 className="text-lg font-medium mb-4">
            Marks Distribution
          </h2>

          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marksData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(v) => `${v} marks`} />
                <Bar dataKey="marks" radius={[8, 8, 0, 0]}>
                  {marksData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        entry.marks < 40
                          ? "#dc2626"
                          : entry.marks < 60
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

      {/* EMPTY STATE */}
      {selectedSubject && marksData.length === 0 && (
        <p className="text-gray-500">
          No marks data available for this subject.
        </p>
      )}
    </div>
  );
}

/* ---------- UI COMPONENT ---------- */
function KpiCard({ title, value, color }) {
  return (
    <div className={`p-5 rounded-lg shadow border ${color}`}>
      <p className="text-sm">{title}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}

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
    const {
      data: { user },
    } = await supabase.auth.getUser();

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
      .select(`
        total,
        students ( roll_number )
      `)
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
    const avg =
      totals.reduce((a, b) => a + b, 0) / totals.length;

    setMarksData(chartData);
    setStats({
      average: avg.toFixed(2),
      highest: Math.max(...totals),
      lowest: Math.min(...totals),
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">
        Marks Analytics
      </h1>

      {/* SUBJECT SELECT */}
      <select
        className="border p-2 rounded"
        onChange={(e) => loadMarks(e.target.value)}
      >
        <option value="">Select Subject</option>
        {subjects.map((s) => (
          <option
            key={s.subject_id}
            value={s.subject_id}
          >
            {s.subjects.name}
          </option>
        ))}
      </select>

      {/* STATS */}
      {stats && (
        <div className="flex gap-6">
          <div className="bg-white p-4 rounded shadow">
            Avg Marks: <strong>{stats.average}</strong>
          </div>
          <div className="bg-white p-4 rounded shadow">
            Highest: <strong>{stats.highest}</strong>
          </div>
          <div className="bg-white p-4 rounded shadow">
            Lowest: <strong>{stats.lowest}</strong>
          </div>
        </div>
      )}

      {/* CHART */}
      {marksData.length > 0 && (
        <div className="bg-white p-6 rounded shadow">
          <h2 className="font-semibold mb-3">
            Marks Distribution
          </h2>

          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marksData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="marks" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {selectedSubject && marksData.length === 0 && (
        <p className="text-gray-500">
          No marks data available
        </p>
      )}
    </div>
  );
}

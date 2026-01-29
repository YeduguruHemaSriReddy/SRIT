import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function StudentMarks() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMarks();
  }, []);

  const loadMarks = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    // get student id
    const { data: student } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!student) return;

    // get marks
    const { data } = await supabase
      .from("marks")
      .select(`
        internal_1,
        internal_2,
        assignment,
        total,
        subjects ( name )
      `)
      .eq("student_id", student.id);

    setRows(data || []);
    setLoading(false);
  };

  if (loading) return <p className="p-6">Loading marks...</p>;
  if (rows.length === 0)
    return <p className="p-6">Marks not published yet.</p>;

  // ---------------- CALCULATIONS ----------------
  const SUBJECT_MAX_MARKS = 50;

  const totalSubjects = rows.length;

  const totalMarks = rows.reduce((sum, r) => sum + r.total, 0);
  const averageMarks = totalMarks / totalSubjects;

  const bestScore = Math.max(...rows.map((r) => r.total));

  const percentage = (averageMarks / SUBJECT_MAX_MARKS) * 100;

  let statusLabel = "At Risk";
  let statusColor = "text-red-600";

  if (percentage >= 75) {
    statusLabel = "Good";
    statusColor = "text-green-600";
  } else if (percentage >= 60) {
    statusLabel = "Average";
    statusColor = "text-yellow-600";
  }

  // ------------------------------------------------

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Marks Overview</h1>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Subjects</p>
          <p className="text-xl font-bold">{totalSubjects}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Average Marks</p>
          <p className="text-xl font-bold">
            {averageMarks.toFixed(0)}
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Best Score</p>
          <p className="text-xl font-bold">{bestScore}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Status</p>
          <p className={`text-xl font-bold ${statusColor}`}>
            {statusLabel}
          </p>
          <p className="text-xs text-gray-400">
            {percentage.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* SUBJECT MARKS */}
      <div className="space-y-4">
        {rows.map((m, i) => (
          <div key={i} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between mb-2">
              <h3 className="font-semibold">{m.subjects.name}</h3>
              <span className="font-semibold">{m.total}</span>
            </div>

            <div className="w-full bg-gray-200 rounded h-2 mb-3">
              <div
                className="bg-red-500 h-2 rounded"
                style={{
                  width: `${(m.total / SUBJECT_MAX_MARKS) * 100}%`,
                }}
              />
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <span>Internal 1: {m.internal_1}</span>
              <span>Internal 2: {m.internal_2}</span>
              <span>Assignment: {m.assignment}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

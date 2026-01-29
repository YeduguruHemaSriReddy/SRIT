import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

const MAX_MARKS = 50;

export default function Marks() {
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

    const { data: student } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!student) return;

    const { data: subjectRows } = await supabase
      .from("student_subjects")
      .select(`subject_id, subjects(name)`)
      .eq("student_id", student.id);

    const result = [];

    for (const s of subjectRows || []) {
      const { data: mark } = await supabase
        .from("marks")
        .select("internal_1, internal_2, assignment, total")
        .eq("student_id", student.id)
        .eq("subject_id", s.subject_id)
        .maybeSingle();

      result.push({
        subject: s.subjects.name,
        internal1: mark?.internal_1 ?? 0,
        internal2: mark?.internal_2 ?? 0,
        assignment: mark?.assignment ?? 0,
        total: mark?.total ?? 0,
      });
    }

    setRows(result);
    setLoading(false);
  };

  if (loading)
    return <p className="p-6 text-gray-500">Loading marks...</p>;

  if (!rows.length)
    return <p className="p-6 text-gray-500">No marks available.</p>;

  /* ---------- SUMMARY ---------- */
  const totals = rows.map((r) => r.total);
  const average =
    totals.reduce((a, b) => a + b, 0) / totals.length;

  const best = Math.max(...totals);

  const percentage = (average / MAX_MARKS) * 100;

  let status = "At Risk";
  let statusColor = "text-red-600";

  if (percentage >= 75) {
    status = "Good";
    statusColor = "text-green-600";
  } else if (percentage >= 60) {
    status = "Average";
    statusColor = "text-orange-600";
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">
        Marks Overview
      </h1>

      {/* ===== SUMMARY CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard title="Subjects" value={rows.length} />
        <SummaryCard
          title="Average Marks"
          value={average.toFixed(0)}
        />
        <SummaryCard title="Best Score" value={best} />
        <SummaryCard
          title="Status"
          value={status}
          valueClass={statusColor}
        />
      </div>

      {/* ===== SUBJECT WISE MARKS ===== */}
      <div className="space-y-4">
        {rows.map((r, i) => {
          const percent = (r.total / MAX_MARKS) * 100;

          const barColor =
            percent >= 75
              ? "bg-green-500"
              : percent >= 60
              ? "bg-orange-400"
              : "bg-red-500";

          return (
            <div
              key={i}
              className="bg-white p-4 rounded shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-medium">
                  {r.subject}
                </h2>
                <span className="font-semibold">
                  {r.total}/{MAX_MARKS}
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded h-3 mb-3">
                <div
                  className={`h-3 rounded ${barColor}`}
                  style={{ width: `${percent}%` }}
                />
              </div>

              <div className="grid grid-cols-3 text-sm text-gray-600">
                <span>Internal 1: {r.internal1}</span>
                <span>Internal 2: {r.internal2}</span>
                <span>Assignment: {r.assignment}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- COMPONENT ---------- */
function SummaryCard({ title, value, valueClass = "" }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-sm text-gray-500">
        {title}
      </p>
      <p className={`text-xl font-bold ${valueClass}`}>
        {value}
      </p>
    </div>
  );
}

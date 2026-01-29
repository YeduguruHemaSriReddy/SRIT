import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function Attendance() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
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
      .select(
        `
        subject_id,
        subjects ( name )
      `
      )
      .eq("student_id", student.id);

    const result = [];

    for (const s of subjectRows || []) {
      const subjectId = s.subject_id;

      const { count: total } = await supabase
        .from("attendance")
        .select("*", { count: "exact", head: true })
        .eq("student_id", student.id)
        .eq("subject_id", subjectId);

      const { count: present } = await supabase
        .from("attendance")
        .select("*", { count: "exact", head: true })
        .eq("student_id", student.id)
        .eq("subject_id", subjectId)
        .eq("status", true);

      const absent = (total || 0) - (present || 0);
      const percent =
        total && total > 0
          ? Math.round((present / total) * 100)
          : 0;

      result.push({
        subject: s.subjects.name,
        total: total || 0,
        present: present || 0,
        absent,
        percent,
      });
    }

    setRows(result);
    setLoading(false);
  };

  if (loading)
    return (
      <p className="p-6 text-gray-500">
        Loading attendance...
      </p>
    );

  if (rows.length === 0)
    return (
      <p className="p-6 text-gray-500">
        No attendance records available.
      </p>
    );

  const overall =
    Math.round(
      rows.reduce((a, b) => a + b.percent, 0) /
        rows.length
    ) || 0;

  const totalClasses = rows.reduce(
    (a, b) => a + b.total,
    0
  );
  const totalAbsent = rows.reduce(
    (a, b) => a + b.absent,
    0
  );

  const status =
    overall >= 75
      ? "Safe"
      : overall >= 65
      ? "Warning"
      : "Critical";

  const statusColor =
    overall >= 75
      ? "text-green-600"
      : overall >= 65
      ? "text-orange-600"
      : "text-red-600";

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">
        Attendance Overview
      </h1>

      {/* ===== SUMMARY CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard
          title="Overall Attendance"
          value={`${overall}%`}
        />
        <SummaryCard
          title="Status"
          value={status}
          valueClass={statusColor}
        />
        <SummaryCard
          title="Total Classes"
          value={totalClasses}
        />
        <SummaryCard
          title="Total Absents"
          value={totalAbsent}
        />
      </div>

      {/* ===== SUBJECT WISE ===== */}
      <div className="space-y-4">
        {rows.map((r, i) => {
          const barColor =
            r.percent >= 75
              ? "bg-green-500"
              : r.percent >= 65
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
                  {r.percent}%
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded h-3 mb-3">
                <div
                  className={`h-3 rounded ${barColor}`}
                  style={{ width: `${r.percent}%` }}
                />
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Present: {r.present}</span>
                <span>Absent: {r.absent}</span>
                <span>Total: {r.total}</span>
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
      <p
        className={`text-xl font-bold ${valueClass}`}
      >
        {value}
      </p>
    </div>
  );
}

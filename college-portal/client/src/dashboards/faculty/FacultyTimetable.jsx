import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const PERIOD_LABELS = [
  "9:30 - 10:30",
  "10:30 - 11:30",
  "11:30 - 12:30",
  "Lunch",
  "1:30 - 2:30",
  "2:30 - 3:30",
  "3:30 - 4:30",
];

export default function FacultyTimetable() {
  const [timetable, setTimetable] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTimetable();
  }, []);

  const loadTimetable = async () => {
    setLoading(true);

    /* ---------- AUTH ---------- */
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    /* ---------- FACULTY ---------- */
    const { data: faculty } = await supabase
      .from("faculty")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!faculty) return;

    /* ---------- TIMETABLE ---------- */
    const { data: rows } = await supabase
      .from("faculty_timetable")
      .select("day, period, subjects(name)")
      .eq("faculty_id", faculty.id);

    const map = {};
    rows?.forEach((r) => {
      map[`${r.day}-${r.period}`] = r.subjects?.name;
    });

    setTimetable(map);
    setLoading(false);
  };

  if (loading) return <p className="p-6">Loading timetable...</p>;

  return (
    <div className="bg-white p-6 rounded shadow overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">
        Weekly Timetable
      </h2>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Day</th>
            {PERIOD_LABELS.map((label, i) => (
              <th key={i} className="border p-2">
                {label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {DAYS.map((day) => (
            <tr key={day}>
              <td className="border p-2 font-medium">
                {day}
              </td>

              {[1, 2, 3, "L", 4, 5, 6].map((p, i) => (
                <td key={i} className="border p-2 text-center">
                  {p === "L"
                    ? "🍴 Lunch"
                    : timetable[`${day}-${p}`] || "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-3 text-sm text-gray-500">
        Timetable is managed by Admin and is read-only for faculty.
      </p>
    </div>
  );
}

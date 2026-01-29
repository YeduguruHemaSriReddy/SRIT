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

const PERIODS = [
  { id: 1, label: "9:30 – 10:30" },
  { id: 2, label: "10:30 – 11:30" },
  { id: 3, label: "11:30 – 12:30" },
  { id: "L", label: "Lunch" },
  { id: 4, label: "1:30 – 2:30" },
  { id: 5, label: "2:30 – 3:30" },
  { id: 6, label: "3:30 – 4:30" },
];

export default function FacultyTimetable() {
  const [timetable, setTimetable] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTimetable();
  }, []);

  const loadTimetable = async () => {
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: faculty } = await supabase
      .from("faculty")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!faculty) return;

    const { data } = await supabase
      .from("faculty_timetable")
      .select("day, period, subjects(name)")
      .eq("faculty_id", faculty.id);

    const map = {};
    data?.forEach((r) => {
      map[`${r.day}-${r.period}`] = r.subjects?.name;
    });

    setTimetable(map);
    setLoading(false);
  };

  if (loading) {
    return <p className="p-6">Loading timetable...</p>;
  }

  return (
    <div className="p-6 max-w-6xl">
      {/* HEADER */}
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">
          Weekly Timetable
        </h1>
        <p className="text-sm text-gray-500">
          Read-only timetable assigned by administration
        </p>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-lg shadow border overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="border px-3 py-2 text-left">
                Day
              </th>
              {PERIODS.map((p) => (
                <th
                  key={p.id}
                  className="border px-3 py-2 text-center"
                >
                  {p.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {DAYS.map((day) => (
              <tr
                key={day}
                className="hover:bg-gray-50"
              >
                <td className="border px-3 py-2 font-medium">
                  {day}
                </td>

                {PERIODS.map((p) => (
                  <td
                    key={p.id}
                    className="border px-2 py-2 text-center"
                  >
                    {p.id === "L" ? (
                      <span className="inline-flex items-center gap-1 text-gray-600">
                        🍴 Lunch
                      </span>
                    ) : timetable[`${day}-${p.id}`] ? (
                      <span className="inline-block px-2 py-1 rounded bg-emerald-100 text-emerald-700 font-medium">
                        {timetable[`${day}-${p.id}`]}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOT NOTE */}
      <p className="mt-3 text-sm text-gray-500">
        Timetable is maintained by Admin and cannot be modified by faculty.
      </p>
    </div>
  );
}

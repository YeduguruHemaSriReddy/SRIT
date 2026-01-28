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

const PERIOD_TIMES = {
  1: "9:30 - 10:30",
  2: "10:30 - 11:30",
  3: "11:30 - 12:30",
  4: "1:30 - 2:30",
  5: "2:30 - 3:30",
  6: "3:30 - 4:30",
};

export default function StudentTimetable() {
  const [timetable, setTimetable] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTimetable();
  }, []);

  const loadTimetable = async () => {
    setLoading(true);

    /* ---------- AUTH ---------- */
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    /* ---------- STUDENT ---------- */
    const { data: student } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!student) {
      setLoading(false);
      return;
    }

    /* ---------- STUDENT SUBJECTS ---------- */
    const { data: subs } = await supabase
      .from("student_subjects")
      .select("subject_id")
      .eq("student_id", student.id);

    const subjectIds = subs?.map((s) => s.subject_id) || [];

    if (subjectIds.length === 0) {
      setLoading(false);
      return;
    }

    /* ---------- TIMETABLE ---------- */
    const { data: rows } = await supabase
      .from("faculty_timetable")
      .select("day, period, subjects(name)")
      .in("subject_id", subjectIds);

    const map = {};
    rows?.forEach((r) => {
      map[`${r.day}-${r.period}`] = r.subjects?.name;
    });

    setTimetable(map);
    setLoading(false);
  };

  if (loading) {
    return <p className="p-6">Loading timetable...</p>;
  }

  return (
    <div className="bg-white p-6 rounded shadow overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">
        Weekly Timetable
      </h2>

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Day</th>

            {[1, 2, 3].map((p) => (
              <th key={p} className="border p-2">
                Period {p}
                <br />
                <span className="text-xs text-gray-500">
                  {PERIOD_TIMES[p]}
                </span>
              </th>
            ))}

            <th className="border p-2 bg-yellow-100">
              Lunch
              <br />
              12:30 – 1:30
            </th>

            {[4, 5, 6].map((p) => (
              <th key={p} className="border p-2">
                Period {p}
                <br />
                <span className="text-xs text-gray-500">
                  {PERIOD_TIMES[p]}
                </span>
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

              {[1, 2, 3].map((p) => (
                <Cell
                  key={p}
                  value={timetable[`${day}-${p}`]}
                />
              ))}

              <td className="border bg-yellow-50 text-center">
                🍴
              </td>

              {[4, 5, 6].map((p) => (
                <Cell
                  key={p}
                  value={timetable[`${day}-${p}`]}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- CELL ---------- */
function Cell({ value }) {
  return (
    <td className="border p-2 text-center">
      {value ? value : (
        <span className="text-gray-400">Free</span>
      )}
    </td>
  );
}

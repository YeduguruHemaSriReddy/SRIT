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
  1: "9:30 – 10:30",
  2: "10:30 – 11:30",
  3: "11:30 – 12:30",
  4: "1:30 – 2:30",
  5: "2:30 – 3:30",
  6: "3:30 – 4:30",
};

export default function StudentTimetable() {
  const [timetable, setTimetable] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTimetable();
  }, []);

  const loadTimetable = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    const { data: student } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!student) {
      setLoading(false);
      return;
    }

    const { data: subs } = await supabase
      .from("student_subjects")
      .select("subject_id")
      .eq("student_id", student.id);

    const subjectIds = subs?.map((s) => s.subject_id) || [];
    if (subjectIds.length === 0) {
      setLoading(false);
      return;
    }

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
    return <p className="p-6 text-gray-500">Loading timetable...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Weekly Timetable
      </h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 border font-medium text-left">
                Day
              </th>

              {[1, 2, 3].map((p) => (
                <PeriodHeader key={p} p={p} />
              ))}

              <th className="p-3 border bg-yellow-100 text-center font-medium">
                🍴 Lunch
                <div className="text-xs text-gray-600">
                  12:30 – 1:30
                </div>
              </th>

              {[4, 5, 6].map((p) => (
                <PeriodHeader key={p} p={p} />
              ))}
            </tr>
          </thead>

          <tbody>
            {DAYS.map((day) => (
              <tr key={day} className="hover:bg-gray-50">
                <td className="p-3 border font-medium">
                  {day}
                </td>

                {[1, 2, 3].map((p) => (
                  <Cell
                    key={p}
                    value={timetable[`${day}-${p}`]}
                  />
                ))}

                <td className="border bg-yellow-50 text-center">
                  —
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
    </div>
  );
}

/* ---------- PERIOD HEADER ---------- */
function PeriodHeader({ p }) {
  return (
    <th className="p-3 border text-center font-medium">
      Period {p}
      <div className="text-xs text-gray-500">
        {PERIOD_TIMES[p]}
      </div>
    </th>
  );
}

/* ---------- CELL ---------- */
function Cell({ value }) {
  return (
    <td className="p-3 border text-center">
      {value ? (
        <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
          {value}
        </span>
      ) : (
        <span className="text-gray-400 italic">
          Free
        </span>
      )}
    </td>
  );
}

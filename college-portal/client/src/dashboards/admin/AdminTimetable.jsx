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

const PERIODS = [1, 2, 3, 4, 5, 6];

export default function AdminTimetable() {
  const [faculty, setFaculty] = useState([]);
  const [facultySubjects, setFacultySubjects] = useState({});
  const [table, setTable] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  /* ================= LOAD DATA ================= */
  const loadData = async () => {
    setLoading(true);

    const [
      { data: facultyData },
      { data: facultySubjectRows },
      { data: ttRows },
    ] = await Promise.all([
      supabase.from("faculty").select("id, name").order("name"),

      supabase
        .from("faculty_subjects")
        .select("faculty_id, subjects(id, name)"),

      supabase
        .from("faculty_timetable")
        .select("faculty_id, day, period, subject_id"),
    ]);

    /* -------- FACULTY → SUBJECT MAP -------- */
    const subjectMap = {};
    facultySubjectRows?.forEach((row) => {
      if (!subjectMap[row.faculty_id]) {
        subjectMap[row.faculty_id] = [];
      }
      if (row.subjects) {
        subjectMap[row.faculty_id].push(row.subjects);
      }
    });

    /* -------- TIMETABLE MAP -------- */
    const timetableMap = {};
    ttRows?.forEach((r) => {
      timetableMap[`${r.faculty_id}-${r.day}-${r.period}`] = r.subject_id;
    });

    setFaculty(facultyData || []);
    setFacultySubjects(subjectMap);
    setTable(timetableMap);
    setLoading(false);
  };

  /* ================= UPDATE CELL ================= */
  const updateCell = async (facultyId, day, period, subjectId) => {
    if (!subjectId) return;

    // Faculty time clash
    const { data: clash } = await supabase
      .from("faculty_timetable")
      .select("id")
      .eq("faculty_id", facultyId)
      .eq("day", day)
      .eq("period", period)
      .maybeSingle();

    if (clash) {
      alert("❌ Faculty already has a class in this period.");
      return;
    }

    // Same subject twice in a day
    const { data: duplicate } = await supabase
      .from("faculty_timetable")
      .select("id")
      .eq("faculty_id", facultyId)
      .eq("day", day)
      .eq("subject_id", subjectId)
      .maybeSingle();

    if (duplicate) {
      alert("❌ Subject already assigned on this day.");
      return;
    }

    setTable((prev) => ({
      ...prev,
      [`${facultyId}-${day}-${period}`]: subjectId,
    }));

    await supabase.from("faculty_timetable").upsert(
      {
        faculty_id: facultyId,
        day,
        period,
        subject_id: subjectId,
      },
      { onConflict: "faculty_id,day,period" }
    );
  };

  /* ================= STATES ================= */
  if (loading) {
    return <p className="p-6 text-gray-500">Loading timetable...</p>;
  }

  if (faculty.length === 0) {
    return (
      <div className="p-6 text-red-600">
        ⚠ No faculty found. Please add faculty first.
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="p-6 space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">
          Admin Timetable Generator
        </h1>
        <p className="text-sm text-gray-500">
          Assign subjects to faculty periods (auto-saved)
        </p>
      </div>

      {faculty.map((f) => {
        const subjectsForFaculty = facultySubjects[f.id] || [];

        return (
          <div
            key={f.id}
            className="bg-white rounded-lg shadow border"
          >
            {/* FACULTY HEADER */}
            <div className="px-4 py-3 border-b bg-gray-50 flex justify-between items-center">
              <h2 className="font-semibold text-gray-800">
                👨‍🏫 {f.name}
              </h2>
              <span className="text-xs text-green-600">
                Auto saved
              </span>
            </div>

            {/* BODY */}
            <div className="p-4">
              {subjectsForFaculty.length === 0 ? (
                <p className="text-sm text-red-500">
                  No subjects mapped to this faculty.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-3 py-2">
                          Day
                        </th>
                        {PERIODS.map((p) => (
                          <th
                            key={p}
                            className="border px-3 py-2 text-center"
                          >
                            P{p}
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
                              key={p}
                              className="border px-1 py-1"
                            >
                              <select
                                className="w-full border rounded text-xs px-2 py-1"
                                value={
                                  table[
                                    `${f.id}-${day}-${p}`
                                  ] || ""
                                }
                                onChange={(e) =>
                                  updateCell(
                                    f.id,
                                    day,
                                    p,
                                    e.target.value
                                  )
                                }
                              >
                                <option value="">
                                  -- Free --
                                </option>

                                {subjectsForFaculty.map(
                                  (s) => (
                                    <option
                                      key={s.id}
                                      value={s.id}
                                    >
                                      {s.name}
                                    </option>
                                  )
                                )}
                              </select>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

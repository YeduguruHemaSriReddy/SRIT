import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function AdminExamControl() {
  const [windowOpen, setWindowOpen] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  const semester = 1;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // exam window
    const { data: win } = await supabase
      .from("exam_windows")
      .select("*")
      .eq("semester", semester)
      .maybeSingle();

    setWindowOpen(win?.is_open || false);

    // registrations
    const { data } = await supabase
      .from("exam_registrations")
      .select(`
        id,
        semester,
        students ( roll_number, department ),
        subjects ( name )
      `)
      .eq("semester", semester);

    setRegistrations(data || []);
  };

  const toggleWindow = async () => {
    await supabase.from("exam_windows").upsert({
      semester,
      is_open: !windowOpen,
    });

    loadData();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">
        Exam Control Panel
      </h1>

      {/* Window Control */}
      <div className="bg-white p-4 rounded shadow flex justify-between items-center">
        <span className="font-medium">
          Exam Registration Status:
          <span
            className={`ml-2 ${
              windowOpen
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {windowOpen ? "OPEN" : "CLOSED"}
          </span>
        </span>

        <button
          onClick={toggleWindow}
          className="bg-emerald-600 text-white px-4 py-2 rounded"
        >
          {windowOpen ? "Close Registration" : "Open Registration"}
        </button>
      </div>

      {/* Registration List */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-3">
          Registered Students
        </h2>

        {registrations.length === 0 ? (
          <p className="text-gray-500">
            No registrations yet
          </p>
        ) : (
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">
                  Roll No
                </th>
                <th className="border p-2 text-left">
                  Department
                </th>
                <th className="border p-2 text-left">
                  Subject
                </th>
              </tr>
            </thead>

            <tbody>
              {registrations.map((r) => (
                <tr key={r.id}>
                  <td className="border p-2">
                    {r.students.roll_number}
                  </td>
                  <td className="border p-2">
                    {r.students.department}
                  </td>
                  <td className="border p-2">
                    {r.subjects.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import { Lock, Unlock } from "lucide-react";

export default function AdminExamControl() {
  const [windowOpen, setWindowOpen] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  const semester = 1;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // Exam window status
    const { data: win } = await supabase
      .from("exam_windows")
      .select("*")
      .eq("semester", semester)
      .maybeSingle();

    setWindowOpen(win?.is_open || false);

    // Exam registrations
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
    <div className="space-y-8 max-w-7xl">
      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-2xl font-semibold">
          Exam Control Panel
        </h1>
        <p className="text-sm text-gray-500">
          Manage semester exam registrations and monitor enrolled students
        </p>
      </div>

      {/* ===== STATUS CARD ===== */}
      <div className="bg-white rounded-lg shadow border p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div
            className={`p-3 rounded-full ${
              windowOpen ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {windowOpen ? (
              <Unlock className="text-green-600" />
            ) : (
              <Lock className="text-red-600" />
            )}
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Exam Registration Status
            </p>
            <p
              className={`text-lg font-semibold ${
                windowOpen
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {windowOpen ? "OPEN" : "CLOSED"}
            </p>
          </div>
        </div>

        <button
          onClick={toggleWindow}
          className={`px-5 py-2 rounded font-medium text-white ${
            windowOpen
              ? "bg-red-600 hover:bg-red-700"
              : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          {windowOpen
            ? "Close Registration"
            : "Open Registration"}
        </button>
      </div>

      {/* ===== REGISTRATION LIST ===== */}
      <div className="bg-white rounded-lg shadow border p-6">
        <h2 className="text-lg font-semibold mb-4">
          Registered Students
        </h2>

        {registrations.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No exam registrations yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border px-4 py-2 text-left">
                    Roll Number
                  </th>
                  <th className="border px-4 py-2 text-left">
                    Department
                  </th>
                  <th className="border px-4 py-2 text-left">
                    Subject
                  </th>
                </tr>
              </thead>

              <tbody>
                {registrations.map((r) => (
                  <tr
                    key={r.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="border px-4 py-2 font-medium">
                      {r.students.roll_number}
                    </td>
                    <td className="border px-4 py-2">
                      {r.students.department}
                    </td>
                    <td className="border px-4 py-2">
                      {r.subjects.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

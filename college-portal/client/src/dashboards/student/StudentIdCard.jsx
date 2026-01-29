import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function StudentIDCard() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("students")
      .select("roll_number, department, year, phone, name, photo_url")
      .eq("user_id", user.id)
      .single();

    // 🎓 Academic year logic
    const startYear =
      data.year === 3 ? 2023 : data.year === 2 ? 2024 : 2022;
    const academicRange = `${startYear}-${startYear + 4}`;

    setStudent({
      ...data,
      email: user.email,
      academicRange,
    });

    setLoading(false);
  };

  if (loading) return <p className="p-6">Loading ID Card…</p>;
  if (!student) return <p className="p-6 text-red-600">Profile not found</p>;

  const barcodeValue = student.roll_number;

  return (
    <div className="flex flex-col items-center p-10">
      {/* ================= ID CARD ================= */}
      <div className="relative w-[360px] h-[520px] perspective">
        <div
          className={`w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
            showBack ? "rotate-y-180" : ""
          }`}
        >
          {/* ---------- FRONT ---------- */}
          <div className="absolute inset-0 bg-white rounded-xl shadow-xl border backface-hidden">
            {/* Header */}
            <div className="bg-emerald-600 text-white text-center p-3 rounded-t-xl">
              <h2 className="text-sm font-bold">
                SRINIVASA RAMANUJAN INSTITUTE OF TECHNOLOGY
              </h2>
              <p className="text-xs">AUTONOMOUS</p>
            </div>

            <div className="flex flex-col items-center p-5 gap-3">
              {/* Photo */}
              <div className="w-28 h-28 rounded-full border bg-gray-100 overflow-hidden">
                {student.photo_url ? (
                  <img
                    src={student.photo_url}
                    alt="student"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-xs text-gray-400">
                    No Photo
                  </div>
                )}
              </div>

              {/* Name & Roll */}
              <div className="text-center">
                <p className="font-semibold text-sm">{student.name}</p>
                <p className="text-xs text-gray-600">
                  Roll No: {student.roll_number}
                </p>
              </div>

              {/* BARCODE */}
              <img
                src={`https://bwipjs-api.metafloor.com/?bcid=code128&text=${barcodeValue}&scale=2&height=10`}
                alt="Barcode"
                className="mt-2"
              />

              <button
                onClick={() => setShowBack(true)}
                className="mt-3 text-emerald-600 text-xs underline"
              >
                View Details →
              </button>
            </div>
          </div>

          {/* ---------- BACK ---------- */}
          <div className="absolute inset-0 bg-white rounded-xl shadow-xl border rotate-y-180 backface-hidden">
            <div className="bg-emerald-600 h-8 rounded-t-xl"></div>

            <div className="p-5 text-sm space-y-2">
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Roll No:</strong> {student.roll_number}</p>
              <p><strong>Department:</strong> {student.department}</p>
              <p><strong>Academic Year:</strong> {student.academicRange}</p>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Phone:</strong> {student.phone || "-"}</p>

              <div className="text-xs text-gray-500 border-t mt-3 pt-2">
                <p>This card is the property of SRIT.</p>
                <p>If found, please return to college office.</p>
                <p className="mt-2 text-right font-medium">
                  Authorized Signatory
                </p>
              </div>

              <div className="text-center pt-3">
                <button
                  onClick={() => setShowBack(false)}
                  className="text-emerald-600 text-xs underline"
                >
                  ← Back to Front
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRINT */}
      <button
        onClick={() => window.print()}
        className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg"
      >
        Download / Print ID
      </button>

      {/* CSS */}
      <style>{`
        .perspective { perspective: 1200px; }
        .transform-style-preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}

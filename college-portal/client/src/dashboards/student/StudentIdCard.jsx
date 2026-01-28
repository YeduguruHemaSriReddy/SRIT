import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function StudentIDCard() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("students")
      .select("roll_number, department, year, phone")
      .eq("user_id", user.id)
      .single();

    setStudent({
      ...data,
      email: user.email,
      name: user.email.split("@")[0], // placeholder name
    });

    setLoading(false);
  };

  if (loading) return <p className="p-6">Loading ID card...</p>;

  if (!student)
    return (
      <p className="p-6 text-red-600">
        Student profile not found
      </p>
    );

  return (
    <div className="flex justify-center p-6">
      <div className="w-96 bg-white border rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-600 text-white p-4 text-center">
          <h2 className="text-lg font-semibold">
            Autonomous College
          </h2>
          <p className="text-sm">Student ID Card</p>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3">
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-500 text-sm">
                Photo
              </span>
            </div>
          </div>

          <p>
            <strong>Name:</strong> {student.name}
          </p>
          <p>
            <strong>Roll No:</strong>{" "}
            {student.roll_number}
          </p>
          <p>
            <strong>Department:</strong>{" "}
            {student.department}
          </p>
          <p>
            <strong>Year:</strong> {student.year}
          </p>
          <p>
            <strong>Email:</strong> {student.email}
          </p>
          <p>
            <strong>Phone:</strong> {student.phone}
          </p>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-3 text-center">
          <button
            onClick={() => window.print()}
            className="bg-emerald-600 text-white px-4 py-2 rounded"
          >
            Download / Print
          </button>
        </div>
      </div>
    </div>
  );
}

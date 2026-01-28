import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function StudentFees() {
  const [fee, setFee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadFees();
  }, []);

  const loadFees = async () => {
    setLoading(true);
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("User not logged in");
      setLoading(false);
      return;
    }

    // 1️⃣ Get student
    const { data: student } = await supabase
      .from("students")
      .select("id, department, year")
      .eq("user_id", user.id)
      .single();

    if (!student) {
      setMessage("Student profile not found");
      setLoading(false);
      return;
    }

    // 2️⃣ Get fee structure
    const { data: feeStructure } = await supabase
      .from("fees")
      .select("*")
      .eq("department", student.department)
      .eq("year", student.year)
      .eq("semester", 1)
      .maybeSingle();

    if (!feeStructure) {
      setMessage("Fee structure not defined by admin");
      setLoading(false);
      return;
    }

    // 3️⃣ Get student fee status (may or may not exist)
    const { data: studentFee } = await supabase
      .from("student_fees")
      .select("*")
      .eq("student_id", student.id)
      .eq("fee_id", feeStructure.id)
      .maybeSingle();

    setFee({
      ...feeStructure,
      status: studentFee?.status || "unpaid",
    });

    setLoading(false);
  };

  const payNow = async () => {
    if (!fee) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: student } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", user.id)
      .single();

    await supabase.from("student_fees").upsert({
      student_id: student.id,
      fee_id: fee.id,
      status: "paid",
      paid_at: new Date(),
    });

    loadFees();
  };

  if (loading) return <p className="p-6">Loading fees...</p>;

  if (message)
    return (
      <div className="p-6 bg-yellow-50 border border-yellow-300 rounded">
        {message}
      </div>
    );

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Fee Details</h2>

      <p>Department: {fee.department}</p>
      <p>Year: {fee.year}</p>
      <p>Semester: {fee.semester}</p>
      <p className="font-semibold text-lg mt-2">
        Amount: ₹{fee.amount}
      </p>

      <p className="mt-2">
        Status:{" "}
        <span
          className={`font-medium ${
            fee.status === "paid"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {fee.status.toUpperCase()}
        </span>
      </p>

      {fee.status !== "paid" && (
        <button
          onClick={payNow}
          className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded"
        >
          Pay Now
        </button>
      )}
    </div>
  );
}

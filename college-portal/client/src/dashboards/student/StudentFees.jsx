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

    /* ---------- AUTH ---------- */
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("User not logged in");
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
      setMessage("Student profile not found");
      setLoading(false);
      return;
    }

    /* ---------- GET LATEST FEE STRUCTURE ---------- */
    const { data: feeStructure } = await supabase
      .from("fee_structure")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!feeStructure) {
      setMessage("Fee structure not defined by admin");
      setLoading(false);
      return;
    }

    /* ---------- STUDENT FEE STATUS ---------- */
    const { data: studentFee } = await supabase
      .from("student_fees")
      .select("status, paid_on")
      .eq("student_id", student.id)
      .eq("fee_id", feeStructure.id)
      .maybeSingle();

    setFee({
      ...feeStructure,
      status: studentFee?.status || "unpaid",
      paid_on: studentFee?.paid_on || null,
    });

    setLoading(false);
  };

  /* ---------- PAY NOW (SIMULATION) ---------- */
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
      paid_on: new Date(),
    });

    loadFees();
  };

  /* ---------- UI STATES ---------- */
  if (loading)
    return (
      <p className="p-6 text-gray-500">
        Loading fee details...
      </p>
    );

  if (message)
    return (
      <div className="p-6 bg-yellow-50 border border-yellow-300 rounded">
        {message}
      </div>
    );

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="bg-white rounded shadow p-6 space-y-4">
        <h2 className="text-2xl font-semibold">
          Fee Details
        </h2>

        <div className="space-y-1 text-sm text-gray-700">
          <p>
            <b>Fee Name:</b> {fee.name}
          </p>

          {fee.due_date && (
            <p>
              <b>Due Date:</b>{" "}
              {new Date(fee.due_date).toLocaleDateString()}
            </p>
          )}
        </div>

        <p className="text-3xl font-bold text-gray-900">
          ₹ {fee.amount}
        </p>

        <p>
          Status:{" "}
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              fee.status === "paid"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {fee.status.toUpperCase()}
          </span>
        </p>

        {fee.status === "paid" && fee.paid_on && (
          <p className="text-sm text-green-600">
            Paid on{" "}
            {new Date(fee.paid_on).toLocaleDateString()}
          </p>
        )}

        {fee.status !== "paid" && (
          <button
            onClick={payNow}
            className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded"
          >
            Pay Now
          </button>
        )}
      </div>
    </div>
  );
}

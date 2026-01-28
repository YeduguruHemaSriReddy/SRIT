import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function AdminFeeManagement() {
  const [students, setStudents] = useState([]);
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const { data } = await supabase
      .from("students")
      .select("id, roll_number, department, year");

    setStudents(data || []);
  };

  const createFee = async () => {
    if (!department || !year || !amount) {
      alert("All fields required");
      return;
    }

    await supabase.from("fees").insert({
      department,
      year,
      semester: 1,
      amount,
    });

    setDepartment("");
    setYear("");
    setAmount("");
    alert("Fee structure created");
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold">
        Fee Management
      </h1>

      {/* CREATE FEE */}
      <div className="bg-white p-4 rounded shadow space-y-3 max-w-md">
        <h2 className="font-semibold">Create Fee</h2>

        <input
          placeholder="Department (e.g. CSE)"
          className="border p-2 rounded w-full"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <input
          placeholder="Year (e.g. 3)"
          type="number"
          className="border p-2 rounded w-full"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <input
          placeholder="Amount"
          type="number"
          className="border p-2 rounded w-full"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          onClick={createFee}
          className="bg-emerald-600 text-white px-4 py-2 rounded"
        >
          Save Fee
        </button>
      </div>

      {/* STUDENT PAYMENT STATUS (BASIC VIEW) */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-3">
          Student Fee Status
        </h2>

        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Roll No</th>
              <th className="border p-2">Department</th>
              <th className="border p-2">Year</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td className="border p-2">
                  {s.roll_number}
                </td>
                <td className="border p-2">
                  {s.department}
                </td>
                <td className="border p-2">
                  {s.year}
                </td>
                <td className="border p-2 text-center">
                  <span className="text-red-600">
                    Unpaid
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

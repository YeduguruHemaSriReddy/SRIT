import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import { IndianRupee, PlusCircle } from "lucide-react";

export default function AdminFeeManagement() {
  const [fees, setFees] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFees();
  }, []);

  const loadFees = async () => {
    const { data } = await supabase
      .from("fee_structure")
      .select("*")
      .order("created_at", { ascending: false });

    setFees(data || []);
  };

  const addFee = async () => {
    if (!name || !amount) {
      alert("Fee name and amount are required");
      return;
    }

    setLoading(true);

    await supabase.from("fee_structure").insert({
      name,
      amount,
      due_date: dueDate || null,
    });

    setName("");
    setAmount("");
    setDueDate("");
    setLoading(false);
    loadFees();
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-2xl font-semibold">Fee Management</h1>
        <p className="text-sm text-gray-500">
          Define and manage college fee structure
        </p>
      </div>

      {/* ===== ADD FEE CARD ===== */}
      <div className="bg-white rounded-lg shadow border p-6">
        <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
          <PlusCircle size={18} />
          Add New Fee
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Fee Name (e.g. Tuition Fee)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded px-3 py-2"
          />

          <div className="relative">
            <IndianRupee
              size={16}
              className="absolute left-3 top-3 text-gray-400"
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border rounded pl-9 px-3 py-2 w-full"
            />
          </div>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>

        <div className="mt-4">
          <button
            onClick={addFee}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded font-medium"
          >
            {loading ? "Adding Fee..." : "Add Fee"}
          </button>
        </div>
      </div>

      {/* ===== FEE STRUCTURE TABLE ===== */}
      <div className="bg-white rounded-lg shadow border p-6">
        <h2 className="text-lg font-medium mb-4">
          Fee Structure
        </h2>

        {fees.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No fee records added yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border px-4 py-2 text-left">
                    Fee Name
                  </th>
                  <th className="border px-4 py-2 text-left">
                    Amount
                  </th>
                  <th className="border px-4 py-2 text-left">
                    Due Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {fees.map((f) => (
                  <tr
                    key={f.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="border px-4 py-2 font-medium">
                      {f.name}
                    </td>
                    <td className="border px-4 py-2">
                      ₹{Number(f.amount).toLocaleString()}
                    </td>
                    <td className="border px-4 py-2">
                      {f.due_date || "—"}
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

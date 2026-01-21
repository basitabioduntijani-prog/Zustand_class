import { useState } from "react";
import { useExpenseStore } from "../store/useExpenseStore";

export default function ExpenseTracker() {
  const {
    expenses,
    totalBudget,
    addExpense,
    removeExpense,
    setBudget,
    getTotalSpent,
    getRemainingBudget,
  } = useExpenseStore();

  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "",
  });

  const handleAddExpense = () => {
    if (!form.description || !form.amount) return;

    addExpense({
      id: Date.now(),
      description: form.description,
      amount: Number(form.amount),
      category: form.category || "General",
      date: new Date().toISOString().split("T")[0],
    });

    setForm({ description: "", amount: "", category: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">

        {/* Header */}
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">
            Naira Expense Tracker
          </h1>
          <span className="text-sm text-gray-500">Monthly Overview</span>
        </header>

        {/* Summary */}
        <div className="grid md:grid-cols-3 gap-6">
          <SummaryCard title="Budget" value={totalBudget} />
          <SummaryCard title="Spent" value={getTotalSpent()} />
          <SummaryCard
            title="Remaining"
            value={getRemainingBudget()}
            danger={getRemainingBudget() < 0}
          />
        </div>

        {/* Budget Input */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <label className="text-sm font-medium text-gray-700">
            Monthly Budget (₦)
          </label>
          <input
            type="number"
            value={totalBudget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="mt-2 w-full rounded-lg border-gray-300 focus:ring-black focus:border-black"
          />
        </div>

        {/* Add Expense */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold">Add Expense</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              placeholder="Description"
              className="rounded-lg border-gray-300"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Amount"
              className="rounded-lg border-gray-300"
              value={form.amount}
              onChange={(e) =>
                setForm({ ...form, amount: e.target.value })
              }
            />
            <input
              placeholder="Category"
              className="rounded-lg border-gray-300"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            />
          </div>

          <button
            onClick={handleAddExpense}
            className="bg-black text-white px-5 py-2.5 rounded-lg text-sm"
          >
            Add Expense
          </button>
        </div>

        {/* Expense List */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Expenses</h2>

          {expenses.length === 0 && (
            <p className="text-sm text-gray-500">No expenses recorded</p>
          )}

          <ul className="divide-y">
            {expenses.map((e) => (
              <li key={e.id} className="flex justify-between py-3">
                <div>
                  <p className="font-medium">{e.description}</p>
                  <p className="text-sm text-gray-500">
                    {e.category} • {e.date}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">
                    ₦{e.amount.toLocaleString()}
                  </span>
                  <button
                    onClick={() => removeExpense(e.id)}
                    className="text-sm text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

function SummaryCard({ title, value, danger }) {
  return (
    <div
      className={`p-6 rounded-xl border ${
        danger ? "border-red-400" : "border-gray-200"
      } bg-white`}
    >
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold mt-2">
        ₦{value.toLocaleString()}
      </p>
    </div>
  );
}

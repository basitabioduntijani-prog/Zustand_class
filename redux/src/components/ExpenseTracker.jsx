import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addExpense,
  removeExpense,
  setBudget,
  selectExpenses,
  selectBudget,
  selectTotalSpent,
  selectRemainingBudget,
} from "../store/expenseSlice";

export default function ExpenseTracker() {
  const dispatch = useDispatch();

  const expenses = useSelector(selectExpenses);
  const budget = useSelector(selectBudget);
  const totalSpent = useSelector(selectTotalSpent);
  const remaining = useSelector(selectRemainingBudget);

  const [form, setForm] = useState({
    description: "",
    amount: "",
  });

  const handleAddExpense = () => {
    if (!form.description || !form.amount) return;

    dispatch(
      addExpense({
        id: Date.now(),
        description: form.description,
        amount: Number(form.amount),
        date: new Date().toISOString().split("T")[0],
      })
    );

    setForm({ description: "", amount: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-2xl font-semibold">
          Redux Expense Tracker
        </h1>

        {/* SUMMARY */}
        <div className="grid md:grid-cols-3 gap-6">
          <SummaryCard title="Budget" value={budget} />
          <SummaryCard title="Spent" value={totalSpent} />
          <SummaryCard
            title="Remaining"
            value={remaining}
            danger={remaining < 0}
          />
        </div>

        {/* BUDGET */}
        <div className="bg-white border rounded-xl p-6">
          <label className="text-sm font-medium">
            Monthly Budget (₦)
          </label>
          <input
            type="number"
            value={budget}
            onChange={(e) =>
              dispatch(setBudget(Number(e.target.value)))
            }
            className="mt-2 w-full rounded-lg border-gray-300"
          />
        </div>

        {/* ADD EXPENSE */}
        <div className="bg-white border rounded-xl p-6 space-y-4">
          <h2 className="font-semibold">Add Expense</h2>

          <input
            placeholder="Description"
            className="w-full rounded-lg border-gray-300"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Amount"
            className="w-full rounded-lg border-gray-300"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
          />

          <button
            onClick={handleAddExpense}
            className="bg-black text-white px-4 py-2 rounded-lg text-sm"
          >
            Add Expense
          </button>
        </div>

        {/* EXPENSE LIST */}
        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold mb-4">Expenses</h2>

          <ul className="divide-y">
            {expenses.map((expense) => (
              <li
                key={expense.id}
                className="flex justify-between py-3"
              >
                <span>{expense.description}</span>

                <div className="flex items-center gap-4">
                  <span>
                    ₦{expense.amount.toLocaleString()}
                  </span>
                  <button
                    onClick={() =>
                      dispatch(removeExpense(expense.id))
                    }
                    className="text-red-500 text-sm"
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
      className={`p-6 rounded-xl border bg-white ${
        danger ? "border-red-400" : "border-gray-200"
      }`}
    >
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold mt-2">
        ₦{value.toLocaleString()}
      </p>
    </div>
  );
}

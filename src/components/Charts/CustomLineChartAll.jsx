import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const CustomLineChartAll = ({ data }) => {
  // 🛠 Custom Tooltip to show both income and expense
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const income = payload.find(p => p.dataKey === "income")?.value ?? 0;
      const expense = payload.find(p => p.dataKey === "expense")?.value ?? 0;

      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-purple-800 mb-1">
            {payload[0].payload.date}
          </p>
          <p className="text-sm text-gray-600">
            Income:{" "}
            <span className="text-sm font-medium text-green-600">
              ₹{income}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Expense:{" "}
            <span className="text-sm font-medium text-red-600">
              ₹{expense}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          {/* Gradients for fill */}
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="none" />

          <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#555" }} />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          {/* Income Line */}
          <Area
            type="monotone"
            dataKey="income"
            stroke="#22c55e"
            fill="url(#incomeGradient)"
            strokeWidth={3}
            dot={{ r: 3, fill: "#4ade80" }}
          />

          {/* Expense Line */}
          <Area
            type="monotone"
            dataKey="expense"
            stroke="#ef4444"
            fill="url(#expenseGradient)"
            strokeWidth={3}
            dot={{ r: 3, fill: "#f87171" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChartAll;

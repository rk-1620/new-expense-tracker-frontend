const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 min-w-[160px]">
        <p className="text-xs font-semibold text-violet-600 mb-1 tracking-wide">
          {payload[0].name}
        </p>
        <p className="text-sm text-gray-500">
          Amount:{" "}
          <span className="text-sm font-semibold text-gray-800">
            ${payload[0].value}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;

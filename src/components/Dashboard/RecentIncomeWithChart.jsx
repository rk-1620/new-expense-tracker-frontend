import { useState, useEffect } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  // console.log(data);
  // console.log(totalIncome);

  useEffect(() => {
    const groupedData = {};

    data?.forEach(item => {
      const name = item?.source;
      groupedData[name] = (groupedData[name] || 0) + item?.amount;
    });

    const dataArr = Object.entries(groupedData).map(([name, amount]) => ({ name, amount }));
    setChartData(dataArr);
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`$${totalIncome}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default RecentIncomeWithChart;

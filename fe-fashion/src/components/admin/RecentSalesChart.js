import React from "react";
import Chart from "../../components/admin/Chart";

const RecentSalesChart = ({ recentSales }) => {
  const chartData = {
    labels: recentSales.map((sale) => sale.date),
    datasets: [
      {
        label: "Doanh thu (₫)",
        data: recentSales.map((sale) => sale.revenue),
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.1)",
        fill: true,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2>Doanh số 7 ngày gần đây</h2>
      <Chart data={chartData} />
    </div>
  );
};

export default RecentSalesChart;
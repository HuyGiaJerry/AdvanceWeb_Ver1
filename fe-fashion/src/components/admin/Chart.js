// Chart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Đăng ký các component cần thiết cho Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const data = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4'],
    datasets: [
      {
        label: 'Doanh thu',
        data: [1000, 1500, 2000, 1800],
        borderColor: '#4caf50',
        fill: false,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
  };
  return <Line data={data} options={options} />;
};

export default Chart;
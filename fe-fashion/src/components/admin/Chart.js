import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { data } from '../../services/dataRevenue'; // Import dữ liệu đã xử lý

const Chart = () => (
  <div className="chart-container">
    <LineChart width={800} height={400} data={data}>
      <defs>
        <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="10%" stopColor="blue" stopOpacity={0.8} />
          <stop offset="80%" stopColor="blue" stopOpacity={0.4} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="4 4" stroke="#ddd" />
      <XAxis dataKey="name" tick={{ fill: '#333', fontSize: 16 }} />
      <YAxis tick={{ fill: '#333', fontSize: 16 }} />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="doanhThu"
        stroke="url(#colorGradient)"
        strokeWidth={5}
        dot={{ r: 7, fill: '#00c6ff', stroke: '#fff', strokeWidth: 3 }}
        activeDot={{ r: 9, stroke: '#0072ff', strokeWidth: 3 }}
      />
    </LineChart>
  </div>
);

export default Chart;
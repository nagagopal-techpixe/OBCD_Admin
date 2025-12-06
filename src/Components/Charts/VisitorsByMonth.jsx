// VisitorsByMonth.jsx (Line Chart Component)
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const VisitorsByMonth = () => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(null);

  // ⭐ Mock Monthly Data
  const MOCK_MONTHLY_DATA = {
    labels: ["Jan 2025", "Feb 2025", "Mar 2025", "Apr 2025"],
    datasets: [
      {
        label: "Visitors",
        data: [150, 200, 180, 250],
        fill: true,
        backgroundColor: "rgba(38, 166, 154, 0.3)",
        borderColor: "rgba(38, 166, 154, 1)",
        pointBackgroundColor: "rgba(38, 166, 154,1)",
        pointRadius: 6,
        tension: 0.5,
      },
      {
        label: "Subscribers",
        data: [50, 80, 60, 100],
        fill: true,
        backgroundColor: "rgba(255, 138, 101,0.3)",
        borderColor: "rgba(255, 138, 101,1)",
        pointBackgroundColor: "rgba(255, 138, 101,1)",
        pointRadius: 6,
        tension: 0.5,
      },
    ],
  };

  useEffect(() => {
    setTimeout(() => {
      setChartData(MOCK_MONTHLY_DATA);
      setLoading(false);
    }, 500);
  }, []);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: { legend: { display: true, position: "bottom" } },
    scales: {
      y: { beginAtZero: true },
      x: {},
    },
  };

  return (
    <div className="bg-white rounded-xl p-6 mb-8 shadow-[inset_0_0_8px_#00000040]">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Visitors by Month
      </h2>

      {loading ? (
        <div className="flex flex-col items-center py-10">
          <div className="animate-spin w-10 h-10 border-4 border-gray-300 border-t-indigo-500 rounded-full"></div>
          <p className="mt-3 text-gray-600">Loading monthly visitor data...</p>
        </div>
      ) : (
        <div className="h-[450px]">
          <Line data={chartData} options={options} />
        </div>
      )}
    </div>
  );
};

export default VisitorsByMonth;

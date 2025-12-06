// SalesByYear.jsx Line graph
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

const SalesByYear = () => {
  const [loading, setLoading] = useState(true);
  const [salesByYearData, setSalesByYearData] = useState(null);

  const MOCK_SALES_YEAR_DATA = {
    labels: ["Electronics", "Grocery", "Fashion", "Cosmetics"],
    datasets: [
      {
        label: "2023",
        data: [120, 90, 150, 70],
        borderColor: "#26a69a",
        backgroundColor: "rgba(38,166,154,0.4)",
        tension: 0.4,
        fill: false,
      },
      {
        label: "2024",
        data: [160, 110, 130, 100],
        borderColor: "#ff8a65",
        backgroundColor: "rgba(255,138,101,0.4)",
        tension: 0.4,
        fill: false,
      },
    ],
  };

  useEffect(() => {
    setTimeout(() => {
      setSalesByYearData(MOCK_SALES_YEAR_DATA);
      setLoading(false);
    }, 600);
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "bottom" } },
    scales: {
      y: { beginAtZero: true },
      x: {},
    },
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-[inset_0_0_8px_#00000040] mb-10">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Sales by Year
      </h2>

      {loading ? (
        <div className="flex flex-col items-center py-10">
          <div className="animate-spin border-4 border-gray-300 border-t-indigo-500 rounded-full w-10 h-10"></div>
          <p className="text-gray-600 mt-3">Loading sales data...</p>
        </div>
      ) : (
        <div className="h-[500px]">
          <Line data={salesByYearData} options={options} />
        </div>
      )}
    </div>
  );
};

export default SalesByYear;

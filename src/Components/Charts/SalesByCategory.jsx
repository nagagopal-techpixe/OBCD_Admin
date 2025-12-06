// SalesByCategory.jsx (Horizontal Bar Chart)
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const SalesByCategory = () => {
  const [loading, setLoading] = useState(true);
  const [timePeriodData, setTimePeriodData] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");

  const timePeriods = ["today", "weekly", "monthly"];

  const MOCK_PERIOD_DATA = {
    labels: ["Jan 2", "Jan 6", "Jan 10", "Jan 13"],
    datasets: [
      {
        label: "Electronics",
        data: [40, 60, 80, 55],
        backgroundColor: "#26a69a",
      },
      {
        label: "Fashion",
        data: [20, 50, 40, 65],
        backgroundColor: "#ff8a65",
      },
    ],
  };

  useEffect(() => {
    setTimeout(() => {
      setTimePeriodData(MOCK_PERIOD_DATA);
      setLoading(false);
    }, 600);
  }, []);

  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
    setLoading(true);

    setTimeout(() => {
      setTimePeriodData(MOCK_PERIOD_DATA);
      setLoading(false);
    }, 500);
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "bottom" } },
    scales: {
      x: { beginAtZero: true },
      y: {},
    },
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-[inset_0_0_8px_#00000040]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Sales by Category
        </h2>

        <select
          value={selectedPeriod}
          onChange={handlePeriodChange}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          {timePeriods.map((p) => (
            <option key={p} value={p}>
              {p.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex flex-col items-center py-10">
          <div className="animate-spin border-4 border-gray-300 border-t-indigo-500 rounded-full w-10 h-10"></div>
          <p className="text-gray-600 mt-3">
            Loading {selectedPeriod} data...
          </p>
        </div>
      ) : (
        <div className="h-[500px]">
          <Bar data={timePeriodData} options={options} />
        </div>
      )}
    </div>
  );
};

export default SalesByCategory;

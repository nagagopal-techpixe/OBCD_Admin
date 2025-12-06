// VisitorsToday.jsx (Pie Chart Component)
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const VisitorsToday = () => {
  const [loading, setLoading] = useState(true);
  const [pieData, setPieData] = useState(null);

  // ⭐ Mock Today Visitors Data
  const MOCK_TODAY_DATA = {
    labels: ["Vendors", "Customers", "New Visitors"],
    datasets: [
      {
        data: [25, 40, 15],
        backgroundColor: ["#ffccbc", "#ffab91", "#ff8a65"],
      },
    ],
  };

  useEffect(() => {
    setTimeout(() => {
      setPieData(MOCK_TODAY_DATA);
      setLoading(false);
    }, 500);
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "bottom" } },
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-[inset_0_0_8px_#00000040]">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        User Types Today
      </h2>

      {loading ? (
        <div className="flex flex-col items-center py-10">
          <div className="animate-spin w-10 h-10 border-4 border-gray-300 border-t-orange-500 rounded-full"></div>
          <p className="mt-3 text-gray-600">Loading today's users...</p>
        </div>
      ) : (
        <div className="h-[350px]">
          <Pie data={pieData} options={options} />
        </div>
      )}
    </div>
  );
};

export default VisitorsToday;

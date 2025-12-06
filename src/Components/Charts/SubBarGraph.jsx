// SubBarGraph.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Tooltip,
} from "chart.js";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Legend, Tooltip);

const SubBarGraph = () => {
  const data = {
    labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
    datasets: [
      {
        label: "Vendors",
        data: [0, 1, 4, 10, 1, 0],
        backgroundColor: "#0E9F9F",
        borderRadius: 4,
        barThickness: 32,
      },
      {
        label: "Users",
        data: [0, 0, 10, 9, 2, 0],
        backgroundColor: "#5196e6ff",
        borderRadius: 4,
        barThickness: 32,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: true,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: "rectRounded",
          color: "#444",
          font: {
            size: 14,
            family: "sans-serif",
          },
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6B7280",
          font: { size: 14 },
        },
      },
      y: {
        min: 0,
        max: 10,
        ticks: {
          stepSize: 1,
          color: "#6B7280",
          font: { size: 14 },
        },
        grid: {
          color: "#f0f0f0",
        },
      },
    },
  };

  return (
    <div className="w-full bg-white shadow-xl rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">USERS</h2>

      <div className="h-[380px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default SubBarGraph;

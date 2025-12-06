import React from "react";

export default function SummaryCard({ icon, title, value, percent, color }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 flex items-center justify-center rounded-full ${color}`}>
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-bold">{value}</h2>
          <p className="text-gray-500">{title}</p>
        </div>
      </div>
      <p className={`text-sm ${percent >= 0 ? "text-green-500" : "text-red-500"}`}>
        {percent >= 0 ? "+" : ""}
        {percent} %
      </p>
    </div>
  );
}

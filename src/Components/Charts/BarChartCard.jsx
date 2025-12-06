import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function BarChartCard({ data, title }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <select className="border rounded px-2 py-1 text-sm">
          <option>This Week</option>
          <option>Last Week</option>
        </select>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#6366F1" />
            <Bar dataKey="revenue" fill="#60A5FA" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

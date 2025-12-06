import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function LineChartCard({ data, title }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <select className="border rounded px-2 py-1 text-sm">
          <option>Monthly</option>
          <option>Weekly</option>
        </select>
      </div>
      <div className="p-0 w-full aspect-[2/1]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="received" stroke="#6366F1" strokeWidth={2} />
            <Line type="monotone" dataKey="due" stroke="#60A5FA" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-row justify-around mt-4 text-sm gap-4">
        <div>
          <p className="text-gray-500">Received Amount</p>
          <p className="font-bold">$580.00</p>
        </div>
        <div>
          <p className="text-gray-500">Due Amount</p>
          <p className="font-bold">$628.00</p>
        </div>
      </div>
    </div>
  );
}

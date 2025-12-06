import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';

export default function CurrentSubjectRadar() {
  const data = [
    { subject: 'English', series1: 90, series2: 65, series3: 85 },
    { subject: 'History', series1: 75, series2: 20, series3: 92 },
    { subject: 'Physics', series1: 82, series2: 70, series3: 88 },
    { subject: 'Geography', series1: 68, series2: 95, series3: 45 },
    { subject: 'Chinese', series1: 85, series2: 78, series3: 70 },
    { subject: 'Math', series1: 70, series2: 88, series3: 65 },
  ];

  return (
    <div className="shadow-xl rounded-xl bg-white flex items-center justify-center ">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">Current subject</h2>
        
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={data}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#9ca3af', fontSize: 13 }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tick={{ fill: '#9ca3af', fontSize: 11 }}
            />
            <Radar
              name="Series 1"
              dataKey="series1"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.5}
            />
            <Radar
              name="Series 2"
              dataKey="series2"
              stroke="#f59e0b"
              fill="#f59e0b"
              fillOpacity={0.5}
            />
            <Radar
              name="Series 3"
              dataKey="series3"
              stroke="#06b6d4"
              fill="#06b6d4"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ResponsiveContainer>

        <div className="flex items-center justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-gray-600">Series 1</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-sm text-gray-600">Series 2</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
            <span className="text-sm text-gray-600">Series 3</span>
          </div>
        </div>
      </div>
    </div>
  );
}
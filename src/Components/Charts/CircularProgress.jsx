import React from "react";

// Props:
// title: "Compain"
// subtitle: "This week"
// value: number (0-100)

const CircularProgress = ({ title = "Compain", subtitle = "This week", value = 75 }) => {
  const radius = 45;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center text-center rounded-2xl p-4 min-h-[250px] shadow-2xl select-none">
      <h2 className="text-[20px] font-semibold text-[#3A73B4]">{title}</h2>
      <p className="text-sm text-gray-400 -mt-1 flex items-center gap-1 cursor-pointer">
        {subtitle}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-4 h-4 text-gray-500"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </p>

      {/* Circle Progress */}
      <div className="relative w-32 h-32 mt-2">
        {/* Background Circle */}
        <svg className="w-full h-full rotate-[-90deg]">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke="#E6E6E6"
            strokeWidth={strokeWidth}
          />

          {/* Progress Circle */}
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke="url(#gradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            className="transition-all duration-700"
          />

          {/* Gradient */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4C84C3" />
              <stop offset="100%" stopColor="#28A3AF" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center text-[18px] font-semibold text-[#4C84C3]">
          {value}%
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;

import React from "react";

const AnalyticsChart = () => {
  const data = [
    { day: "Mon", height: 120, opacity: 1 },
    { day: "Tue", height: 80, opacity: 0.45 },
    { day: "Wed", height: 140, opacity: 1 },
    { day: "Thu", height: 90, opacity: 0.45 },
    { day: "Fri", height: 150, opacity: 0.45 },
    { day: "Sat", height: 170, opacity: 1 },
    { day: "Sun", height: 100, opacity: 0.45 },
    { day: "Mon", height: 130, opacity: 1 },
  ];

  const yearMarks = ["2022", "2021", "2020", "2019"];

  return (
    <div className="p-6 w-full max-w-2xl select-none border">
      <h2 className="text-[20px] font-semibold text-[#3A73B4] mb-4">
        Analytics
      </h2>

      {/* GRID for equal spacing */}
      <div className="relative border-l border-b border-gray-300 pl-16 pt-2 pb-10">
        {/* Grid with equal rows */}
        <div className="absolute inset-0 grid grid-rows-4">
          {yearMarks.map((year, index) => (
            <div key={year} className="relative flex items-center">
              {/* Year text */}
              <span className="absolute -left-12 text-sm text-gray-500">
                {year}
              </span>

              {/* dotted line */}
              <div className="w-full border-t border-dotted border-gray-300"></div>
            </div>
          ))}
        </div>

        {/* BAR SECTION */}
        <div className="relative flex justify-between items-end h-48 mt-2">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div
                className="rounded-full w-4"
                style={{
                  height: `${item.height}px`,
                  background: "linear-gradient(180deg, #4C84C3, #28A3AF)",
                  opacity: item.opacity,
                }}
              ></div>

              <span className="text-sm text-gray-500">{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;

import React from "react";
import ReactECharts from "echarts-for-react";

const AreaChat = ({ stats }) => {
  const option = {
    color: ["#3f51b5"],
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "cross", label: { backgroundColor: "#6a7985" } },
    },
    legend: {
      top: 10,
      left: "center",
      data: ["Count"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: ["Total Posts", "Total Carousel", "Total Videos"],
      },
    ],
    yAxis: [{ type: "value" }],
    series: [
      {
        name: "Count",
        type: "line",
        smooth: true,
        areaStyle: {},
        data: [
          stats.totalPosts,
          stats.totalCarousel,
          stats.totalVideos,
          // stats.readyToDownload,
        ],
      },
    ],
  };

  return (
    <div className="rounded-xl bg-white shadow-xl p-4 md:p-6">
      <div className="w-full h-[260px] md:h-[360px]">
        <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
      </div>
    </div>
  );
};

export default AreaChat;

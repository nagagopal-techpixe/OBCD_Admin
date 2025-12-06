import React from 'react';
import ReactECharts from 'echarts-for-react';

const DoughnutChart = () => {
  const labels = ['Electronics', 'Clothing', 'Books', 'Others', 'Home Appliances'];
  const colors = ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE'];
  const option = {
    color: colors,
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    legend: { show: false },
    series: [
      {
        name: 'Sales',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold',
            color: '#333',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 335, name: labels[0] },
          { value: 310, name: labels[1] },
          { value: 234, name: labels[2] },
          { value: 135, name: labels[3] },
          { value: 1548, name: labels[4] },
        ],
      },
    ],
    // Keep media for radius responsiveness only
    media: [
      { query: { maxWidth: 640 }, option: { series: [{ radius: ['35%', '65%'] }] } },
      { query: { minWidth: 641, maxWidth: 1024 }, option: { series: [{ radius: ['38%', '68%'] }] } },
      { query: { minWidth: 1025 }, option: { series: [{ radius: ['40%', '70%'] }] } },
    ],
  };

  return (
    <div className="bg-white shadow-lg rounded-xl flex flex-col items-center p-4 md:p-6">
      {/* Chart in responsive aspect-ratio box */}
      <div className="w-full aspect-square sm:aspect-[4/3] lg:aspect-[16/10]">
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>
<ul className="mt-4 w-full max-w-md grid grid-cols-2 lg:grid-cols-4 gap-3 justify-items-center">
        {labels.map((name, i) => {
          const isLastOdd = labels.length % 2 === 1 && i === labels.length - 1;
          return (
            <li
              key={name}
              className={`flex items-center gap-2 text-gray-700 text-sm ${isLastOdd ? "col-span-2 justify-self-center" : ""}`}
            >
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[i] }}
              />
              <span>{name}</span>
            </li>
          );
        })}
      </ul>
      {/* Custom Title Below Chart */}
      <div className="text-center mt-4 flex items-center justify-center gap-2">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Sales Distribution </h2>
      </div>

      {/* Custom legend below the chart, 2 x 2 grid (2 columns). If odd count, last item spans both columns and is centered. */}
      
    </div>
  );
};

export default DoughnutChart;

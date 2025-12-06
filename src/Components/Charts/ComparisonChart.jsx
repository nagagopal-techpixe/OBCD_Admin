import React from 'react';
import ReactECharts from 'echarts-for-react';

const ComparisonChart = () => {
  const option = {
    color: ['#596dff', '#ff7d7d'],  // pick primary & secondary colors you see in Matx
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      top: 10,
      left: 'center',
      data: ['This Year', 'Last Year'],
      textStyle: {
        color: '#666',
      },
    },
    grid: {
      top: 60,
      right: 20,
      left: 20,
      bottom: 40,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLine: {
        lineStyle: {
          color: '#ccc',
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#666',
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#eaeaea',
        },
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#666',
      },
    },
    series: [
      {
        name: 'This Year',
        type: 'bar',
        barWidth: '30%',
        data: [120, 200, 150, 80, 70, 110, 130],
      },
      {
        name: 'Last Year',
        type: 'bar',
        barWidth: '30%',
        data: [90, 160, 120, 60, 50, 100, 90],
      },
    ],
  };

  return (
    <div className='rounded-xl shadow-xl bg-white' style={{ width: '100%', height: '500px' }}>
      <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

export default ComparisonChart;

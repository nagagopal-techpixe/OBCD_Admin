

import ReactECharts from 'echarts-for-react';

const  LineGraph = () => {
  const option = {
    color: ['#596dff', '#7c8bff'],  // primary series colors
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
      },
    },
    grid: {
      top: 20,
      right: 20,
      bottom: 30,
      left: 40,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
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
        name: 'Series A',
        type: 'line',
        smooth: true,
        data: [120, 132, 101, 134, 90, 230, 210],
        lineStyle: {
          width: 3,
        },
        showSymbol: false,
        emphasis: {
          focus: 'series',
        },
      },
      {
        name: 'Series B',
        type: 'line',
        smooth: true,
        data: [220, 182, 191, 234, 290, 330, 310],
        lineStyle: {
          width: 3,
        },
        showSymbol: false,
        emphasis: {
          focus: 'series',
        },
      },
    ],
  };

  return (
    <div className='rounded-xl bg-white shadow-xl' style={{ width: '100%', height: '400px' }}>
      <ReactECharts
        option={option}
        style={{ height: '100%', width: '100%' }}
      />
    </div>
  );
};

export default  LineGraph;

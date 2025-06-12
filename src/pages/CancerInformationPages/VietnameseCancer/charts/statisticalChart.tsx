import { Bar } from '@ant-design/plots';

export const StatisticalChart = (data: any) => {
  const config = {
    data,
    xField: 'Cases',
    yField: 'Cancer',
    seriesField: 'Cancer',
    legend: {
      position: 'top-left',
    },
    height: 550,
  };
  return <Bar {...config} />;
};

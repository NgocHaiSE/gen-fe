import { Pie } from '@ant-design/charts';

export const PieChart = (data: any) => {
  const config = {
    appendPadding: 10,
    data,
    angleField: 'Cases',
    colorField: 'Cancer',
    radius: 0.8,
    legend: false,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
    height: 550,
  };

  return <Pie {...config} />;
};

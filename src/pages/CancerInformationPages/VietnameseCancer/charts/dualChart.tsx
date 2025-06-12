import { BidirectionalBar } from '@ant-design/plots';

const DualBar = () => {
  const data = [
    {
      name: 'Lung',
      males: 36.8,
      females: 11.8,
    },
    {
      name: 'Liver',
      males: 38.0,
      females: 9.8,
    },
    {
      name: 'Breast',
      males: 0,
      females: 34.2,
    },
    {
      name: 'Stomach',
      males: 21.7,
      females: 10.6,
    },
    {
      name: 'Colorectum',
      males: 17.6,
      females: 11.6,
    },
    {
      name: 'Leukaemia',
      males: 6.5,
      females: 5.9,
    },
    {
      name: 'Prostate',
      males: 12.2,
      females: 0,
    },
    {
      name: 'Nasopharynx',
      males: 8.1,
      females: 2.8,
    },
    {
      name: 'Thyroid',
      males: 1.9,
      females: 7.6,
    },
    {
      name: 'Corpus uteri',
      males: 0,
      females: 8.9,
    },
  ];
  const config = {
    data,
    xField: 'name',
    xAxis: {
      position: 'bottom',
    },
    interactions: [
      {
        type: 'active-region',
      },
    ],
    yField: ['males', 'females'],
    tooltip: {
      shared: true,
      showMarkers: false,
    },
    height: 550,
  };
  return <BidirectionalBar {...config} />;
};

export default DualBar;

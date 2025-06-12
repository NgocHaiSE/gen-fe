import { Treemap } from '@ant-design/plots';

const TreeMap = () => {
  const data = {
    name: 'root',
    children: [
      {
        name: 'Asia',
        value: 8750932,
      },
      {
        name: 'Europe',
        value: 4229662,
      },
      {
        name: 'Northern America',
        value: 2378785,
      },
      {
        name: 'Latin America and the Caribean',
        value: 1412732,
      },
      {
        name: 'Africa',
        value: 1055172,
      },
    ],
  };
  const config = {
    data,
    colorField: 'name',
  };
  return <Treemap {...config} />;
};

export default TreeMap;

import {
  mutationBreast20GeneEp,
  mutationColorectal20GeneEp,
  mutationLiver20GeneEp,
  mutationLung20GeneEp,
  mutationThyroid20GeneEp,
} from '@/pages/EndPoint';
import { currentPage } from '@/shared/CurrentPage';
import { Column } from '@ant-design/charts';
import { useEffect, useState } from 'react';

const TopGene = () => {
  const [data, setData] = useState([]);

  const locationPage = currentPage(location.pathname);
  let URL = '';

  switch (locationPage) {
    case 'lungCancerPage':
      URL = mutationLung20GeneEp;
      break;
    case 'liverCancerPage':
      URL = mutationLiver20GeneEp;
      break;
    case 'breastCancerPage':
      URL = mutationBreast20GeneEp;
      break;
    case 'thyroidCancerPage':
      URL = mutationThyroid20GeneEp;
      break;
    case 'colorectalCancerPage':
      URL = mutationColorectal20GeneEp;
      break;
    default:
      URL = '';
      break;
  }

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(URL)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  console.log(data);
  const config = {
    data,
    xField: 'gene_name',
    yField: 'value',
    seriesField: 'type',
    isGroup: true,
    columnStyle: {
      radius: [5, 5, 0, 0],
    },
  };
  return (
    <div style={{ height: '70vh' }}>
      <Column {...config} />
    </div>
  );
};

export default TopGene;

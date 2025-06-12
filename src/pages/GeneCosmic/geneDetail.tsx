import { useParams } from 'react-router-dom';
import geneDetails from './data/geneData';
export default function GeneDetails() {
  const { gene } = useParams();
  var genzz = geneDetails.filter((gen) => gen.name === gene);

  return (
    <div>
      <p>{genzz[0].name}</p>
      <p>{genzz[0].description}</p>
      <p>{genzz[0].last_review_date}</p>
    </div>
  );
}

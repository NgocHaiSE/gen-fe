import BreastTreatment from '@/components/OtherTreatment/Breast';
import ColorectalTreatment from '@/components/OtherTreatment/Colorectal';
import LiverTreatment from '@/components/OtherTreatment/Liver';
import LungTreatment from '@/components/OtherTreatment/Lung';
import ThyroidTreatment from '@/components/OtherTreatment/Thyroid';

import { currentPage } from '@/shared/CurrentPage';
import NoFoundPage from '../404';

const OtherTreatment = () => {
  const locationPage = currentPage(location.pathname);

  let renderedComponent;
  switch (locationPage) {
    case 'lungCancerPage':
      renderedComponent = <LungTreatment />;
      break;
    case 'liverCancerPage':
      renderedComponent = <LiverTreatment />;
      break;
    case 'breastCancerPage':
      renderedComponent = <BreastTreatment />;
      break;
    case 'thyroidCancerPage':
      renderedComponent = <ThyroidTreatment />;
      break;
    case 'colorectalCancerPage':
      renderedComponent = <ColorectalTreatment />;
      break;
    default:
      renderedComponent = <NoFoundPage />;
      break;
  }

  return renderedComponent;
};

export default OtherTreatment;

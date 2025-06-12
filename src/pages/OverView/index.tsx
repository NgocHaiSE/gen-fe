import BreastOverview from '@/components/Overview/breast';
import ColorectalOverview from '@/components/Overview/colorectal';
import LiverOverview from '@/components/Overview/liver';
import LungOverview from '@/components/Overview/lung';
import ThyroidOverview from '@/components/Overview/thyriod';
import { currentPage } from '@/shared/CurrentPage';
import NoFoundPage from '../404';

const Overview = () => {
  const locationPage = currentPage(location.pathname);

  let renderedComponent;
  switch (locationPage) {
    case 'lungCancerPage':
      renderedComponent = <LungOverview />;
      break;
    case 'liverCancerPage':
      renderedComponent = <LiverOverview />;
      break;
    case 'breastCancerPage':
      renderedComponent = <BreastOverview />;
      break;
    case 'thyroidCancerPage':
      renderedComponent = <ThyroidOverview />;
      break;
    case 'colorectalCancerPage':
      renderedComponent = <ColorectalOverview />;
      break;
    default:
      renderedComponent = <NoFoundPage />;
      break;
  }

  return renderedComponent;
};

export default Overview;

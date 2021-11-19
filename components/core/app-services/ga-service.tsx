import ReactGA from 'react-ga';

interface GAService {
  initialize: () => void;
  pageView: (url: string) => void;
  modalView: (modal: string) => void;
  event: (category: string, action: string) => void;
}

export default function useGAService(): GAService {

  const initialize = () => {
    ReactGA.initialize('UA-176721306-1');
  };

  const pageView = (url: string) => {
    ReactGA.pageview(url);
  };

  const modalView = (modal: string) => {
    ReactGA.modalview(modal);
  };

  const event = (category: string, action: string) => {
    ReactGA.event({ category, action });
  };

  return {
    initialize, pageView, modalView, event
  };

}

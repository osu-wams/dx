import ReactGA from 'react-ga';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';

ReactGA.initialize('UA-48705802-13', {
  testMode: true
});

// Mock matchMedia for test env
const matchMedia = () => ({
  matches: false,
  addListener: () => {},
  removeListener: () => {}
});

window.matchMedia = window.matchMedia || matchMedia;

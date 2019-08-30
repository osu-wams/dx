import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';

// Mock matchMedia for test env
const matchMedia = () => ({
  matches: false,
  addListener: () => {},
  removeListener: () => {}
});

window.matchMedia = window.matchMedia || matchMedia;

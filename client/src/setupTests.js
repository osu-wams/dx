import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import 'jest-styled-components';

jest.mock('./api/student');

// Mock matchMedia for test env
const matchMedia = () => ({
  matches: false,
  addListener: () => {},
  removeListener: () => {}
});

window.matchMedia = window.matchMedia || matchMedia;

import ReactGA from 'react-ga';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import * as cache from './util/cache';

ReactGA.initialize('UA-48705802-13', {
  testMode: true
});

export const mockGAEvent = jest.fn();

jest.mock('../src/util/gaTracking', () => ({
  Event: () => {
    return mockGAEvent();
  }
}));

mockGAEvent.mockResolvedValue(Promise.resolve(true));

beforeEach(() => {
  mockGAEvent.mockClear();
});

afterEach(() => {
  jest.clearAllMocks();
});

// required because of the overlay from Reakit
if (global.document) {
  global.document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document
    }
  });
}

// Supress missing CSS warnings in tests from @reach ui components
jest.mock('@reach/utils', () => ({
  ...jest.requireActual('@reach/utils'),
  checkStyles: jest.fn()
}));

// Mock matchMedia for test env
const matchMedia = () => ({
  matches: false,
  addListener: () => {},
  removeListener: () => {}
});
window.matchMedia = window.matchMedia || matchMedia;

// Mock the location change method
window.location.assign = jest.fn();

// Mock sessionStorage interface
beforeEach(() => {
  Storage.prototype.clear = jest.fn();
  Storage.prototype.getItem = jest.fn();
  Storage.prototype.setItem = jest.fn();
  Storage.prototype.removeItem = jest.fn();
  cache.clear();
});

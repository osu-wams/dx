import ReactGA from 'react-ga';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import * as cache from './util/cache';
import { queryCache } from 'react-query';
import { server } from 'src/mocks/server';

// Remove this when CRA updates to jsdom 16+ (not available as of CRA 3.4)
import MutationObserver from '@sheerun/mutationobserver-shim';
window.MutationObserver = MutationObserver;

ReactGA.initialize('UA-48705802-13', {
  testMode: true,
});

export const mockGAEvent = jest.fn();
export const mockTrendingEvent = jest.fn();

/**
 * MSW Setup
 */
// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  queryCache.clear();
});

// Clean up after the tests are finished.
afterAll(() => server.close());

/**
 * Google Analytics setup
 */
jest.mock('../src/util/gaTracking', () => ({
  Event: () => {
    return mockGAEvent();
  },
}));

jest.mock('../src/features/resources/GATrendingResource', () => ({
  TrendingEvent: () => {
    return mockTrendingEvent();
  },
}));

mockGAEvent.mockResolvedValue(Promise.resolve(true));
mockTrendingEvent.mockResolvedValue(Promise.resolve(true));

beforeEach(() => {
  mockGAEvent.mockClear();
});

afterEach(() => {
  // don't output debug statements to console
  jest.spyOn(console, 'debug').mockImplementation(() => {});

  jest.clearAllMocks();
});

// Supress missing CSS warnings in tests from @reach ui components
jest.mock('@reach/utils', () => ({
  ...jest.requireActual('@reach/utils'),
  checkStyles: jest.fn(),
}));

// Mock matchMedia for test env
const matchMedia = () => ({
  matches: false,
  addListener: () => {},
  removeListener: () => {},
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

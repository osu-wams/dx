import ReactGA from 'react-ga4';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import * as cache from './util/cache';
import { server } from 'src/mocks/server';
import axios from 'axios';

ReactGA.initialize('G-FKJ26XQJCS', {
  testMode: true,
});

export const mockInitialState = jest.fn();
export const mockGAEvent = jest.fn();
export const mockTrendingEvent = jest.fn();

mockGAEvent.mockResolvedValue(Promise.resolve(true));
mockTrendingEvent.mockResolvedValue(Promise.resolve(true));

/**
 * MSW Setup
 */
// Establish API mocking before all tests.
beforeAll(() => {
  axios.defaults.baseURL = 'http://localhost:4000';

  server.listen({
    onUnhandledRequest: 'warn',
  });
});

beforeEach(() => {
  // jsdom shares one window per test file; start every test from the root URL so query
  // strings and paths set by a previous test (e.g. /search?q=term) do not leak into the next.
  window.history.replaceState({}, '', '/');
  // Mock sessionStorage interface
  Storage.prototype.clear = jest.fn();
  Storage.prototype.getItem = jest.fn();
  Storage.prototype.setItem = jest.fn();
  Storage.prototype.removeItem = jest.fn();
  cache.clear();
  mockInitialState.mockClear();
  mockGAEvent.mockClear();
  mockTrendingEvent.mockClear();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  // don't output debug statements to console
  jest.spyOn(console, 'debug').mockImplementation(() => {});
  jest.clearAllMocks();
  server.resetHandlers();
});

// React Testing Library flushes React's passive effects on a later macrotask after each test; give
// those callbacks a chance to run while jsdom still exists, otherwise they throw after teardown.
afterEach(async () => {
  for (let i = 0; i < 3; i++) {
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
});

// Clean up after the tests are finished.
afterAll(() => server.close());

/**
 * Google Analytics setup
 */
jest.mock('../src/util/gaTracking', () => ({
  ...jest.requireActual('../src/util/gaTracking'),
  Event: (category: any = 'mockedCategory', action: string = 'mockedAction', label?: string) => {
    if (label) return mockGAEvent(category, action, label);
    return mockGAEvent(category, action);
  },
}));

jest.mock('../src/features/resources/GATrendingResource', () => ({
  TrendingEvent: () => {
    return mockTrendingEvent();
  },
}));

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

// jsdom does not allow window.location to be replaced; tests that need a specific path
// should navigate with window.history.pushState({}, '', '/path?query') instead.
window.scrollTo = jest.fn();

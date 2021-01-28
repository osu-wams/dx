import ReactGA from 'react-ga';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import * as cache from './util/cache';
import { queryCache } from 'react-query';
import { server } from 'src/mocks/server';
import axios from 'axios';

ReactGA.initialize('UA-48705802-13', {
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
    onUnhandledRequest: 'error',
  });
});

beforeEach(() => {
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

  queryCache.clear();
  server.resetHandlers();
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

// Jest 25 has issues with window.location so we are using this to mock
Object.defineProperty(window, 'location', {
  writable: true,
  value: { search: '', assign: jest.fn() },
});
// Mock the location change method
window.location.assign = jest.fn();

/**
 * MSW Setup
 */
// Establish API mocking before all tests.
// beforeAll(() => {
//   // axios.interceptors.request.use(
//   //   function (config) {
//   //     // console.log(config);
//   //     // Do something before request is sent
//   //     return config;
//   //   },
//   //   function (error) {
//   //     // Do something with request error
//   //     return Promise.reject(error);
//   //   }
//   // );

//   // axios.interceptors.response.use(
//   //   function (response) {
//   //     console.log('response', response);
//   //     // Any status code that lie within the range of 2xx cause this function to trigger
//   //     // Do something with response data
//   //     return response;
//   //   },
//   //   function (error) {
//   //     // Any status codes that falls outside the range of 2xx cause this function to trigger
//   //     // Do something with response error
//   //     return Promise.reject(error);
//   //   }
//   // );
// });

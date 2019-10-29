import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import App from './App';
import * as cache from './util/cache';

// Initialize Google Analytics
const isDevelopment = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';
const isGADebug = process.env.REACT_APP_GA_DEBUG === 'true';

// When running tests, intialize in ./setupTests.js instead
if (!isTest) {
  ReactGA.initialize('UA-48705802-13', {
    // Uncomment line below to get details in the console when developing
    debug: isDevelopment && isGADebug,
    gaOptions: {
      siteSpeedSampleRate: 100
    }
  });
}

// On first endering of the application, clear the session cache to ensure the
// user gets fresh data.
cache.clear();

const applicationRoot = document.getElementById('root') as HTMLElement;
ReactDOM.render(<App containerElement={applicationRoot} />, applicationRoot);

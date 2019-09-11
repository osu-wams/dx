import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import './index.css';
import App from './App';

// Initialize Google Analytics
const isDevelopment = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

// When running tests, intialize in ./setupTests.js instead
if (!isTest) {
  ReactGA.initialize('UA-48705802-13', {
    // Uncomment line below to get details in the console when developing
    // debug: isDevelopment,
    gaOptions: {
      siteSpeedSampleRate: 100
    }
  });
}
const applicationRoot = document.getElementById('root') as HTMLElement;
ReactDOM.render(<App containerElement={applicationRoot} />, applicationRoot);

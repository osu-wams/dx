import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import App from './App';
import ErrorBoundary from './features/ErrorBoundary';
import * as cache from './util/cache';
import { Errors } from '@osu-wams/hooks';
import idleTimer from './util/idleTimer';
import cookieRefreshTimer from './util/cookieRefreshTimer';
import { RecoilRoot } from 'recoil';

const { postError, IGNORED_ERRORS } = Errors;

// Initialize Google Analytics
const isDevelopment = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';
const isGADebug = process.env.REACT_APP_GA_DEBUG === 'true';

const applicationRoot = document.getElementById('root') as HTMLElement;
const redirectToError = () => window.location.assign('./error.html');

// Add Accessibility reporting in development via Chrome console through React-axe
if (isDevelopment) {
  var axe = require('react-axe');
  // const wcagRules = axe.getRules(['wcag21aa', 'wcag21a']);
  const axeConfig = {
    rules: [
      {
        id: 'region',
        enabled: false,
      },
    ],
  };
  // debounce param not working
  // We get a lot of false positives on contrast when clicking around do to our animations
  axe(React, ReactDOM, 3000, axeConfig);
}
try {
  // When running tests, intialize in ./setupTests.js instead
  if (!isTest) {
    ReactGA.initialize('UA-48705802-13', {
      // Uncomment line below to get details in the console when developing
      debug: isDevelopment && isGADebug,
      gaOptions: {
        siteSpeedSampleRate: 100,
      },
    });
  }

  // On first entering of the application, clear the session cache to ensure the
  // user gets fresh data.
  cache.clear();

  // Set an idle timer to redirect the browser to a path after a period of inactivity
  idleTimer();
  // Set a cookie refresh timer to ensure the cookie remains valid while the user may not have
  // made API calls that extended the cookie expiration time
  cookieRefreshTimer();

  ReactDOM.render(
    <RecoilRoot>
      <ErrorBoundary errorComponent={() => <></>} errorHandlerCallback={redirectToError}>
        <App containerElement={applicationRoot} />
      </ErrorBoundary>
    </RecoilRoot>,
    applicationRoot
  );
} catch (e) {
  if (IGNORED_ERRORS.includes(e.toString())) {
    console.warn(`DX Application caught an ignored error "${e.toString()}".`);
  } else {
    postError(e).then((v) => redirectToError());
  }
}

import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga4';
import App from './App';
import ErrorBoundary from './features/ErrorBoundary';
import * as cache from './util/cache';
import { Errors, queryClient, updateQueryClientOptions } from '@osu-wams/hooks';
import idleTimer from './util/idleTimer';
import cookieRefreshTimer from './util/cookieRefreshTimer';
import { RecoilRoot } from 'recoil';
import ReadyIntegration from './util/ready-integration';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

const { postError, IGNORED_ERRORS } = Errors;

// Initialize Google Analytics
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.REACT_APP_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';
const isGADebug = process.env.REACT_APP_GA_DEBUG === 'true';

if (isDevelopment || isTest) {
  global.__DEV__ = true;
} else {
  global.__DEV__ = false;
}

// Ready Education authentication flow as described in DD-1103
if (!isProduction && window.location.pathname.endsWith('/ready-education-auth')) {
  let token = ReadyIntegration.getUserToken();
  if (token) {
    // Retain previous query string params, such as ?returnUrl=page_name
    let qs = window.location.search;
    if (!qs) {
      qs = `?u=x&t=${token}`;
    } else {
      qs = `${qs}&u=x&t=${token}`;
    }
    console.debug(
      `Mobile app user redirecting to Ready Education auth workflow with token: ${token}`
    );
    window.location.assign(`/login${qs}`);
  } else {
    window.location.assign('/');
  }
}

const applicationRoot = document.getElementById('root') as HTMLElement;
const redirectToError = () => window.location.assign('./error.html');

/*
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
*/
try {
  // When running tests, intialize in ./setupTests.js instead
  if (!isTest) {
    ReactGA.initialize('G-FKJ26XQJCS', {
      // Uncomment line below to get details in the console when developing
      testMode: isDevelopment && isGADebug,
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

  updateQueryClientOptions(queryClient, {
    baseUrl: '/',
    enabled: true,
    retry: true,
    headers: {},
  });

  // Set a cookie refresh timer to ensure the cookie remains valid while the user may not have
  // made API calls that extended the cookie expiration time
  cookieRefreshTimer(queryClient);

  ReactDOM.render(
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ErrorBoundary errorComponent={() => <></>} errorHandlerCallback={redirectToError}>
          <BrowserRouter>
            <App containerElement={applicationRoot} />
          </BrowserRouter>
        </ErrorBoundary>
      </RecoilRoot>
    </QueryClientProvider>,
    applicationRoot
  );
} catch (e: any) {
  if (IGNORED_ERRORS.includes(e.toString())) {
    console.warn(`DX Application caught an ignored error "${e.toString()}".`);
  } else {
    postError(e).then((v) => redirectToError());
  }
}

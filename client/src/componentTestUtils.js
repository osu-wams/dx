import React from 'react';
import { render as rtlRender } from 'react-testing-library';
import { createHistory, createMemorySource, LocationProvider } from '@reach/router';
import { ThemeProvider } from 'styled-components';
import theme from './theme';

function render(ui, ...rest) {
  return rtlRender(<ThemeProvider theme={theme}>{ui}</ThemeProvider>, ...rest);
}

// this is a handy function that I would utilize for any component
// that relies on the router being in context
function renderWithRouter(
  ui,
  { route = '/', history = createHistory(createMemorySource(route)) } = {}
) {
  return {
    ...rtlRender(<LocationProvider history={history}>{ui}</LocationProvider>),
    // adding `history` to the returned utilities to allow us to reference it in our tests
    history
  };
}

export * from 'react-testing-library';
// override the built-in render with our own
export { render, renderWithRouter };

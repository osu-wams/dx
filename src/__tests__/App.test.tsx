import React from 'react';
import ReactDOM from 'react-dom';
import { LocationProvider, createHistory, createMemorySource } from '@reach/router';
import App from '../App';

it('renders <App> without crashing', () => {
  const div = document.createElement('div');
  // Setup for ReachRouter
  const testHistory = createHistory(createMemorySource('/'));
  ReactDOM.render(
    <LocationProvider history={testHistory}>
      <App containerElement={div} />
    </LocationProvider>,
    div
  );
  // ReactDOM.unmountComponentAtNode(div);
});

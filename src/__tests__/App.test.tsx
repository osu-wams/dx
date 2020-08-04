import React from 'react';
import ReactDOM from 'react-dom';
import { LocationProvider, createHistory, createMemorySource } from '@reach/router';
import App from '../App';
import { RecoilRoot } from 'recoil';

it('renders <App> without crashing', () => {
  const div = document.createElement('div');
  // Setup for ReachRouter
  const testHistory = createHistory(createMemorySource('/'));
  ReactDOM.render(
    <RecoilRoot>
      <LocationProvider history={testHistory}>
        <App containerElement={div} />
      </LocationProvider>
    </RecoilRoot>,
    div
  );
  // ReactDOM.unmountComponentAtNode(div);
});

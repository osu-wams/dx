import React from 'react';
import ReactDOM from 'react-dom';
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
import { LocationProvider, createHistory, createMemorySource } from '@reach/router';
import App from '../App';

// const mockAxios = new MockAdapter(axios);

// mockAxios.onGet(/\/api\/masquerade/).reply(200, { masqueradeId: null });
// mockAxios.onPost(/\/api\/masquerade/).reply(200, '');

it('renders <App> without crashing', () => {
  const div = document.createElement('div');
  // Setup for ReachRouter
  const testHistory = createHistory(createMemorySource('/'));
  ReactDOM.render(
    <LocationProvider history={testHistory}>
      <App />
    </LocationProvider>,
    div
  );
  // ReactDOM.unmountComponentAtNode(div);
});

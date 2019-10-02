/* eslint-disable no-unused-vars */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getAppVersions } from '../app-versions';

const mock = new MockAdapter(axios);

describe('getAppVersions', () => {
  it('gets versions on successful returns', async () => {
    mock.onGet('/healthcheck').reply(200, { version: 'server-tested-version' });
    mock.onGet('/app_version').reply(200, 'client-tested-version');
    const result = await getAppVersions();
    expect(result).toEqual({
      serverVersion: 'server-tested-version',
      appVersion: 'client-tested-version'
    });
  });
  it('falls back gracefully when requests fail', async () => {
    mock.onGet('/healthcheck').reply(500);
    mock.onGet('/app_version').reply(500);
    const result = await getAppVersions();
    expect(result).toEqual({
      serverVersion: 'failed-to-fetch',
      appVersion: 'failed-to-fetch'
    });
  });
});

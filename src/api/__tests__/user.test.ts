/* eslint-disable no-unused-vars */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { postSettings } from '../user';
import { settingsData, audienceOverride } from '../__mocks__/user.data';

const mock = new MockAdapter(axios);

describe('postSettings', () => {
  it('returns an updated settings', async () => {
    mock.onPost('/api/user/settings').reply(200, settingsData.data);
    const result = await postSettings({ audienceOverride });
    expect(result).toStrictEqual({ audienceOverride });
  });
  it('returns an error', async () => {
    mock.onPost('/api/user/settings').reply(500);
    await expect(postSettings({ audienceOverride })).rejects.toThrow();
  });
});

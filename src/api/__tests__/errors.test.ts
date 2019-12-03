/* eslint-disable no-unused-vars */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { postError } from '../errors';

const mock = new MockAdapter(axios);

describe('postError', () => {
  it('returns successful', async () => {
    mock.onPost('/api/errors').reply(200);
    const result = await postError(new Error('test'));
    expect(result).toBeUndefined();
  });
});

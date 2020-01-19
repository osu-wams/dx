import { api } from '@osu-wams/hooks';

jest.mock('../util/cache.ts', () => ({
  clear: () => {
    throw new Error('blah');
  }
}));

describe('application index', () => {
  it('reports an unhandled error', async () => {
    const hooks = require('@osu-wams/hooks');
    const api = hooks.api;
    const mockedPostError = jest.spyOn(api, 'postError');
    mockedPostError.mockResolvedValue(undefined);
    require('../index');
    expect(mockedPostError).toHaveBeenCalledTimes(1);
  });
});

// Noop, cause TSC to not complain that this is not a module
export {};

import { api } from '@osu-wams/hooks';

const mockedPostError = jest.fn();

jest.mock('../util/cache.ts', () => ({
  clear: () => {
    throw new Error('blah');
  }
}));

jest.mock('@osu-wams/hooks', () => ({
  api: {
    Errors: {
      postError: () => mockedPostError(),
      IGNORED_ERRORS: []
    }
  }
}));
describe('application index', () => {
  it('reports an unhandled error', async () => {
    mockedPostError.mockResolvedValue({});
    require('../index');
    mockedPostError.mockResolvedValue(undefined);
    expect(mockedPostError).toHaveBeenCalledTimes(1);
  });
});

// Noop, cause TSC to not complain that this is not a module
export {};

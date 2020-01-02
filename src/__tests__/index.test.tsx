jest.mock('../util/cache.ts', () => ({
  clear: () => {
    throw new Error('blah');
  }
}));

jest.mock('../api/errors.ts');

describe('application index', () => {
  it('reports an unhandled error', async () => {
    const errors = require('../api/errors');
    const mockedPostError = jest.spyOn(errors, 'postError');
    mockedPostError.mockResolvedValue(undefined);
    require('../index');
    expect(mockedPostError).toHaveBeenCalledTimes(1);
  });
});

// Noop, cause TSC to not complain that this is not a module
export {};

const mockedPostError = jest.fn();

jest.mock('../util/cache.ts', () => ({
  clear: () => {
    throw new Error('blah');
  }
}));

jest.mock('../api/errors.ts', () => ({
  postError: mockedPostError
}));

describe('application index', () => {
  it('reports an unhandled error', async () => {
    require('../index');
    expect(mockedPostError).toHaveBeenCalledTimes(1);
  });
});

// Noop, cause TSC to not complain that this is not a module
export {};

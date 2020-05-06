import React from 'react';
import { render } from 'src/util/test-utils';
import { screen } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary';

const ComponentWithError = () => {
  const badMethod = () => {
    throw new Error('it broke');
  };
  return <span>Success {badMethod()}</span>;
};

const mockedPostError = jest.fn();
const mockedErrorCallback = jest.fn();

jest.mock('@osu-wams/hooks', () => ({
  ...jest.requireActual('@osu-wams/hooks'),
  Errors: {
    postError: () => mockedPostError(),
  },
}));

beforeEach(() => {
  mockedPostError.mockResolvedValue(undefined);
});

// Do not report to console.error or console.debug since we are expecting these
afterEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('<ErrorBoundary />', () => {
  it('should render inner component without an error', async () => {
    render(
      <ErrorBoundary errorComponent={() => <span>Error</span>}>
        <span>Success</span>
      </ErrorBoundary>
    );
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.queryByText('Error')).toBeNull();
  });
  it('should render an error when one happens', async () => {
    render(
      <ErrorBoundary errorComponent={() => <span>Error</span>}>
        <ComponentWithError />
      </ErrorBoundary>
    );
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.queryByText('Success')).toBeNull();
    expect(mockedPostError).toBeCalledTimes(1);
    expect(console.error).toHaveBeenCalledTimes(2);
  });
  it('should call the ErrorHandlerCallback when an error happens', async () => {
    render(
      <ErrorBoundary
        errorComponent={() => <span>Error</span>}
        errorHandlerCallback={mockedErrorCallback}
      >
        <ComponentWithError />
      </ErrorBoundary>
    );
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.queryByText('Success')).toBeNull();
    expect(mockedPostError).toBeCalledTimes(1);
    expect(mockedErrorCallback).toBeCalledTimes(1);
    expect(console.error).toHaveBeenCalledTimes(2);
  });
});

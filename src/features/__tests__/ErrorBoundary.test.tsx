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

let consoleSpy;
beforeEach(() => {
  consoleSpy = jest.spyOn(console, 'error').mockImplementation();
  mockedPostError.mockResolvedValue(undefined);
});

describe('<ErrorBoundary />', () => {
  it('should render inner component without an error', async () => {
    render(
      <ErrorBoundary errorComponent={() => <span>Error</span>}>
        <span>Success</span>
      </ErrorBoundary>
    );
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.queryByText('Error')).not.toBeInTheDocument();
  });
  it('should render an error when one happens', async () => {
    render(
      <ErrorBoundary errorComponent={() => <span>Error</span>}>
        <ComponentWithError />
      </ErrorBoundary>
    );
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.queryByText('Success')).not.toBeInTheDocument();
    expect(mockedPostError).toBeCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledTimes(2);
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
    expect(screen.queryByText('Success')).not.toBeInTheDocument();
    expect(mockedPostError).toBeCalledTimes(1);
    await new Promise(setImmediate); // cause Jest to flush inflight promises before checking if the callback had been called
    expect(mockedErrorCallback).toBeCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledTimes(2);
  });
});

import React from 'react';
import { render } from '../../util/test-utils';
import ErrorBoundary from '../ErrorBoundary';

const ComponentWithError = () => {
  const badMethod = () => {
    throw new Error('it broke');
  };
  return <span>Success {badMethod()}</span>;
};

jest.mock('../../api/errors.ts');
const errors = require('../../api/errors');
const mockedPostError = jest.spyOn(errors, 'postError');
const mockedErrorCallback = jest.fn();

beforeEach(() => {
  mockedPostError.mockResolvedValue(undefined);
});

describe('<ErrorBoundary />', () => {
  it('should render inner component without an error', async () => {
    const { getByText, queryByText } = render(
      <ErrorBoundary errorComponent={() => <span>Error</span>}>
        <span>Success</span>
      </ErrorBoundary>
    );
    expect(getByText('Success')).toBeInTheDocument();
    expect(await queryByText('Error')).not.toBeInTheDocument();
  });
  it('should render an error when one happens', async () => {
    const { getByText, queryByText } = render(
      <ErrorBoundary errorComponent={() => <span>Error</span>}>
        <ComponentWithError />
      </ErrorBoundary>
    );
    expect(getByText('Error')).toBeInTheDocument();
    expect(await queryByText('Success')).not.toBeInTheDocument();
    expect(mockedPostError).toBeCalledTimes(1);
  });
  it('should call the ErrorHandlerCallback when an error happens', async () => {
    const { getByText, queryByText } = render(
      <ErrorBoundary
        errorComponent={() => <span>Error</span>}
        errorHandlerCallback={mockedErrorCallback}
      >
        <ComponentWithError />
      </ErrorBoundary>
    );
    expect(getByText('Error')).toBeInTheDocument();
    expect(await queryByText('Success')).not.toBeInTheDocument();
    expect(mockedPostError).toBeCalledTimes(1);
    expect(mockedErrorCallback).toBeCalledTimes(1);
  });
});

import React from 'react';
import { postError } from '../api/errors';

type ErrorHandler = (error: Error, info: React.ErrorInfo, errorHandlerCallback?: Function) => void;
type ErrorHandlingComponent<Props> = (props: Props, error?: Error) => React.ReactNode;
type ErrorState = { error?: Error };

/**
 * Higher ordered component to wrap a component with an error boundary
 * @param component wrapped component to catch errors
 * @param errorHandler handler to run when errors are caught
 * @param errorHandlerCallback optional callback to perform after errorHandler operates
 */
const Catch = <Props extends { errorHandlerCallback?: Function }>(
  component: ErrorHandlingComponent<Props>,
  errorHandler?: ErrorHandler
): React.ComponentType<Props> => {
  return class extends React.Component<Props, ErrorState> {
    displayName: string = '';

    state: ErrorState = {
      error: undefined
    };

    static getDerivedStateFromError(error: Error) {
      return { error };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
      if (errorHandler) {
        errorHandler(error, info, this.props.errorHandlerCallback);
      }
    }

    render() {
      return component(this.props, this.state.error);
    }
  };
};

type Props = {
  children: React.ReactNode;
  errorComponent: React.FC;
  errorHandlerCallback?: Function;
};

/**
 * An ErrorBoundary component with error reporting to the backend
 */
const ErrorBoundary = Catch(
  (props: Props, error?: Error) => {
    if (error) {
      return <props.errorComponent></props.errorComponent>;
    } else {
      return <React.Fragment>{props.children}</React.Fragment>;
    }
  },
  (error, info, callback) => {
    postError(error)
      .then(v => console.debug('Error boundary reported to server:', error))
      .catch(err => console.error);
    if (callback) callback();
  }
);

export default ErrorBoundary;

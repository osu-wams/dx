import React from 'react';

export interface IAppContext {
  user: any;
}

export const InitialAppContext: IAppContext = {
  user: {
    error: false,
    loading: true,
    data: {},
    isCanvasOptIn: false,
  },
};

export const AppContext = React.createContext<IAppContext>(InitialAppContext);

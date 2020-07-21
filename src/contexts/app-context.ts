import React from 'react';
import { Versions } from '@osu-wams/hooks/dist/api/appVersions';
import { InfoButtonState } from '@osu-wams/hooks/dist/api/infoButtons';

export interface IAppContext {
  infoButtonData: InfoButtonState[];
  appVersions: Versions;
  user: any;
}

export const InitialAppContext: IAppContext = {
  user: {
    error: false,
    loading: true,
    data: {},
    isCanvasOptIn: false,
  },
  infoButtonData: [],
  appVersions: {
    serverVersion: '',
    appVersion: '',
  },
};

export const AppContext = React.createContext<IAppContext>(InitialAppContext);

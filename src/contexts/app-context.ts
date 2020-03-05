import React from 'react';
import { Versions } from '@osu-wams/hooks/dist/api/appVersions';
import { InfoButtonState } from '@osu-wams/hooks/dist/api/infoButtons';
import { themesLookup, defaultTheme } from '../theme/themes';

export interface IAppContext {
  infoButtonData: InfoButtonState[];
  appVersions: Versions;
  themes: string[];
  selectedTheme: string;
  setTheme: Function;
  user: any;
}

export const InitialAppContext: IAppContext = {
  user: {
    error: false,
    loading: true,
    data: {},
    isCanvasOptIn: false
  },
  infoButtonData: [],
  appVersions: {
    serverVersion: '',
    appVersion: ''
  },
  themes: Object.keys(themesLookup),
  selectedTheme: defaultTheme,
  setTheme: (theme: string) => {}
};

export const AppContext = React.createContext<IAppContext>(InitialAppContext);

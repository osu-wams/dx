import axios from 'axios';
import useAPICall from './useAPICall';

export interface AppVersions {
  serverVersion: string;
  appVersion: string;
}

export const getAppVersions = async (): Promise<AppVersions> => {
  const healthCheck: { version: string } = await axios
    .get('/healthcheck')
    .then(res => res.data)
    .catch(err => {
      console.error('Failed fetching server deployed version.');
      return { version: 'failed-to-fetch' };
    });
  const appVersion: string = await axios
    .get('/app_version')
    .then(res => res.data)
    .catch(err => {
      console.error('Failed fetching client deployed version.');
      return 'failed-to-fetch';
    });
  return {
    serverVersion: healthCheck.version,
    appVersion
  };
};

export const useAppVersions = (initalState: AppVersions) =>
  useAPICall<AppVersions>(getAppVersions, undefined, data => data, initalState);

import axios from 'axios';
import useAPICall from './useAPICall';

export interface AppVersions {
  serverVersion: String;
  appVersion: String;
}

export const getAppVersions = async (): Promise<AppVersions> => {
  const healthCheck: { version: String } = await axios
    .get('/healthcheck')
    .then(res => res.data)
    .catch(err => {
      console.error('Failed fetching server deployed version.');
      return { version: 'failed-to-fetch' };
    });
  const appVersion: String = await axios
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

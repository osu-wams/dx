import { AppVersions } from '@osu-wams/hooks';
import { QueryClient } from 'react-query';
const TIMEOUT_MS = 3 * 60 * 60 * 1000 + 45 * 60 * 1000; // 3:45

/**
 * After <TIMEOUT_MS> fetch the healthcheck which causes the cookie expiration to bump forward.
 */
const cookieRefreshTimer = (queryClient: QueryClient) => {
  setInterval(async () => queryClient.invalidateQueries('/healthcheck'), TIMEOUT_MS);
};

export default cookieRefreshTimer;

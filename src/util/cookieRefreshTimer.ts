import { AppVersions } from '@osu-wams/hooks';
const TIMEOUT_MS = 3 * 60 * 60 * 1000 + 45 * 60 * 1000; // 3:45

/**
 * After <TIMEOUT_MS> fetch the healthcheck which causes the cookie expiration to bump forward.
 */
const cookieRefreshTimer = () => {
  setInterval(async () => AppVersions.getAppVersions(), TIMEOUT_MS);
};

export default cookieRefreshTimer;

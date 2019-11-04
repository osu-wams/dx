/**
 * Set session storage cache data, failing with no side effect of any exception. This
 * method is intended to provide the functionality unless (and until) the browser
 * disallows session cache.. in which case, the API calls will continue to be made
 * to the backend.
 * @param key - a unique key for storing data
 * @param value - the string value to be cached (expected to originally be JSON)
 */
export const setItem = (key: string, value: string): void => {
  try {
    let stringValue = value;
    if (typeof value !== 'string') stringValue = JSON.stringify(value);
    sessionStorage.setItem(key, stringValue);
  } catch (err) {
    console.debug(`session cache set failed: ${err}`);
  }
};

/**
 * Get session storage cache data, failing with no side effect of any exception. This
 * method is intended to provide the functionality unless (and until) the browser
 * disallows session cache.. in which case, the API calls will continue to be made
 * to the backend.
 * @param key - a unique key for storing data
 */
export const getItem = (key: string): any => {
  try {
    const cacheHit = sessionStorage.getItem(key);
    if (cacheHit) {
      // When code is compiled, IE and Edge error out here, so we're skipping them
      if (/Edge\/\d./i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) {
        return null;
      } else {
        return JSON.parse(cacheHit);
      }
    }
    return null;
  } catch (err) {
    console.debug(`session cache get failed: ${err}`);
    return null;
  }
};

/**
 * Remove session storage cache data, failing with no side effect of any exception. This
 * method is intended to provide the functionality unless (and until) the browser
 * disallows session cache.. in which case, the API calls will continue to be made
 * to the backend.
 * @param key - a unique key for storing data
 */
export const removeItem = (key: string): void => {
  try {
    sessionStorage.removeItem(key);
  } catch (err) {
    console.debug(`session cache remove failed: ${err}`);
  }
};

/**
 * Clear session cache, failing with no side effect of any exception. This
 * method is intended to provide the functionality unless (and until) the browser
 * disallows session cache.. in which case, the API calls will continue to be made
 * to the backend.
 * @param key - a unique key for storing data
 */
export const clear = (): void => {
  try {
    sessionStorage.clear();
  } catch (err) {
    console.debug(`session cache clear failed: ${err}`);
  }
};

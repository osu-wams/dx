import { useEffect, useState } from 'react';
import * as cache from '../util/cache';
import { postError } from './errors';

/* eslint-disable react-hooks/exhaustive-deps */

/**
 * Exhaustive deps has been disabled in linting because this hook shouldn't
 * trigger any time one of the referenced methods changes upstream.
 */

export interface IAPIResult<T> {
  data: T;
  loading: boolean;
  error: boolean;
  setData: Function;
}

/**
 * An abstract method to make an API method call, include an arbitrary query string,
 * optionally perform some data transformation along with an initial state for the hook
 * to start with. All API calls want this behavior and are wrapped into this consistent hook.
 *
 * Process flow;
 * * If cached data is found;
 * *  - Check if data is cached in the browser, set the loading to false and return the data if it was cached.
 * * If cached data is not found;
 * *  - Set loading state to true so that skeletons/spinner could be rendered
 * *  - Call the API function
 * *  - Perform the Data Transformation
 * *  - Set the data state and loading state to false
 * *  - If an error is caught, set the loading state to false and the error state to true
 * @param api - a function which makes an API call using axios
 * @param query - an optional querystring to include to the API call
 * @param dataTransform - a function that takes the data as input and expects to return properly shaped data
 * @param initialState - an initial state for the data to render in the component
 */
const useAPICall = <T>(
  api: Function,
  query: string | undefined,
  dataTransform: Function,
  initialState: T,
  useCache?: boolean,
  errorCallback?: Function
): IAPIResult<T> => {
  const [data, setData] = useState<T>(initialState);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const cacheKey = `${api.name}:${query}:${dataTransform.name}`;

  const fetchData = async () => {
    setLoading(true);
    api(query)
      .then((result: T) => {
        const transformed = dataTransform(result);
        cache.setItem(cacheKey, transformed);
        setData(transformed);
        setLoading(false);
      })
      .catch(async e => {
        // API calls fail when the cookie expires, this causes the front-end to
        // flow through the login process while providing the backend the target
        // url to redirect the user to after a successful login.
        if (e.response?.status === 401) {
          window.location.assign(`/login?return=${window.location.pathname}`);
        } else {
          await postError(e);
          cache.removeItem(cacheKey);
          setError(true);
          setLoading(false);
          if (errorCallback) errorCallback();
        }
      });
  };

  useEffect(() => {
    const cached = cache.getItem(cacheKey);
    if (useCache !== false && cached) {
      setData(cached);
      setLoading(false);
    } else {
      fetchData();
    }
  }, [query]);

  return { data, loading, error, setData };
};

export default useAPICall;

/* eslint-enable react-hooks/exhaustive-deps */

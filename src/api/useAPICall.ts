import { useEffect, useState } from 'react';
/* eslint-disable react-hooks/exhaustive-deps */

/**
 * Write comment about disabling linting
 */

export interface IAPIResult<T> {
  data: T;
  loading: boolean;
  error: boolean;
}

/**
 * TODO
 * @param api
 * @param query
 * @param dataTransform
 * @param initialState
 */
const useAPICall = <T>(
  api: Function,
  query: string | undefined,
  dataTransform: Function,
  initialState: T
): IAPIResult<T> => {
  const [data, setData] = useState<T>(initialState);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    api(query)
      .then((result: T) => {
        const transformed = dataTransform(result);
        setData(transformed);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  return { data, loading, error };
};

export default useAPICall;

/* eslint-enable react-hooks/exhaustive-deps */

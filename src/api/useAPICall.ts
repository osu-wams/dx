import { useEffect, useState } from 'react';
/* eslint-disable react-hooks/exhaustive-deps */

/**
 * Write comment about disabling linting
 */

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
) => {
  const [data, setData] = useState<T>(initialState);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api(query)
      .then((result: T) => {
        const transformed = dataTransform(result);
        setData(transformed);
      })
      .catch(e => {
        console.log(e);
        setError(true);
      });
    setLoading(false);
  }, []);

  return { data, loading, error };
};

export default useAPICall;

/* eslint-enable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from 'react';

const useAPICall = <T>(
  api: Function,
  query: string | undefined,
  dataTransform: Function,
  initialState: T
) => {
  const [data, setData] = useState<T>(initialState);
  const [caughtError, setCaughtError] = useState<boolean>(false);
  const memoizedCallback = useCallback((d)=> dataTransform(d), [dataTransform])

  useEffect(() => {
    api(query)
      .then((result: T) => {
        const temp = memoizedCallback(result);
        setData(temp);
      })
      .catch(e => {
        console.log(e);
        setCaughtError(true);
      });
  }, [api, query, memoizedCallback]);

  return { data, didCatch: caughtError };
};

export default useAPICall;

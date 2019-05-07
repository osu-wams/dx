import { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const useDebounceFunction = (fn: () => any, ms: number = 0, args: any[] = []) => {
  useEffect(() => {
    const handle = setTimeout(fn.bind(null, args), ms);

    return () => {
      // if args change then clear timeout
      clearTimeout(handle);
    };
  }, [fn, ms, args]);
};

export default useDebounce;
export { useDebounceFunction };

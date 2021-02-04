import { useEffect } from 'react';
import { RecoilState, useRecoilState, useResetRecoilState } from 'recoil';
import { useDebounce } from 'use-debounce';

interface DebouncedSearchStateParams {
  searchState: RecoilState<string>;
  debouncedSearchState: RecoilState<string | undefined>;
  timeout: number;
}

export const useDebouncedSearchState = ({
  searchState,
  debouncedSearchState,
  timeout,
}: DebouncedSearchStateParams) => {
  const [query, setQuery] = useRecoilState(searchState);
  const [debouncedValue] = useDebounce(query, timeout);
  const [debouncedQuery, setDebouncedQuery] = useRecoilState(debouncedSearchState);
  const resetDebouncedSearch = useResetRecoilState(debouncedSearchState);

  useEffect(() => {
    setDebouncedQuery(debouncedValue);
  }, [debouncedValue]);

  return { debouncedQuery, query, setQuery, resetDebouncedSearch };
};

export default useDebouncedSearchState;

import { useEffect } from 'react';
import { usePageSearchIndex } from '@osu-wams/hooks';
import { useRecoilState } from 'recoil';
import { pageSearchIndexState } from 'src/state';

export const useSearchIndexState = () => {
  const api = usePageSearchIndex();
  const [pageSearchIndex, setPageSearchIndex] = useRecoilState(pageSearchIndexState);

  useEffect(() => {
    const { isLoading, isSuccess, isError, data } = api;
    // Only reset application state when the api has returned new data that isn't already set
    if (isSuccess && data && data !== pageSearchIndex.data) {
      setPageSearchIndex({ data, isLoading, isSuccess, isError });
    }
  }, [api.data, api.isSuccess]);

  return { pageSearchIndex, setPageSearchIndex };
};

export default useSearchIndexState;
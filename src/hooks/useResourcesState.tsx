import { useEffect } from 'react';
import { useResources } from '@osu-wams/hooks';
import { useRecoilState } from 'recoil';
import { resourceState } from 'src/state';

export const useResourcesState = () => {
  const api = useResources();
  const [resources, setResources] = useRecoilState(resourceState);

  useEffect(() => {
    const { isError, isLoading, isSuccess, data } = api;
    // Only reset application state when the api has returned new data that isn't already set
    if (isSuccess && data && data !== resources.data) {
      setResources({
        data,
        isLoading,
        isSuccess,
        isError,
      });
    }
  }, [api.data, api.isSuccess]);

  return { resources, setResources };
};

export default useResourcesState;

import { useEffect } from 'react';
import { State, useResources } from '@osu-wams/hooks';
import { useRecoilState } from 'recoil';

export const useResourcesState = () => {
  const api = useResources();
  const [resources, setResources] = useRecoilState(State.resourceState);

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

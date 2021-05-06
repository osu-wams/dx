import { useEffect } from 'react';
import { State, useTrainings } from '@osu-wams/hooks';
import { useRecoilState } from 'recoil';

export const useTrainingsState = () => {
  const api = useTrainings();
  const [trainings, setTrainings] = useRecoilState(State.trainingState);

  useEffect(() => {
    const { isError, isLoading, isSuccess, data } = api;
    // Only reset application state when the api has returned new data that isn't already set
    if (isSuccess && data && data !== trainings.data) {
      setTrainings({
        data,
        isLoading,
        isSuccess,
        isError,
      });
    }
  }, [api.data, api.isSuccess]);

  return { trainings, setTrainings };
};

export default useTrainingsState;

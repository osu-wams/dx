import { useEffect } from 'react';
import { State, useGrades } from '@osu-wams/hooks';
import { useRecoilState } from 'recoil';

export const useGradesState = () => {
  const api = useGrades();
  const [grades, setGrades] = useRecoilState(State.gradesState);

  useEffect(() => {
    const { isError, isLoading, isSuccess, data } = api;
    // Only reset application state when the api has returned new data that isn't already set
    if (isSuccess && data && data !== grades.data) {
      setGrades({ data, isLoading, isSuccess, isError });
    }
  }, [api.data, api.isSuccess]);

  return { grades, setGrades };
};

export default useGradesState;

import { useEffect } from 'react';
import { State, useCourseSchedule } from '@osu-wams/hooks';
import { useRecoilState } from 'recoil';

export const useCourseScheduleState = () => {
  const api = useCourseSchedule();
  const [courses, setCourses] = useRecoilState(State.courseState);

  useEffect(() => {
    const { isError, isLoading, isSuccess, data } = api;
    // Only reset application state when the api has returned new data that isn't already set
    if (isSuccess && data && data !== courses.data) {
      setCourses({ data, isLoading, isSuccess, isError });
    }
  }, [api.data, api.isSuccess]);

  return { courses, setCourses };
};

export default useCourseScheduleState;

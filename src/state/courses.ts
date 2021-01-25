import { atom } from 'recoil';
import { Types } from '@osu-wams/lib';

export const courseState = atom<{
  data: Types.CourseSchedule[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}>({
  key: 'courseState',
  default: { data: [], isLoading: true, isSuccess: false, isError: false },
});

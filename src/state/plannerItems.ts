import { atom } from 'recoil';
import { Types } from '@osu-wams/lib';

export const plannerItemState = atom<{
  data: Types.PlannerItem[];
  isLoading: boolean;
  error: Error | null;
  isSuccess: boolean;
  isError: boolean;
}>({
  key: 'plannerItemState',
  default: { data: [], isLoading: false, error: null, isError: false, isSuccess: false },
});

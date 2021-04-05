import { atom } from 'recoil';
import { Types } from '@osu-wams/lib';

export const pageSearchIndexState = atom<{
  data: Types.PageSearchIndex[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}>({
  key: 'pageSearchIndexState',
  default: { data: [], isLoading: true, isSuccess: false, isError: false },
});

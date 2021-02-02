import { atomFamily, SerializableParam } from 'recoil';
import { Types } from '@osu-wams/lib';

interface LocalistEventParam extends Readonly<{ [key: string]: SerializableParam }> {
  campus?: SerializableParam;
  affiliation?: SerializableParam;
}

export const localistEventsState = atomFamily<
  {
    data: Types.LocalistEvent[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    param: LocalistEventParam;
  },
  LocalistEventParam
>({
  key: 'localistEventsState',
  default: (param) => ({
    data: [],
    isLoading: true,
    isSuccess: false,
    isError: false,
    param,
  }),
});

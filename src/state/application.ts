import { atom } from 'recoil';
import { User } from '@osu-wams/hooks';
import { Types } from '@osu-wams/lib';
import { defaultTheme } from 'src/theme/themes';

export const userState = atom<Types.UserState>({
  key: 'userState',
  default: { data: User.INITIAL_USER, loading: true, error: false },
});

export const themeState = atom<string>({
  key: 'themeState',
  default: defaultTheme,
});

export const infoButtonState = atom<{ content: string; id: string; title: string }[]>({
  key: 'infoButtonState',
  default: [],
});

export const plannerItemState = atom<{
  data: Types.PlannerItem[];
  isLoading: boolean;
  error: Error | null;
}>({
  key: 'plannerItemState',
  default: { data: [], isLoading: false, error: null },
});

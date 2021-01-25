import { atom } from 'recoil';
import { User } from '@osu-wams/hooks';
import { Types } from '@osu-wams/lib';
import { defaultTheme } from 'src/theme/themes';

export const userState = atom<Types.UserState>({
  key: 'userState',
  default: { data: User.INITIAL_USER, loading: true, error: false },
});

export const categoryState = atom<{
  data: Types.Category[];
  isLoading: boolean;
  isSuccess: boolean;
}>({
  key: 'categoryState',
  default: { data: [], isLoading: true, isSuccess: false },
});

export const selectedCategoryState = atom<string>({
  key: 'selectedCategoryState',
  default: '',
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
  isSuccess: boolean;
  isError: boolean;
}>({
  key: 'plannerItemState',
  default: { data: [], isLoading: false, error: null, isError: false, isSuccess: false },
});

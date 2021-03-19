import { atom, selector } from 'recoil';
import { User } from '@osu-wams/hooks';
import { Types } from '@osu-wams/lib';
import { defaultTheme } from 'src/theme/themes';

export const isLoadedState = atom<boolean>({
  key: 'isLoadedState',
  default: false,
});

export const initialRouteState = atom<string>({
  key: 'initialRouteState',
  default: '',
});

export const dashboardState = atom<{ affiliation: string; navigateTo: string }>({
  key: 'dashboardState',
  default: { affiliation: User.AFFILIATIONS.student, navigateTo: `/${User.AFFILIATIONS.student}` },
});

export const userState = atom<Types.UserState>({
  key: 'userState',
  default: { data: User.INITIAL_USER, loading: true, error: false },
});

export const isEmployeeState = selector<boolean>({
  key: 'isEmployeeState',
  get: ({ get }) => {
    const user = get(userState);
    if (!user.data.osuId) return false;
    return user.data.affiliations.indexOf('employee') > -1;
  },
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

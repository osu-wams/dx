import { atomFamily, selectorFamily } from 'recoil';
import { Types } from '@osu-wams/lib';

export const ANNOUNCEMENT_PAGES = {
  academics: 'academics',
  dashboard: 'dashboard',
  finances: 'finances',
};

export const announcementsFilterState = atomFamily<{ affiliation?: string; page: string }, string>({
  key: 'announcementsPageFilterState',
  default: (param) => ({
    affiliation: undefined,
    page: param,
  }),
});

export const announcementState = atomFamily<
  {
    data: Types.Announcement[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    page: string;
  },
  string
>({
  key: 'announcementState',
  default: (param) => ({
    data: [],
    isLoading: true,
    isSuccess: false,
    isError: false,
    page: param,
  }),
});

export const filteredAnnouncements = selectorFamily<Types.Announcement[], string>({
  key: 'filteredAnnouncements',
  get: (param) => ({ get }) => {
    const page = param.toLowerCase();
    const announcements = get(announcementState(page));
    const { affiliation: aff } = get(announcementsFilterState(page));
    if (!aff) return announcements.data;

    const filtered = announcements.data.filter(({ affiliation }) => {
      if (!affiliation || affiliation.length === 0) return true;

      return affiliation.findIndex((s) => s.toLowerCase().includes(aff)) > -1;
    });
    return filtered;
  },
});

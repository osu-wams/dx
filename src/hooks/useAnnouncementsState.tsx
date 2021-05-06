import { useEffect } from 'react';
import { State, User, useAnnouncements } from '@osu-wams/hooks';
import { useRecoilState, useRecoilValue } from 'recoil';

const { announcementsFilterState, announcementState, filteredAnnouncements, userState } = State;
const { getAffiliation } = User;

export const useAnnouncementsState = (page: string) => {
  const api = useAnnouncements(page);
  const [announcements, setAnnouncements] = useRecoilState(announcementState(page));

  const user = useRecoilValue(userState);
  const [filter, setFilter] = useRecoilState(announcementsFilterState(page));
  const filtered = useRecoilValue(filteredAnnouncements(page));

  useEffect(() => {
    if (!user.loading) {
      const affiliation = getAffiliation(user.data);
      if (!filter.affiliation || (filter.affiliation && filter.affiliation !== affiliation)) {
        setFilter({ affiliation, page });
      }
    }
  }, [filter, user.data, user.loading]);

  useEffect(() => {
    const { isError, isLoading, isSuccess, data } = api;
    // Only reset application state when the api has returned new data that isn't already set
    if (isSuccess && data && data !== announcements.data) {
      setAnnouncements({ data, isLoading, isSuccess, isError, page });
    }
  }, [api.data, api.isSuccess]);

  return { announcements, setAnnouncements, filtered };
};

export default useAnnouncementsState;

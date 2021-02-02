import { useEffect } from 'react';
import { Constants, useCampusEvents } from '@osu-wams/hooks';
import { useRecoilState } from 'recoil';
import { localistEventsState } from 'src/state/events';

export const useCampusEventsState = (campus: string) => {
  const api = useCampusEvents(campus, {
    ...Constants.REACT_QUERY_DEFAULT_CONFIG,
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 30,
  });
  const [events, setEvents] = useRecoilState(localistEventsState({ campus }));

  useEffect(() => {
    const { isError, isLoading, isSuccess, data } = api;
    // Only reset application state when the api has returned new data that isn't already set
    if (isSuccess && data && data !== events.data) {
      setEvents({ data, isLoading, isSuccess, isError, param: { campus } });
    }
  }, [api.data, api.isSuccess]);

  return { events, setEvents };
};

export default useCampusEventsState;

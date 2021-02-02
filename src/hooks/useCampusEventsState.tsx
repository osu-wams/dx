import { useEffect } from 'react';
import { useCampusEvents } from '@osu-wams/hooks';
import { useRecoilState } from 'recoil';
import { localistEventsState } from 'src/state/events';

export const useCampusEventsState = (campus: string) => {
  const api = useCampusEvents(campus);
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

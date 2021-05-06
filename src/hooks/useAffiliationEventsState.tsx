import { useEffect } from 'react';
import { State, Constants, useAffiliationEvents } from '@osu-wams/hooks';
import { useRecoilState } from 'recoil';

export const useAffiliationEventsState = (affiliation: string) => {
  const api = useAffiliationEvents(affiliation, {
    ...Constants.REACT_QUERY_DEFAULT_CONFIG,
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 30,
  });
  const [events, setEvents] = useRecoilState(State.localistEventsState({ affiliation }));

  useEffect(() => {
    const { isError, isLoading, isSuccess, data } = api;
    // Only reset application state when the api has returned new data that isn't already set
    if (isSuccess && data && data !== events.data) {
      setEvents({ data, isLoading, isSuccess, isError, param: { affiliation } });
    }
  }, [api.data, api.isSuccess]);

  return { events, setEvents };
};

export default useAffiliationEventsState;

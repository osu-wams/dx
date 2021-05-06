import { useEffect } from 'react';
import { State, useCards } from '@osu-wams/hooks';
import { useRecoilState } from 'recoil';

export const useCardsState = () => {
  const api = useCards();
  const [cards, setCards] = useRecoilState(State.dynamicCardState);

  useEffect(() => {
    const { isLoading, isSuccess, data } = api;
    // Only reset application state when the api has returned new data that isn't already set
    if (isSuccess && data && data !== cards.data) {
      setCards({ data, isLoading, isSuccess });
    }
  }, [api.data, api.isSuccess]);

  return { cards, setCards };
};

export default useCardsState;

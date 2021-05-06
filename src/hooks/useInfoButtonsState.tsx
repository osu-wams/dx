import { useEffect } from 'react';
import { State, useInfoButtons } from '@osu-wams/hooks';
import { useRecoilState } from 'recoil';

export const useInfoButtonsState = () => {
  const api = useInfoButtons();
  const [infoButtons, setInfoButtons] = useRecoilState(State.infoButtonState);

  useEffect(() => {
    const { data } = api;
    // Only reset application state when the api has returned new data that isn't already set
    if (data && data !== infoButtons) {
      setInfoButtons(data);
    }
  }, [api.data]);

  return { infoButtons, setInfoButtons };
};

export default useInfoButtonsState;

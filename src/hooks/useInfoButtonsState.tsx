import { useEffect } from 'react';
import { useInfoButtons } from '@osu-wams/hooks';
import { useRecoilState } from 'recoil';
import { infoButtonState } from 'src/state';

export const useInfoButtonsState = () => {
  const api = useInfoButtons();
  const [infoButtons, setInfoButtons] = useRecoilState(infoButtonState);

  useEffect(() => {
    const { data } = api;
    // Only reset application state when the api has returned new data that isn't already set
    if (data && data !== infoButtons.data) {
      setInfoButtons({ data });
    }
  }, [api.data]);

  return { infoButtons, setInfoButtons };
};

export default useInfoButtonsState;

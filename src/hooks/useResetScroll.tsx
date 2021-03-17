import React from 'react';
import { useLocation, useNavigate } from '@reach/router';

export const useResetScroll = () => {
  const navigate = useNavigate();
  const { href, state } = useLocation();

  const updateState = React.useCallback(() => {
    navigate(href, {
      // @ts-ignore spread object
      state: { ...state, scrolled: true },
      replace: true,
    }).then(() => window.scrollTo(0, 0));
  }, [href, state, navigate]);

  React.useLayoutEffect(() => {
    // @ts-ignore type unknown
    if (state && !state?.scrolled) {
      updateState();
    }
  }, [state, updateState]);
};

export default useResetScroll;

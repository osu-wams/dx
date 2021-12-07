import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useResetScroll = () => {
  const navigate = useNavigate();
  const { state, pathname } = useLocation();

  const updateState = React.useCallback(() => {
    navigate(pathname, {
      // @ts-ignore spread object
      state: { ...state, scrolled: true },
      replace: true,
    });
    window.scrollTo(0, 0);
  }, [pathname, state, navigate]);

  React.useLayoutEffect(() => {
    // @ts-ignore type unknown
    if (!state) {
      updateState();
    }
  }, [state, updateState]);
};

export default useResetScroll;

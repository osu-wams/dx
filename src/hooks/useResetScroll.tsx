import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useResetScroll = () => {
  const navigate = useNavigate();
  const { state, pathname } = useLocation();

  React.useEffect(() => {
    // @ts-ignore type unknown
    if (!state) {
      navigate(pathname, {
        // @ts-ignore spread object
        state: { ...state, scrolled: true },
        replace: true,
      });
      window.scrollTo(0, 0);
    }
  }, [pathname, state, navigate]);
};

export default useResetScroll;

import { useState, useEffect } from 'react';
import { useMediaQuery as mq } from 'react-responsive';
import { breakpoints } from 'src/theme';

const useMediaQuery = (query, defaultState = false) => {
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    let mounted = true;
    const mql = window.matchMedia(query);
    const onChange = () => {
      if (!mounted) return;
      setState(!!mql.matches);
    };

    mql.addListener(onChange);
    setState(mql.matches);

    return () => {
      mounted = false;
      mql.removeListener(onChange);
    };
  }, [query]);

  return state;
};

export default useMediaQuery;

// Converts our theme px values to intergers
const desktop = parseInt(breakpoints.small, 10);
const mobile = desktop - 1;

// <Mobile> component to wrap things only for mobile
const Mobile = ({ children }) => {
  const isMobile = mq({ maxWidth: mobile });
  return isMobile ? children : null;
};

// <Desktop> component to wrap things only for desktop
const Desktop = ({ children }) => {
  const isNotMobile = mq({ minWidth: desktop });
  return isNotMobile ? children : null;
};

export { Mobile, Desktop, mobile, desktop };

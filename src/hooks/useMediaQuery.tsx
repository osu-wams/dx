import { useMediaQuery } from 'react-responsive';
import { breakpoints } from '@osu-wams/theme';

// Converts our theme px values to intergers
const desktop = parseInt(breakpoints.small, 10);
const mobile = desktop - 1;

// <Mobile> component to wrap things only for mobile
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: mobile });
  return isMobile ? children : null;
};

// <Desktop> component to wrap things only for desktop
const Desktop = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: desktop });
  return isNotMobile ? children : null;
};

export { Mobile, Desktop, mobile, desktop };

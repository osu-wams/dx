import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import VisuallyHidden from '@reach/visually-hidden';
import { ThemeContext } from 'styled-components/macro';

/**
 * Loading component wrapper for React Loading Skeleton
 * @param lines number of lines for the skeleton placeholder
 * #700 for dark mode color highlight, #800 for the background
 * light: #300 for background, #200 for highlight
 */
const Loading: React.FC<{ lines?: number }> = ({ lines = 1, ...props }) => {
  const themeContext = React.useContext(ThemeContext);
  return (
    <SkeletonTheme
      color={themeContext.ui.skeleton.color}
      highlightColor={themeContext.ui.skeleton.highlight}
    >
      <VisuallyHidden>Loading...</VisuallyHidden>
      <Skeleton count={lines} {...props} />
    </SkeletonTheme>
  );
};

export { Loading };

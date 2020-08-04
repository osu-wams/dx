import React from 'react';
import styled from 'styled-components/macro';
import { spacing, breakpoints } from 'src/theme';
import { motion } from 'framer-motion';

/* Page Grid
 * Single column for mobile. 2 column for Desktop
 * Grid specific code is now mostly in the Masonry file
 * SecondGrid wrapper used for Announcements and Events
 */
const MainGridWrapperStyles = styled(motion.div)`
  border-top: 1px solid ${({ theme }) => theme.mainGrid.borderTop};
  background-color: ${({ theme }) => theme.mainGrid.background};
  padding: 1rem ${spacing.mobile} 2rem;
  @media (min-width: ${breakpoints.small}) {
    padding: ${spacing.desktop};
  }
`;

const MainGridWrapper = ({ children, ...props }) => {
  const opacityAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <MainGridWrapperStyles
      initial="hidden"
      animate="visible"
      variants={opacityAnimation}
      {...props}
    >
      {children}
    </MainGridWrapperStyles>
  );
};
const MainGrid = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: ${breakpoints.large};
`;

const SecondGridWrapper = styled.div`
  background-color: ${({ theme }) => theme.secondGrid.background};
  border-top: 1px solid ${({ theme }) => theme.secondGrid.borderTop};
  padding: 2rem ${spacing.mobile};
  flex: 1; /* Fill all available vertical space */
  @media (min-width: ${breakpoints.small}) {
    padding: 4rem ${spacing.desktop};
  }
`;

export { MainGridWrapper, MainGrid, SecondGridWrapper };

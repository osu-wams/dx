import React, { useRef, useState, useEffect } from 'react';
import { themeSettings, breakpoints, styled } from '../theme';
import useMediaQuery from '../util/useMediaQuery';

/* Page Grid
 * Single column for mobile. 2 column for Desktop
 * Provides row-span and col-span classes to modify width or height of children elements
 */
const PageGridWrapper = styled.div`
  background-color: ${({ theme }) => theme.mainGrid.background};
  height: 100%;
`;
const MainGridWrapper = styled.div`
  border-top: 1px solid ${({ theme }) => theme.mainGrid.borderTop};
  background-color: ${({ theme }) => theme.mainGrid.background};
  padding: 1rem ${themeSettings.spacing.mobile} 2rem;
  @media (min-width: ${breakpoints[768]}) {
    padding: ${themeSettings.spacing.desktop};
  }
`;
const MainGrid = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: ${breakpoints[1024]};
  display: grid;
  grid-template-columns: 1fr;
  @media (min-width: ${breakpoints[768]}) {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: ${themeSettings.spacing.desktop};
  }
`;

const MainGridCol = styled.div`
  @media (min-width: ${breakpoints[768]}) {
    &.col-span-2 {
      grid-column: 1 / 3;
    }
  }
  /* We might need to do something for individual columns
   * right now just keeping the name so it's obvious
   */
`;

const SecondGridWrapper = styled.div`
  background-color: ${({ theme }) => theme.secondGrid.background};
  border-top: 1px solid ${({ theme }) => theme.secondGrid.borderTop};
  padding: 2rem ${themeSettings.spacing.mobile};
  flex: 1; /* Fill all available vertical space */
  @media (min-width: ${breakpoints[768]}) {
    padding: 4rem ${themeSettings.spacing.desktop};
  }
`;

// Masonry
const MasonryDiv = styled.div`
  display: grid;
  grid-auto-flow: column;
  max-width: 1024px;
  margin: 0 auto;
  grid-gap: ${themeSettings.spacing.desktop};
`;

const Col = styled.div`
  display: grid;
  grid-gap: ${themeSettings.spacing.desktop};
  grid-auto-rows: max-content;
`;

const Masonry = ({ children }) => {
  const cols = Array;
  const ref = useRef<HTMLDivElement>(null);
  const numCols = 2;
  // If we want to allow for 3 columns later...

  // const [numCols, setNumCols] = useState(2);
  // const [timerId, setTimerId] = useState(0);
  // const minWidth = 330;

  // const calcNumCols = () => {
  //   clearTimeout(timerId);
  //   const newTimerId = setTimeout(() => {
  //     setNumCols(Math.floor(ref.current.offsetWidth / minWidth));
  //   }, 1000);
  //   setTimerId(newTimerId);
  // };
  // useEffect(() => {
  //   window.addEventListener(`resize`, calcNumCols);
  //   calcNumCols();
  //   return () => window.removeEventListener(`resize`, calcNumCols);
  // }, []);

  const createCols = () => {
    for (let i = 0; i < numCols; i++) cols[i] = [];
    children.forEach((child, i) => cols[i % numCols].push(child));
  };

  const isMobile = !useMediaQuery('(min-width: 768px)');

  createCols();
  if (isMobile) {
    return <MainGrid>{children}</MainGrid>;
  } else {
    return (
      <MasonryDiv ref={ref}>
        {Array(numCols)
          .fill('')
          .map((el, i) => (
            <Col key={i}>{cols[i]}</Col>
          ))}
      </MasonryDiv>
    );
  }
};

export { Masonry, MainGridWrapper, MainGrid, MainGridCol, SecondGridWrapper, PageGridWrapper };

import React, { useRef } from 'react';
import { themeSettings, breakpoints, styled } from '../../theme';

const MasonryDiv = styled.div`
  @media (min-width: ${breakpoints[768]}) {
    display: grid;
    grid-auto-flow: column;
    max-width: ${breakpoints[1024]};
    margin: 0 auto;
    grid-gap: ${themeSettings.spacing.desktop};
    grid-template-columns: 1fr 1fr;
  }
`;

const Col = styled.div`
  display: grid;
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
  //     setNumCols(Math.floor(ref.current!.offsetWidth / minWidth));
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

  createCols();

  return (
    <MasonryDiv ref={ref}>
      {Array(numCols)
        .fill('')
        .map((el, i) => (
          <Col key={i}>{cols[i]}</Col>
        ))}
    </MasonryDiv>
  );
};

export { Masonry };

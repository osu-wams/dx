import React from 'react';
import styled from 'styled-components';
import useMediaQuery from '../util/useMediaQuery';
import { Color } from '../theme';

const Overview = styled.div`
  line-height: 1.4;
  margin-bottom: 40px;
`;

const OverviewHeaderWrapper = styled.div`
  width: 100%;
  text-align: ${props => (props.isMobile ? 'left' : 'center')};
  font-weight: bold;
  font-family: 'Stratum2', sans-serif;
  font-size: 24px;
  margin-bottom: 1rem;
`;

const OverviewHeader = ({ ...props }) => {
  const isMobile = !useMediaQuery('(min-width: 768px)');
  return <OverviewHeaderWrapper isMobile={isMobile} {...props} />;
};

const OverviewContentWrapper = styled.div`
  display: flex;
  justify-content: ${props => (props.isMobile ? 'normal' : 'space-around')};
  align-items: ${props => (props.isMobile ? 'normal' : 'center')};
  & > div:last-child {
    margin-left: ${props => (props.isMobile ? 'auto' : 0)};
  }
`;

const OverviewContent = ({ ...props }) => {
  const isMobile = !useMediaQuery('(min-width: 768px)');
  return <OverviewContentWrapper {...props} isMobile={isMobile} />;
};

const OverviewSection = ({ children, ...props }) => {
  const isMobile = !useMediaQuery('(min-width: 768px)');

  // Add an extra wrapper on smaller devices to group items into columns
  if (isMobile) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'normal'
        }}
        {...props}
      >
        {children}
      </div>
    );
  }

  return children;
};

// Consider doing our own font component globally
const OverviewItem = styled.div`
  .l {
    font-size: 3rem;
  }
  .xl {
    font-size: 4rem;
  }
`;

const OverviewItemLabel = styled.div`
  color: ${props => props.color || Color['orange-400']};
  font-size: 14px;
  font-weight: bold;
`;

export {
  Overview,
  OverviewHeader,
  OverviewContent,
  OverviewSection,
  OverviewItem,
  OverviewItemLabel
};

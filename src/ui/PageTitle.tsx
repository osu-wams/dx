import React, { FC } from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { Color, theme, breakpoints } from '../theme';

type Props = {
  title: string;
};

// Page title for all our pages
// Currently hidden and just for accessibility purposes
const PageTitle: FC<Props> = ({ title }) => (
  <>
    <Title>{title}</Title>
    <Helmet>
      <title>{title}</title>
    </Helmet>
  </>
);

const Title = styled.h1`
  font-family: Stratum2, sans-serif;
  font-size: ${theme.fontSize[24]};
  color: ${Color['neutral-600']};
  font-weight: normal;
  line-height: 43px;
  margin: 0 auto;
  max-width: 1024px;
  @media (min-width: ${breakpoints[768]}) {
    font-size: ${theme.fontSize[36]};
    margin-bottom: 1rem;
  }
`;

export default PageTitle;
export { Title };

import React, { FC } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { themeSettings, breakpoints, styled } from '../theme';

type Props = {
  title: string;
};

// Page title for all our pages
// Currently hidden and just for accessibility purposes
const PageTitle: FC<Props> = ({ title }) => {
  return (
    <HelmetProvider>
      <Title>{title}</Title>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </HelmetProvider>
  );
};

const Title = styled.h1`
  font-size: ${themeSettings.fontSize[20]};
  color: ${({ theme }) => theme.ui.pageTitle.color};
  font-weight: normal;
  line-height: 30px;
  margin: 0 auto;
  max-width: ${breakpoints.large};
  padding-bottom: 1rem;
  @media (min-width: ${breakpoints.small}) {
    margin-bottom: 1rem;
  }
`;

export default PageTitle;
export { Title };

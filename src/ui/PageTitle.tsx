import React, { FC } from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { Color, theme } from '../theme';

type Props = {
  title: string;
};

// Page title for all our pages
// Currently hidden and just for accessibility purposes
const PageTitle: FC<Props> = ({ title }) => (
  <>
    <Title>
      {title}
    </Title>
    <Helmet>
      <title>{title}</title>
    </Helmet>
  </>
);

const Title = styled.h1`
  font-family: Stratum2
  font-size: ${theme.fontSize[36]};
  font-color: ${Color["neutral-700"]};
  font-weight: normal;
  line-height: 43px;
  margin-bottom: ${theme.spacing.unit};
`;


export default PageTitle;

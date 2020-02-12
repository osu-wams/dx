import React, { FC } from 'react';
import { faFlaskPotion } from '@fortawesome/pro-light-svg-icons';
import { themeSettings, styled } from '../../theme';
import { Card, CardHeader, CardContent, CardIcon, CardFooter } from '../../ui/Card';
import { usePageContent } from '@osu-wams/hooks';

const BetaInfo: FC = () => {
  const pageContent = usePageContent('beta');

  return (
    <Card collapsing={false}>
      <CardHeader title="Dashboard Beta" badge={<CardIcon icon={faFlaskPotion} />} />
      <CardContent>
        <BetaTitle>{pageContent.data[0]?.title}</BetaTitle>
        <DashboardBetaContent
          dangerouslySetInnerHTML={{ __html: pageContent.data[0]?.content }}
        ></DashboardBetaContent>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

const BetaTitle = styled.h3`
  color: ${({ theme }) => theme.features.beta.title.color};
  font-size: ${themeSettings.fontSize['18']};
  font-weight: normal;
  margin: 0px;
`;

const DashboardBetaContent = styled.div`
  ul,
  ol {
    margin: ${themeSettings.spacing.unit}px 0 0 0;
    padding: 0 0 0 2.8rem;
    font-size: ${themeSettings.fontSize[14]};
  }
  li {
    margin-bottom: ${themeSettings.spacing.unit}px;
  }
  a {
    color: ${({ theme }) => theme.features.beta.title.color};
    &:active,
    &:focus,
    &:hover {
      text-decoration: none;
    }
  }
`;

export default BetaInfo;

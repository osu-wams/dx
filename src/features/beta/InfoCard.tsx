import React, { FC } from 'react';
import styled from 'styled-components';
import { faFlaskPotion } from '@fortawesome/pro-light-svg-icons';
import { Color, theme } from '../../theme';
import { Card, CardHeader, CardContent, CardIcon, CardFooter } from '../../ui/Card';

const BetaInfo: FC = () => {
  return (
    <Card collapsing={false}>
      <CardHeader title="Dashboard Beta" badge={<CardIcon icon={faFlaskPotion} />} />
      <CardContent>
        <BetaTitle>Welcome!</BetaTitle>
        <DashboardBetaContentP>
          This is the beta release of an all-new student portal, intended to (eventually!) replace
          MyOSU and lay the foundation for your OSU digital experience. Here are a few of
          my.oregonstate.edu&#39;s key features:
        </DashboardBetaContentP>
        <DashboardBetaStyledList>
          <li>
            Home, where you can see what’s coming up in your courses, access commonly used systems,
            and find events and announcements from across campus
          </li>
          <li>
            Academics, where you can track your GPA and academic standing, and see what’s due in
            Canvas
          </li>
          <li>
            Finances, where you can track your OSU account transactions, set up direct deposit and
            pay your bills
          </li>
          <li>
            Resources, where you can find a comprehensive list of links to the various services and
            resources you need
          </li>
        </DashboardBetaStyledList>
        <DashboardBetaContentP>
          This is still a beta release, and while we plan to add new features and a greater level of
          personalization in the future, we want to hear from you now about your experience. This is
          YOUR dashboard — what would you like to see on this site? Notice any problems or bugs? You
          can switch back to <DashboardBetaContentA href='https://myosu.oregonstate.edu' target='_blank'>MyOSU</DashbaordBetaContentA> if you&#39;re not finding what you need on the new
          dashboard (but drop us a line and tell us what&#39;s missing!). Explore away, and please send
          us your questions and <DashboardBetaContentA href='http://localhost:3000/beta#CHANGE-WHEN-READY' target='_blank'>feedback</DashbaordBetaContentA>!
        </DashboardBetaContentP>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

const DashboardBetaContentP = styled.p`
  font-size: ${theme.fontSize['16']};
  margin: ${theme.spacing.unit}px 0 0 0;
`;
const DashboardBetaStyledList = styled.ul`
  margin: ${theme.spacing.unit}px 0 0 0;
  padding: 0 0 0 2.8rem;
`;
const DashboardBetaContentA = styled.a`
:hover,
  :active,
  :focus {
    text-decoration: underline;
  }
  text-decoration: none;
  color: ${Color['orange-400']};
`;
const BetaTitle = styled.h3`
  color: ${Color['orange-400']};
  font-size: ${theme.fontSize['18']};
  font-weight: normal;
  margin: 0px;
`;
export default BetaInfo;

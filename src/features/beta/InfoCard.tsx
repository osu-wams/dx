import React, { FC } from 'react';
import { faFlaskPotion } from '@fortawesome/pro-light-svg-icons';
import { themeSettings, styled } from '../../theme';
import { Card, CardHeader, CardContent, CardIcon, CardFooter } from '../../ui/Card';
import Url from '../../util/externalUrls.data';
import { Event } from '../../util/gaTracking';
import { SimpleExternalLink } from '../../ui/Link';

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
          <BetaStyledListItem>
            Home, where you can see what’s coming up in your courses, access commonly used systems,
            and find events and announcements from across campus
          </BetaStyledListItem>
          <BetaStyledListItem>
            Academics, where you can track your GPA and academic standing, and see what’s due in
            Canvas
          </BetaStyledListItem>
          <BetaStyledListItem>
            Finances, where you can track your OSU account transactions, set up direct deposit and
            pay your bills
          </BetaStyledListItem>
          <BetaStyledListItem>
            Resources, where you can find a comprehensive list of links to the various services and
            resources you need
          </BetaStyledListItem>
        </DashboardBetaStyledList>
        <DashboardBetaContentP>
          This is still a beta release, and while we plan to add new features and a greater level of
          personalization in the future, we want to hear from you now about your experience. This is
          YOUR dashboard — what would you like to see on this site? Notice any problems or bugs? You
          can switch back to{' '}
          <SimpleExternalLink
            href={Url.myosu.main}
            onClick={() => Event('beta-info', 'Go to MyOSU link clicked')}
            target="_blank"
          >
            MyOSU
          </SimpleExternalLink>{' '}
          if you&#39;re not finding what you need on the new dashboard (but drop us a line and tell
          us what&#39;s missing!). Explore away, and please send us your questions and{' '}
          <SimpleExternalLink
            href={Url.feedback.main}
            onClick={() => Event('beta-info', 'Give Feedback link clicked')}
            target="_blank"
          >
            feedback
          </SimpleExternalLink>
          !
        </DashboardBetaContentP>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

const DashboardBetaContentP = styled.p`
  font-size: ${themeSettings.fontSize['16']};
  margin: ${themeSettings.spacing.unit}px 0 0 0;
`;
const DashboardBetaStyledList = styled.ul`
  margin: ${themeSettings.spacing.unit}px 0 0 0;
  padding: 0 0 0 2.8rem;
  font-size: ${themeSettings.fontSize[14]};
`;

const BetaStyledListItem = styled.li`
  margin-bottom: ${themeSettings.spacing.unit}px;
`;

const BetaTitle = styled.h3`
  color: ${({ theme }) => theme.features.beta.title.color};
  font-size: ${themeSettings.fontSize['18']};
  font-weight: normal;
  margin: 0px;
`;
export default BetaInfo;

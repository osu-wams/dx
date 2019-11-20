import React, { FC } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { themeSettings, breakpoints, styled } from '../theme';
import { Event, IComponents } from '../util/gaTracking';

type Props = {
  title: string;
  badge?: {
    title: string;
    href?: string;
    eventCategory?: IComponents;
    eventAction?: string;
    eventLabel?: string;
  };
};

// Page title for all our pages
// Currently hidden and just for accessibility purposes
const PageTitle: FC<Props> = ({ title, badge }) => {
  let showBadge: boolean = false;
  let myBadge;

  if (badge !== undefined) {
    showBadge = true;
    if (badge.href !== undefined) {
      if (badge.eventCategory !== undefined && badge.eventAction !== undefined) {
        myBadge = (
          <Badge
            href={badge.href}
            onClick={() => Event(badge.eventCategory!, badge.eventAction!, badge.eventLabel)}
          >
            {badge.title}
          </Badge>
        );
      } else {
        myBadge = <Badge href={badge.href}>{badge.title}</Badge>;
      }
    } else {
      myBadge = <Badge>{badge.title}</Badge>;
    }
  }

  return (
    <HelmetProvider>
      <Title>
        {title}
        {showBadge && myBadge}
      </Title>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </HelmetProvider>
  );
};

const Title = styled.h1`
  font-family: Stratum2, sans-serif;
  font-size: ${themeSettings.fontSize[24]};
  color: ${({ theme }) => theme.ui.pageTitle.color};
  font-weight: normal;
  line-height: 43px;
  margin: 0 auto;
  max-width: 1024px;
  @media (min-width: ${breakpoints[768]}) {
    font-size: ${themeSettings.fontSize[36]};
    margin-bottom: 1rem;
  }
`;

const Badge = styled.a`
  background-color: ${({ theme }) => theme.ui.pageTitle.badge.background};
  color: ${({ theme }) => theme.ui.pageTitle.badge.color};
  font-size: ${themeSettings.fontSize[14]};
  line-height: ${themeSettings.fontSize[36]};
  vertical-align: middle;
  padding: 3px 6px;
  border-radius: 4px;
  margin-left: 10px;
  font-weight: bold;
  text-decoration: none;
`;

export default PageTitle;
export { Title };

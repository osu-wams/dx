import React, { FC } from 'react';
import { styled, themeSettings } from 'src/theme';
import { Event } from 'src/util/gaTracking';

const Badge = styled.a`
  background-color: ${({ theme }) => theme.ui.siteTitle.badge.background};
  color: ${({ theme }) => theme.ui.siteTitle.badge.color};
  font-size: ${themeSettings.fontSize[12]};
  font-weight: 600;
  line-height: ${themeSettings.fontSize[26]};
  vertical-align: top;
  padding: 1px 6px;
  border-radius: 8px;
  /* normally not a good practice, but this beta link is not meant to be prominent */
  &:focus {
    outline: none;
  }
  margin-left: 6px;
  position: relative;
  top: -3px;
  text-decoration: none;
`;

const BetaBadge: FC<{ title?: string }> = ({ title, ...props }) => {
  return (
    <Badge href="/beta" onClick={() => Event('beta', `${title} beta badge clicked`)}>
      Beta
    </Badge>
  );
};

export { BetaBadge };

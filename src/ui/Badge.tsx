import React, { FC } from 'react';
import { styled, themeSettings } from 'src/theme';
import { Event } from 'src/util/gaTracking';

const Badge = styled.a`
  background-color: ${({ theme }) => theme.ui.siteTitle.badge.background};
  color: ${({ theme }) => theme.ui.siteTitle.badge.color};
  font-size: ${themeSettings.fontSize[12]};
  line-height: ${themeSettings.fontSize[26]};
  vertical-align: top;
  padding: 1px 6px;
  border-radius: 8px;
  margin-left: 1px;
  position: relative;
  top: -6px;
  text-decoration: none;
`;

const BetaBadge: FC<{ title?: string }> = ({ title, ...props }) => {
  return (
    <Badge href="/beta" onClick={() => Event('beta', `${title} beta badge clicked`)}>
      beta
    </Badge>
  );
};

export { BetaBadge };

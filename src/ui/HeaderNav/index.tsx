import React from 'react';
import { HeaderNavWrapper } from './HeaderNavStyles';
import { ProfileMenu } from './ProfileMenu';
import { HelpMenu } from './HelpMenu';
import { NotificationsMenu } from './NotificationsMenu';

const HeaderNav = () => {
  return (
    <HeaderNavWrapper>
      {process.env.REACT_APP_EXPERIMENTAL === 'true' && <NotificationsMenu />}
      <HelpMenu />
      <ProfileMenu />
    </HeaderNavWrapper>
  );
};

export { HeaderNav };

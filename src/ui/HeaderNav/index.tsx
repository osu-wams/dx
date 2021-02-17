import React from 'react';
import { HeaderNavWrapper } from './HeaderNavStyles';
import { ProfileMenu } from './ProfileMenu';
import { HelpMenu } from './HelpMenu';
import { NotificationsMenu } from './NotificationsMenu';
import { SearchButton } from './SearchButton';

const HeaderNav = () => {
  return (
    <HeaderNavWrapper>
      <SearchButton />
      <HelpMenu />
      <NotificationsMenu />
      <ProfileMenu />
    </HeaderNavWrapper>
  );
};

export { HeaderNav };

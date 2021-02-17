import React from 'react';
import { HeaderNavWrapper } from './HeaderNavStyles';
import { ProfileMenu } from './ProfileMenu';
import { HelpMenu } from './HelpMenu';
import { NotificationsMenu } from './NotificationsMenu';
import { SearchButton } from './SearchButton';
import { Mobile } from 'src/util/useMediaQuery';

const HeaderNav = () => {
  return (
    <HeaderNavWrapper>
      <Mobile>
        <SearchButton />
      </Mobile>
      <HelpMenu />
      <NotificationsMenu />
      <ProfileMenu />
    </HeaderNavWrapper>
  );
};

export { HeaderNav };

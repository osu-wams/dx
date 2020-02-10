import React from 'react';
import { HeaderNavWrapper } from './HeaderNavStyles';
import { ProfileMenu } from './ProfileMenu';
import { HelpMenu } from './HelpMenu';

const HeaderNav = () => {
  return (
    <HeaderNavWrapper>
      <HelpMenu />
      <ProfileMenu />
    </HeaderNavWrapper>
  );
};

export { HeaderNav };

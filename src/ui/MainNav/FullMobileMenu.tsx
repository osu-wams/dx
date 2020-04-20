import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { faBars } from '@fortawesome/pro-light-svg-icons';
import { fontSize } from 'src/theme';
import Icon from '../Icon';
import MyDialog from '../MyDialog';
import { CloseButton } from 'src/ui/Button';
import { Event } from 'src/util/gaTracking';
import { NavLink } from './MainNavStyles';
import { MobileMenuStudents } from './MobileMenuStudents';
import { BetaBadge } from '../Badge';
import { MobileMenuFooter } from './MobileMenuFooter';

const MobileMenuHeader = styled.div`
  display: flex;
  flex-direction: row;
`;

const MobileMenuClose = styled(CloseButton)`
  float: none;
  padding: 0;
`;

const MobileMenuTitle = styled.h2`
  flex-grow: 2;
  font-size: ${fontSize['24']};
`;

const MobileMenuContent = styled.div`
  font-size: ${fontSize['14']};
`;

const FullMobileMenu = () => {
  const [showFullMenu, toggleFullMenu] = useState(false);
  const title = 'Student Dashboard';
  return (
    <>
      <NavLink
        as="button"
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          toggleFullMenu(true);
          Event('student-navigation-main', 'Menu link clicked');
        }}
      >
        <Icon icon={faBars} />
        Menu
      </NavLink>

      <MyDialog
        isOpen={showFullMenu}
        onDismiss={() => toggleFullMenu(false)}
        aria-labelledby="mobile-menu-title"
      >
        <MobileMenuHeader>
          <MobileMenuTitle id="mobile-menu-title">
            {title}
            <BetaBadge title={title} />
          </MobileMenuTitle>
          <MobileMenuClose onClick={(e: React.MouseEvent<HTMLElement>) => toggleFullMenu(false)} />
        </MobileMenuHeader>
        <MobileMenuContent>
          <MobileMenuStudents toggleFullMenu={() => toggleFullMenu(false)} />
          <MobileMenuFooter toggleFullMenu={() => toggleFullMenu(false)} />
        </MobileMenuContent>
      </MyDialog>
    </>
  );
};

export { FullMobileMenu };

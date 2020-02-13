import React, { useState } from 'react';
import { faBars } from '@fortawesome/pro-light-svg-icons';
import { themeSettings, styled } from '../../theme';
import Icon from '../Icon';
import MyDialog from '../MyDialog';
import { CloseButton } from 'src/ui/Button';
import { Event } from 'src/util/gaTracking';
import { NavLink } from './MainNavStyles';
import { MobileMenuStudents } from './MobileMenuStudents';
import { BetaBadge } from '../Badge';

const DialogHeader = styled.div`
  display: flex;
  flex-direction: row;
`;

const DialogClose = styled(CloseButton)`
  float: none;
  padding: 0;
`;

const DialogTitle = styled.span`
  flex-grow: 2;
  font-size: ${themeSettings.fontSize['24']};
`;

const DialogContent = styled.div`
  font-size: ${themeSettings.fontSize['14']};
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
        aria-labelledby="infobtn-title"
      >
        <DialogHeader>
          <DialogTitle id="infobtn-title">
            {title}
            <BetaBadge title={title} />
          </DialogTitle>
          <DialogClose onClick={(e: React.MouseEvent<HTMLElement>) => toggleFullMenu(false)} />
        </DialogHeader>
        <DialogContent>
          <MobileMenuStudents toggleFullMenu={() => toggleFullMenu(false)} />
        </DialogContent>
      </MyDialog>
    </>
  );
};

export { FullMobileMenu };

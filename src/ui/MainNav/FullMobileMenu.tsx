import React, { useState } from 'react';
import { Link } from '@reach/router';
import {
  faToolbox,
  faFlaskPotion,
  faPlusCircle,
  faUserHeadset,
  faCommentAltCheck,
  faArrowAltSquareLeft,
  faBars
} from '@fortawesome/pro-light-svg-icons';
import VisuallyHidden from '@reach/visually-hidden';
import { themeSettings, styled, ThemeContext } from '../../theme';
import Icon from '../Icon';
import MyDialog from '../MyDialog';
import { AppContext } from 'src/App';
import Button, { CloseButton } from 'src/ui/Button';
import { Event } from 'src/util/gaTracking';
import { InfoButtonState } from '@osu-wams/hooks/dist/api/infoButtons';
import { NavLink } from './MainNavStyles';
import { MobileMenuStudents } from './MobileMenuStudents';

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
          <DialogTitle id="infobtn-title">Student Dashboard</DialogTitle>
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

import React from 'react';
import { Menu, MenuLink, MenuPopover } from '@reach/menu-button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faQuestionCircle,
  faComment,
  faBookOpen,
} from '@fortawesome/pro-light-svg-icons';
import VisuallyHidden from '@reach/visually-hidden';
import Url from 'src/util/externalUrls.data';
import { HeaderNavButton, HeaderNavList } from './HeaderNavStyles';
import { Event } from 'src/util/gaTracking';

const HelpMenu = () => {
  return (
    <Menu>
      <HeaderNavButton
        onClick={() => Event('header', 'help-button-menu', 'Help button menu expanded')}
      >
        <FontAwesomeIcon icon={faQuestionCircle} size="lg" />
          <VisuallyHidden>Help</VisuallyHidden>
        
      </HeaderNavButton>
      <MenuPopover>
        <HeaderNavList>
          <MenuLink
            as="a"
            href={Url.gettingStarted.main}
            target="_blank"
            onClick={() => Event('header', 'help-button-menu', 'Getting started link clicked')}
          >
            <FontAwesomeIcon icon={faBookOpen} />
            Getting Started
          </MenuLink>

          <MenuLink
            as="a"
            href={Url.support.main}
            target="_blank"
            onClick={() => Event('header', 'help-button-menu', 'Get help link clicked')}
          >
            <FontAwesomeIcon icon={faQuestionCircle} />
            Get Help
          </MenuLink>

          <MenuLink
            as="a"
            href={Url.support.main}
            target="_blank"
            onClick={() => Event('header', 'help-button-menu', 'Give feedback link clicked')}
          >
            <FontAwesomeIcon icon={faComment} />
            Give feedback
          </MenuLink>
        </HeaderNavList>
      </MenuPopover>
    </Menu>
  );
};

export { HelpMenu };

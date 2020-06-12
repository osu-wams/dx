import React from 'react';
import { Menu, MenuLink, MenuPopover } from '@reach/menu-button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faQuestionCircle,
  faComment,
  faBookOpen,
} from '@fortawesome/pro-light-svg-icons';
import VisuallyHidden from '@reach/visually-hidden';
import Url from 'src/util/externalUrls.data';
import { HeaderNavButton, HeaderNavText, HeaderNavList } from './HeaderNavStyles';
import { Event } from 'src/util/gaTracking';
import { Mobile, Desktop } from 'src/util/useMediaQuery';

const HelpMenu = () => {
  return (
    <Menu>
      <HeaderNavButton
        onClick={() => Event('header', 'help-button-menu', 'Help button menu expanded')}
      >
        <FontAwesomeIcon icon={faQuestionCircle} size="lg" />
        <Mobile>
          <VisuallyHidden>Help</VisuallyHidden>
        </Mobile>
        <Desktop>
          <HeaderNavText>Help</HeaderNavText>
          <FontAwesomeIcon icon={faChevronDown} size="sm" />
        </Desktop>
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

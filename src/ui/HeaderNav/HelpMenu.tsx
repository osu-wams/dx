import React from 'react';
import { Menu, MenuLink, MenuPopover } from '@reach/menu-button';
import { faQuestionCircle, faComment, faInfoCircle } from '@fortawesome/pro-light-svg-icons';
import VisuallyHidden from '@reach/visually-hidden';
import { Url, Routes } from '@osu-wams/utils';
import { HeaderNavButton, HeaderNavList } from './HeaderNavStyles';
import { Event } from 'src/util/gaTracking';
import Icon from 'src/ui/Icon';
import { Link } from 'react-router-dom';

const HelpMenu = () => {
  return (
    <Menu>
      <HeaderNavButton
        onClick={() => Event('header', 'help-button-menu', 'Help button menu expanded')}
      >
        <Icon icon={faQuestionCircle} size="lg" />
        <VisuallyHidden>Help</VisuallyHidden>
      </HeaderNavButton>
      <MenuPopover>
        <HeaderNavList>
          <MenuLink
            as={Link}
            to={Routes.Routes().about.fullPath}
            onClick={() => Event('header', 'help-button-menu', 'About MyOregonState link clicked')}
          >
            <Icon icon={faInfoCircle} />
            About MyOregonState
          </MenuLink>

          <MenuLink
            as="a"
            href={Url.support.main}
            target="_blank"
            onClick={() => Event('header', 'help-button-menu', 'Get help link clicked')}
          >
            <Icon icon={faQuestionCircle} />
            Get Help
          </MenuLink>

          <MenuLink
            as="a"
            href={Url.support.main}
            target="_blank"
            onClick={() => Event('header', 'help-button-menu', 'Give feedback link clicked')}
          >
            <Icon icon={faComment} />
            Give feedback
          </MenuLink>
        </HeaderNavList>
      </MenuPopover>
    </Menu>
  );
};

export { HelpMenu };

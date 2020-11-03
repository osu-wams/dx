import React from 'react';
import { faQuestionCircle, faComment, faInfoCircle } from '@fortawesome/pro-light-svg-icons';
import Icon from '../Icon';
import { MobileFooter, MobileFooterLink } from './MainNavStyles';
import { Event } from 'src/util/gaTracking';
import Url from 'src/util/externalUrls.data';

const MobileMenuFooter = ({ toggleFullMenu, ...props }) => {
  return (
    <MobileFooter {...props}>
      <MobileFooterLink
        as="a"
        href={Url.support.main}
        onClick={() => {
          toggleFullMenu(false);
          Event('footer-menu-nav', 'Help link clicked');
        }}
      >
        <Icon icon={faQuestionCircle} />
        Help
      </MobileFooterLink>
      <MobileFooterLink
        as="a"
        href={Url.feedback.main}
        onClick={() => {
          toggleFullMenu(false);
          Event('footer-menu-nav', 'Feedback link clicked');
        }}
      >
        <Icon icon={faComment} />
        Feedback
      </MobileFooterLink>
      <MobileFooterLink
        to="about"
        onClick={() => {
          toggleFullMenu(false);
          Event('footer-menu-nav', 'About link clicked');
        }}
      >
        <Icon icon={faInfoCircle} />
        About
      </MobileFooterLink>
    </MobileFooter>
  );
};

export { MobileMenuFooter };

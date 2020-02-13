import React from 'react';
import { faQuestionCircle, faFlask, faComment } from '@fortawesome/pro-light-svg-icons';
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
        to="beta"
        onClick={() => {
          toggleFullMenu(false);
          Event('footer-menu-nav', 'Beta link clicked');
        }}
      >
        <Icon icon={faFlask} />
        Beta
      </MobileFooterLink>
    </MobileFooter>
  );
};

export { MobileMenuFooter };

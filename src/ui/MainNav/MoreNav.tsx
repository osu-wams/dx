import React from 'react';
import { usePopoverState, Popover as PO, PopoverDisclosure as PD } from 'reakit/Popover';
import { Link } from '@reach/router';
import {
  faToolbox,
  faFlaskPotion,
  faPlusCircle,
  faUserHeadset,
  faCommentAltCheck,
  faArrowAltSquareLeft
} from '@fortawesome/pro-light-svg-icons';
import { themeSettings, breakpoints, styled } from '../../theme';
import Icon from '../Icon';
import { Event } from '../../util/gaTracking';
import Url from '../../util/externalUrls.data';

const PopoverDisclosure = styled(PD)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 12px;
  padding: 0 4px;
  line-height: 30px;
  text-decoration: none;
  border: none;
  background-color: ${({ theme }) => theme.header.mainNavList.background};
  cursor: pointer;
  color: ${({ theme }) => theme.header.mainNavList.color};
  & > svg {
    font-size: 24px;
  }
  &:active,
  &:focus,
  &:hover,
  &:active > svg,
  &:focus > svg,
  &:hover > svg,
  &[aria-expanded='true'],
  &[aria-expanded='true'] > svg {
    color: ${({ theme }) => theme.header.mainNavList.hoverColor};
  }
`;

const Popover = styled(PO)`
  border-radius: ${themeSettings.borderRadius[8]};
  background-color: ${({ theme }) => theme.header.mainNavList.popOver.background};
  width: 94%;
  top: 5rem !important;
  z-index: 2;
  @media (min-width: ${breakpoints[768]}) {
    max-width: 600px;
  }
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: row;
  line-height: 30px;
  text-decoration: none;
  color: ${({ theme }) => theme.header.mainNavList.popOver.primaryNav.link.color};
  width: 50%;
  & > svg {
    font-size: 24px;
    margin-right: 1.2rem;
    color: ${({ theme }) => theme.header.mainNavList.popOver.primaryNav.link.svg.color};
  }
`;
const PrimaryNav = styled.div`
  padding: 1.6rem;
  display: flex;
  flex-direction: row;
`;
const SecondaryNav = styled.div`
  background-color: ${({ theme }) => theme.header.mainNavList.popOver.secondaryNav.background};
  border-top: 1px solid ${({ theme }) => theme.header.mainNavList.popOver.secondaryNav.borderTop};
  padding: 1.6rem;
  border-radius: 0 0 0.8rem 0.8rem;
`;

const NavContent = styled.div`
  p {
    margin-top: 0;
    font-size: ${themeSettings.fontSize[14]};
    line-height: 1.8rem;
    color: ${({ theme }) => theme.header.mainNavList.popOver.primaryNav.color};
  }
`;

const SecondaryLink = styled.a`
  display: block;
  color: ${({ theme }) => theme.header.mainNavList.popOver.secondaryNav.link.color};
  padding: 0 0.5rem;
  text-decoration: none;
  & + a {
    margin-top: 1.2rem;
  }
  & > svg {
    margin-right: 1.6rem;
    color: ${({ theme }) => theme.header.mainNavList.popOver.secondaryNav.link.svg.color};
  }
`;

const MoreNav = () => {
  const popover = usePopoverState();

  return (
    <>
      <PopoverDisclosure
        {...popover}
        onClick={() => Event('student-navigation-main', 'More link clicked')}
      >
        <Icon icon={faPlusCircle} /> More
      </PopoverDisclosure>
      <Popover {...popover} aria-label="Other menus">
        <PrimaryNav>
          <NavLink
            to="resources"
            onClick={() => Event('student-navigation-main', 'Resources link clicked')}
          >
            <Icon icon={faToolbox} />
            <NavContent>
              Resources
              <p>Find tools, services, links and more.</p>
            </NavContent>
          </NavLink>
          <NavLink to="beta" onClick={() => Event('student-navigation-main', 'Beta link clicked')}>
            <Icon icon={faFlaskPotion} />
            <NavContent>
              Beta
              <p>Learn more about the new dashboard</p>
            </NavContent>
          </NavLink>
        </PrimaryNav>
        <SecondaryNav>
          <SecondaryLink
            href={Url.support.main}
            target="_blank"
            onClick={() => Event('student-navigation-main', 'Get Support link clicked')}
          >
            <Icon icon={faUserHeadset} />
            Get Support
          </SecondaryLink>
          <SecondaryLink
            href={Url.feedback.main}
            target="_blank"
            onClick={() => Event('student-navigation-main', 'Give Feedback link clicked')}
          >
            <Icon icon={faCommentAltCheck} />
            Give Feedback
          </SecondaryLink>
          <SecondaryLink
            href={Url.myosu.main}
            target="_blank"
            onClick={() => Event('student-navigation-main', 'Go to MyOSU link clicked')}
          >
            <Icon icon={faArrowAltSquareLeft} />
            Go to MyOSU
          </SecondaryLink>
        </SecondaryNav>
      </Popover>
    </>
  );
};

export { MoreNav };

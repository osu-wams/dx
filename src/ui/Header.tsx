import React from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import styled from 'styled-components/macro';
import { Link } from '@reach/router';
import { Event } from 'src/util/gaTracking';
import logo from 'src/assets/osu-logo.svg';
import ecampusLogo from 'src/assets/osu-ecampus.svg';
import cascadesLogo from 'src/assets/osu-cascades.svg';
import logoDark from 'src/assets/osu-logo-dark.svg';
import ecampusLogoDark from 'src/assets/osu-ecampus-dark.svg';
import cascadesLogoDark from 'src/assets/osu-cascades-dark.svg';
import '@reach/menu-button/styles.css';
import MainNav from './MainNav/';
import { HeaderNav } from './HeaderNav';
import { breakpoints, fontSize, spacing } from 'src/theme';
import { User } from '@osu-wams/hooks';
import { User as UserUtil } from '@osu-wams/lib';
import { Types } from '@osu-wams/lib';
import { BetaBadge } from './Badge';
import { arrayIncludes } from 'src/util/helpers';
import { userState, themeState } from 'src/state/application';
import { useRecoilValue } from 'recoil';

const { usersCampus, CAMPUS_CODES } = User;

const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.header.background};
  justify-content: space-between;
  flex-flow: row wrap;
  padding: ${spacing.medium} ${spacing.medium} ${spacing.unit * 1.5}px;
  align-items: center;
  @media (min-width: ${breakpoints.small}) {
    display: block;
    height: 100px;
  }
`;

const Navigation = styled.div`
  @media (min-width: ${breakpoints.small}) {
    padding: 0 ${spacing.desktop};
    /* match main gride color */
    border-top: 1px solid ${({ theme }) => theme.mainGrid.borderTop};
    /* navigation should blend with header background */
    background-color: ${({ theme }) => theme.header.background};
  }
`;

const SiteTitle = styled.header`
  display: none;
  @media (min-width: ${breakpoints.small}) {
    display: block;
    font-size: ${fontSize[20]};
    font-weight: 300;
    margin: 0 auto;
    text-align: center;
    max-width: ${breakpoints.large};
    margin-top: 20px;
  }
  @media (min-width: ${breakpoints.medium}) {
    font-size: ${fontSize[26]};
  }
  @media (min-width: 1750px) {
    text-align: left;
  }
`;

const Logo = styled.img`
  order: 0;
  height: 60px;
  @media (min-width: ${breakpoints.small}) {
    height: 80px;
    position: absolute;
    top: 10px;
    left: 10px;
  }
`;

/**
 * Return the ecampus or cascades logo if the user is identified as belonging to one of those campuses
 * @param user the currently logged in user
 */
const campusLogo = (user: Types.User, selectedTheme: string) => {
  const isDarkMode = selectedTheme === 'dark';
  const osu = 'Oregon State University';
  if (!user) return { image: isDarkMode ? logoDark : logo, alt: osu };

  const { campusCode } = usersCampus(user);
  if (arrayIncludes(CAMPUS_CODES.ecampus, campusCode)) {
    return {
      image: isDarkMode ? ecampusLogoDark : ecampusLogo,
      alt: `${osu} Ecampus`,
    };
  }
  if (arrayIncludes(CAMPUS_CODES.bend, campusCode)) {
    return {
      image: isDarkMode ? cascadesLogoDark : cascadesLogo,
      alt: `${osu} Cascades`,
    };
  }

  return { image: isDarkMode ? logoDark : logo, alt: osu };
};

const mainTitle = (user: Types.User) => {
  let title = 'Student';
  if (!user) return title;
  if (UserUtil.getAffiliation(user) === User.AFFILIATIONS.employee) {
    title = 'Employee';
  }
  return title + ' Dashboard';
};

const Header = () => {
  const user = useRecoilValue(userState);
  const title = mainTitle(user.data);
  const theme = useRecoilValue(themeState);
  const { image, alt } = campusLogo(user.data, theme);
  return (
    <>
      <HeaderWrapper>
        <Link to="/" onClick={() => Event('header', 'Logo Clicked', `type: ${alt}`)}>
          <Logo data-testid="app-header-logo" src={image} alt={alt} />
        </Link>
        <SiteTitle>
          {title}
          <BetaBadge title={title} />
        </SiteTitle>
        <HeaderNav />
      </HeaderWrapper>
      <Navigation>
        <MainNav />
      </Navigation>
    </>
  );
};

export default Header;

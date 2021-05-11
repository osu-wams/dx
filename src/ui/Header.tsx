import React from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import styled from 'styled-components/macro';
import { LocationProvider, Link } from '@reach/router';
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
import { breakpoints, Color, fontSize, spacing } from 'src/theme';
import { State, User } from '@osu-wams/hooks';
import { Types, User as UserUtil } from '@osu-wams/lib';
import { Helpers } from '@osu-wams/utils';
import { useRecoilValue } from 'recoil';
import { Desktop } from 'src/hooks/useMediaQuery';
import ApplicationSearchBar from 'src/features/application-search/ApplicationSearchBar';
import Icon from './Icon';
import { faMask } from '@fortawesome/pro-light-svg-icons';

const { usersCampus, CAMPUS_CODES } = User;
const { userState, themeState } = State;

const MasqueradeBanner = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  background-color: ${Color['roguewave-400']};
  color: ${Color.white};
  font-weight: 200;
  font-size: ${fontSize['14']};
  flex-flow: row;
  padding: 0;
  align-items: center;
  justify-content: center;
  > svg {
    margin-left: ${spacing.medium};
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.header.background};
  justify-content: space-between;
  flex-flow: row wrap;
  padding: ${spacing.medium} ${spacing.medium} ${spacing.unit * 1.5}px;
  align-items: center;
  @media (min-width: ${breakpoints.small}) {
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

const NavHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  align-content: space-between;
  max-width: ${breakpoints.large};
  margin: 0 auto;
`;

const SiteTitle = styled.header`
  display: none;
  @media (min-width: ${breakpoints.small}) {
    display: block;
    font-size: ${fontSize[18]};
    font-weight: 500;
    max-width: ${breakpoints.large};
  }
`;

const Logo = styled.img`
  order: 0;
  height: 60px;
  @media (min-width: ${breakpoints.small}) {
    height: 80px;
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
  if (Helpers.arrayIncludes(CAMPUS_CODES.ecampus, campusCode)) {
    return {
      image: isDarkMode ? ecampusLogoDark : ecampusLogo,
      alt: `${osu} Ecampus`,
    };
  }
  if (Helpers.arrayIncludes(CAMPUS_CODES.bend, campusCode)) {
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
  const dashboardLink = `/${User.getAffiliation(user.data).toLowerCase()}`;

  return (
    <LocationProvider>
      {user.data.isMasquerade && (
        <MasqueradeBanner data-testid="masquerade-banner">
          Masqueraded as{' '}
          {Helpers.titleCase(user.data.primaryAffiliation ?? user.data.primaryAffiliationOverride)}
          <Icon icon={faMask} color={Color.white} />
        </MasqueradeBanner>
      )}
      <HeaderWrapper>
        <Link to={dashboardLink} onClick={() => Event('header', 'Logo Clicked', `type: ${alt}`)}>
          <Logo data-testid="app-header-logo" src={image} alt={alt} />
        </Link>
        <Desktop>
          <ApplicationSearchBar />
        </Desktop>
        <HeaderNav />
      </HeaderWrapper>
      <Navigation>
        <NavHeaderWrapper>
          <SiteTitle>{title}</SiteTitle>
          <MainNav />
        </NavHeaderWrapper>
      </Navigation>
    </LocationProvider>
  );
};

export default Header;

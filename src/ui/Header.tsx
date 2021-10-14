import React, { useState, useEffect } from 'react';
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
import { breakpoints, Color, fontSize, spacing } from '@osu-wams/theme';
import { State, User } from '@osu-wams/hooks';
import { Types, User as UserUtil } from '@osu-wams/lib';
import { Helpers } from '@osu-wams/utils';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Desktop } from 'src/hooks/useMediaQuery';
import ApplicationSearchBar from 'src/features/application-search/ApplicationSearchBar';
import Icon from './Icon';
import { faMask, faCheck } from '@fortawesome/pro-light-svg-icons';
import { faCaretDown } from '@fortawesome/pro-solid-svg-icons';
import { Menu, MenuPopover, MenuItem, MenuButton } from '@reach/menu-button';
import { HeaderNavList } from './HeaderNav/HeaderNavStyles';

const { usersCampus, CAMPUS_CODES } = User;
const { userState, themeState, dashboardState } = State;
const { AFFILIATIONS } = User;

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

const DashboardTitle = styled(MenuButton)`
  color: ${({ theme }) => theme.ui.richText.title.color};
  display: none;
  background: ${({ theme }) => theme.ui.myDialog.background};
  border: none;
  cursor: pointer;
  margin-left: 6px;
  padding: 2px 5px;
  > svg.fa-lg {
    font-size: ${fontSize[24]};
  }
  @media (min-width: ${breakpoints.small}) {
    display: block;
    font-size: ${fontSize[18]};
    font-weight: 500;
    max-width: ${breakpoints.large};
  }
`;

const DashboardToggleOption = styled(MenuItem)`
  margin-right: 0;
  align-items: 'flex-end';
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

const ToggleOption = (props) => {
  const { affiliation, toggledAffiliation } = props;
  const setDashboardState = useSetRecoilState(dashboardState);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const iconOpacity = toggledAffiliation == affiliation ? 1 : 0;
  const iconId = toggledAffiliation == affiliation ? 'active-icon' : 'inactive-icon';

  return (
    <DashboardToggleOption
      data-testid={props.testid}
      onSelect={() => {
        setDashboardState({
          affiliation: affiliation,
          navigateTo: `${affiliation}`,
        });
      }}
      key={props.toggledAffiliation}
    >
      <Icon
        data-testid={iconId}
        icon={faCheck}
        style={{ padding: 3, color: Color['orange-400'], opacity: iconOpacity }}
      />
      {capitalizeFirstLetter(affiliation)} Dashboard
    </DashboardToggleOption>
  );
};

const Header = () => {
  const user = useRecoilValue(userState);
  const title = mainTitle(user.data);
  const theme = useRecoilValue(themeState);
  const { image, alt } = campusLogo(user.data, theme);
  const dashboardLink = `/${User.getAffiliation(user.data).toLowerCase()}`;
  const [isEmployee, setIsEmployee] = useState(false);
  const [toggledAffiliation, setToggledAffiliation] = useState(
    user.data?.primaryAffiliationOverride ?? ''
  );

  useEffect(() => {
    user.data?.primaryAffiliationOverride
      ? setToggledAffiliation(user.data.primaryAffiliationOverride)
      : setToggledAffiliation(user.data.primaryAffiliation);
    // Checks for any employee affiliation (finds Student Employees too)
    if (user.data?.affiliations.includes(AFFILIATIONS.employee)) {
      setIsEmployee(true);
    }
  }, [user.data]);

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
          {isEmployee ? (
            <Menu>
              <DashboardTitle>
                <SiteTitle data-testid="toggle-title">
                  {title}
                  {isEmployee && (
                    <Icon
                      data-testid="dashboard-toggle-icon"
                      icon={faCaretDown}
                      style={{ marginLeft: 10 }}
                    />
                  )}
                </SiteTitle>
              </DashboardTitle>
              <MenuPopover>
                <HeaderNavList data-testid="dashboard-toggle-menu">
                  <ToggleOption
                    testid="student-toggle-option"
                    affiliation={'student'}
                    toggledAffiliation={toggledAffiliation}
                  />
                  <ToggleOption
                    testid="employee-toggle-option"
                    affiliation={'employee'}
                    toggledAffiliation={toggledAffiliation}
                  />
                </HeaderNavList>
              </MenuPopover>
            </Menu>
          ) : (
            <SiteTitle>{title}</SiteTitle>
          )}

          <MainNav />
        </NavHeaderWrapper>
      </Navigation>
    </LocationProvider>
  );
};

export default Header;

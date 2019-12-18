import React, { useContext } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import logo from '../assets/osu-logo.svg';
import ecampusLogo from '../assets/osu-ecampus.svg';
import cascadesLogo from '../assets/osu-cascades.svg';
import '@reach/menu-button/styles.css';
import MainNav from './MainNav/';
import { ProfileMenu } from './ProfileMenu';
import { breakpoints, styled } from '../theme';
import { IUser, usersCampus, CAMPUS_CODES } from '../api/user';
import { UserContext } from '../App';

const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.header.background};
  justify-content: space-between;
  flex-flow: row wrap;
  padding: 8px 8px 12px;
  align-items: center;
`;

const Navigation = styled.div`
  flex-basis: 100%;
  margin: 10px auto 0 auto;
  overflow-x: scroll;
  /* Hide the scrollbar in most browsers */
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  @media (min-width: ${breakpoints[768]}) {
    flex-basis: auto;
    order: 1;
  }
`;

const Logo = styled.img`
  order: 0;
  height: 60px;
  @media (min-width: ${breakpoints[768]}) {
    height: 80px;
  }
`;

/**
 * Return the ecampus or cascades logo if the user is identified as belonging to one of those campuses
 * @param user the currently logged in user
 */
const campusLogo = (user: IUser) => {
  const { campusCode } = usersCampus(user);
  switch (campusCode) {
    case CAMPUS_CODES.ecampus:
      return ecampusLogo;
    case CAMPUS_CODES.bend:
      return cascadesLogo;
    default:
      return logo;
  }
};

const Header = () => {
  const user = useContext<any>(UserContext);

  return (
    <HeaderWrapper>
      <Logo
        data-testid="app-header-logo"
        src={campusLogo(user.data)}
        alt="Oregon State University"
      />
      <ProfileMenu />
      <Navigation>
        <MainNav />
      </Navigation>
    </HeaderWrapper>
  );
};

export default Header;

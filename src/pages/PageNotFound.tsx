import React, { useContext } from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import styled, { ThemeContext } from 'styled-components/macro';
import image404 from 'src/assets/404.svg';
import { InternalLink } from 'src/ui/Link';
import { Event } from 'src/util/gaTracking';
import { MainGridWrapper, MainGrid } from 'src/ui/grid';
import { State, User } from '@osu-wams/hooks';
import { useRecoilValue } from 'recoil';

const Content = styled.div`
  text-align: center;
`;
const PageNotFound = () => {
  const themeContext = useContext(ThemeContext);
  const user = useRecoilValue(State.userState);
  const dashboardLink = `/${User.getAffiliation(user.data).toLowerCase()}`;

  return (
    <MainGridWrapper data-testid="404-page">
      <VisuallyHidden>
        <h1>Page Not Found</h1>
      </VisuallyHidden>
      <MainGrid>
        <img src={image404} alt="404" />
        <Content>
          <h2>Dam.</h2>
          <p>
            We couldn’t find the page you were looking for. <br />
            <InternalLink
              data-testid="nav-link"
              to={dashboardLink}
              bg={themeContext.pageNotFound.link.background}
              fg={themeContext.pageNotFound.link.color}
              onClick={() => Event('404', 'main dashboard')}
            >
              Return to dashboard
            </InternalLink>
          </p>
        </Content>
      </MainGrid>
    </MainGridWrapper>
  );
};

export default PageNotFound;

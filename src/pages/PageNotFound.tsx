import React, { useContext } from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import image404 from '../assets/404.svg';
import { InternalLink } from '../ui/Link';
import { Event } from '../util/gaTracking';
import { styled, ThemeContext, MainGridWrapper, MainGrid } from '../theme';

const Content = styled.div`
  text-align: center;
`;
const PageNotFound = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <MainGridWrapper data-testid="404-page">
      <VisuallyHidden>
        <h1>Page Not Found</h1>
      </VisuallyHidden>
      <MainGrid>
        <img src={image404} alt="" />
        <Content>
          <h2>Dam.</h2>
          <p>
            We couldn’t find the page you were looking for. <br />
            <InternalLink
              to="/"
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

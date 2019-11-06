import React from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import styled from 'styled-components';
import { MainGridWrapper, MainGrid, MainGridCol } from '../ui/PageGrid';
import image404 from '../assets/404.svg';
import { InternalLink } from '../ui/Link';
import { Event } from '../util/gaTracking';
import { Color } from '../theme';

const Content = styled.div`
  text-align: center;
`;
const PageNotFound = () => (
  <MainGridWrapper data-testid="404-page">
    <VisuallyHidden>
      <h1>Page Not Found</h1>
    </VisuallyHidden>
    <MainGrid>
      <MainGridCol className="col-span-2">
        <img src={image404} alt="" />
        <Content>
          <h2>Dam.</h2>
          <p>
            We couldn’t find the page you were looking for. <br />
            <InternalLink
              to="/"
              bg={Color['orange-400']}
              fg={Color.white}
              onClick={() => Event('404', 'main dashboard')}
            >
              Return to dashboard
            </InternalLink>
          </p>
        </Content>
      </MainGridCol>
    </MainGrid>
  </MainGridWrapper>
);

export default PageNotFound;

import React from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import styled from 'styled-components';
import { MainGridWrapper, MainGrid, MainGridCol } from '../ui/PageGrid';
import image404 from '../assets/404.svg';
import { SimpleExternalLink } from '../ui/Link';
import Url from '../util/externalUrls.data';
import { Event } from '../util/gaTracking';
import { Color } from '../theme';

const Content = styled.div`
  text-align: center;
  a {
    color: ${Color['orange-500']};
    text-decoration: none;
    &:active,
    &:focus,
    &:hover {
      text-decoration: underline;
    }
  }
`;
const PageNotFound = () => (
  <div data-testid="404-page">
    <MainGridWrapper>
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
              Go back to the{' '}
              <a href="/" onClick={() => Event('404', 'main dashboard')}>
                main dashboard
              </a>{' '}
              or{' '}
              <SimpleExternalLink
                href={Url.support.main}
                onClick={() => Event('404', 'get support')}
              >
                get support
              </SimpleExternalLink>
              .
            </p>
          </Content>
        </MainGridCol>
      </MainGrid>
    </MainGridWrapper>
  </div>
);

export default PageNotFound;

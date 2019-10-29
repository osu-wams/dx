import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { faMask, faUserHeadset, faCommentAltCheck } from '@fortawesome/pro-light-svg-icons';
import VisuallyHidden from '@reach/visually-hidden';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '@reach/dialog/styles.css';
import { Event } from '../util/gaTracking';
import Button from './Button';
import { Color, theme } from '../theme';
import { UserContext, IAppContext, AppContext } from '../App';
import Icon from './Icon';
import { isNullOrUndefined } from 'util';
import Url from '../util/externalUrls.data';
import Masquerade from '../features/Masquerade';

const FooterWrapper = styled.div`
  width: 100%;
  background-color: ${Color.black};
  padding: 1.6rem;
  color: ${Color.white};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  a {
    color: ${Color.white};
    &:active,
    &:focus,
    &:hover {
      text-decoration: none;
    }
  }
  @media (min-width: 768px) {
    position: relative;
    & > button {
      position: absolute;
      right: 2rem;
    }
  }
`;

const FooterContent = styled.div`
  font-size: ${theme.fontSize[14]};
`;

const FooterButtonWrapper = styled.div`
  margin-bottom: 1.4rem;
`;

const FooterIconLink = styled.a`
  border: 1px solid ${Color['neutral-400']};
  display: inline-block;
  color: ${Color.white};
  border-radius: ${theme.borderRadius};
  padding: 1.2rem;
  font-size: ${theme.fontSize[16]};
  text-decoration: none;
  svg {
    margin-bottom: 1rem;
  }
  & + a {
    margin-left: 2rem;
  }
`;

const FooterDeployedContent = styled.span`
  display: block;
  color: ${Color['neutral-500']};
`;

const Footer = () => {
  const [showMasqueradeDialog, setShowMasqueradeDialog] = useState(false);
  const user = useContext<any>(UserContext);
  const appContext = useContext<IAppContext>(AppContext);
  const toggleMasqueradeDialog = () => setShowMasqueradeDialog(!showMasqueradeDialog);

  /**
   * Generate a version link, if possible, for the deployed version
   * @param versionString the original version string
   * @param repository the github repository name
   */
  const versionLink = (versionString: string, repository: string): JSX.Element => {
    const [dateTime, version] = versionString.split('-'); // eslint-disable-line
    if (isNullOrUndefined(version) || version === '') {
      return <span>{versionString}</span>;
    } else {
      return (
        <a href={`http://github.com/osu-wams/${repository}/commit/${version}`} target="blank">
          {versionString}
        </a>
      );
    }
  };

  return (
    <>
      <FooterWrapper>
        <FooterContent>
          <FooterButtonWrapper>
            <FooterIconLink
              href={Url.support.main}
              target="_blank"
              onClick={() => Event('footer', 'Get Support link')}
            >
              <Icon icon={faUserHeadset} color={Color['orange-400']} size="2x" />
              <br />
              Get Support
            </FooterIconLink>
            <FooterIconLink
              href={Url.feedback.main}
              target="_blank"
              onClick={() => Event('footer', 'Give Feedback link')}
            >
              <Icon icon={faCommentAltCheck} color={Color['orange-400']} size="2x" />
              <br />
              Give Feedback
            </FooterIconLink>
          </FooterButtonWrapper>
          <a
            href="https://oregonstate.edu/copyright"
            onClick={() => Event('footer', 'Copyright link')}
            target="_blank"
            rel="noopener noreferrer"
          >
            Copyright
          </a>
          &copy; 2019 Oregon State University <br />
          <a
            href="https://oregonstate.edu/official-web-disclaimer"
            onClick={() => Event('footer', 'Disclaimer link')}
            target="_blank"
            rel="noopener noreferrer"
          >
            Disclaimer
          </a>{' '}
          |{' '}
          <a
            href="https://accessibility.oregonstate.edu"
            onClick={() => Event('footer', 'Accessibility link')}
            target="_blank"
            rel="noopener noreferrer"
          >
            Accessibility Information
          </a>
          {user && user.data && user.data.isAdmin && (
            <>
              <FooterDeployedContent>
                Server Version: {versionLink(appContext.appVersions.serverVersion, 'dx-server')}
              </FooterDeployedContent>
              <FooterDeployedContent>
                Client Version: {versionLink(appContext.appVersions.appVersion, 'dx')}
              </FooterDeployedContent>
            </>
          )}
        </FooterContent>
        {user && user.data && user.data.isAdmin && (
          <Button
            onClick={() => {
              toggleMasqueradeDialog();
              Event('footer', 'masquerade', 'click masquerade modal open');
            }}
            bg={Color.transparent}
          >
            <Icon icon={faMask} color={Color.white} size="2x" />
            <VisuallyHidden>Masquerade</VisuallyHidden>
          </Button>
        )}
        <ToastContainer />
      </FooterWrapper>
      {user && user.data && user.data.isAdmin && showMasqueradeDialog && (
        <Masquerade
          showMasqueradeDialog={showMasqueradeDialog}
          toggleMasqueradeDialog={toggleMasqueradeDialog}
        />
      )}
    </>
  );
};

export default Footer;

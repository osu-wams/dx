import React, { useState, useContext } from 'react';
import { faMask, faUserHeadset, faCommentAltCheck } from '@fortawesome/pro-light-svg-icons';
import VisuallyHidden from '@reach/visually-hidden';
import { isNullOrUndefined } from 'util';
import styled, { ThemeContext } from 'styled-components/macro';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '@reach/dialog/styles.css';
import { Event } from 'src/util/gaTracking';
import Button from './Button';
import { fontSize, borderRadius, breakpoints } from 'src/theme';
import Icon from './Icon';
import Url from 'src/util/externalUrls.data';
import Masquerade from 'src/features/Masquerade';
import { User, useAppVersions } from '@osu-wams/hooks';
import { useRecoilValue } from 'recoil';
import { userState } from 'src/state/application';

const { GROUPS } = User;

const FooterWrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.footer.background};
  padding: 1.6rem 1.6rem 6rem;
  color: ${({ theme }) => theme.footer.color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  a {
    color: ${({ theme }) => theme.footer.link.color};
    &:active,
    &:focus,
    &:hover {
      text-decoration: none;
    }
  }
  @media (min-width: ${breakpoints.small}) {
    padding-bottom: 1.6rem;
    position: relative;
    & > button {
      position: absolute;
      right: 2rem;
    }
  }
`;

const FooterContent = styled.div`
  font-size: ${fontSize[14]};
`;

const FooterButtonWrapper = styled.div`
  margin-bottom: 1.4rem;
`;

const FooterIconLink = styled.a`
  border: 1px solid ${({ theme }) => theme.footer.iconLink.border};
  display: inline-block;
  color: ${({ theme }) => theme.footer.iconLink.color};
  border-radius: ${borderRadius[8]};
  padding: 1.2rem;
  font-size: ${fontSize[16]};
  text-decoration: none;
  svg {
    margin-bottom: 1rem;
  }
  & + & {
    margin-left: 2rem;
  }
`;

const FooterDeployedContent = styled.span`
  display: block;
  color: ${({ theme }) => theme.footer.adminText.color};
`;

const Footer = () => {
  const user = useRecoilValue(userState);
  const {
    data: { serverVersion, appVersion },
  } = useAppVersions({ serverVersion: '', appVersion: '' });
  const [showMasqueradeDialog, setShowMasqueradeDialog] = useState(false);
  const themeContext = useContext(ThemeContext);
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
              <Icon
                icon={faUserHeadset}
                color={themeContext.footer.iconLink.icon.color}
                size="2x"
              />
              <br />
              Get Support
            </FooterIconLink>
            <FooterIconLink
              href={Url.feedback.main}
              target="_blank"
              onClick={() => Event('footer', 'Give Feedback link')}
            >
              <Icon
                icon={faCommentAltCheck}
                color={themeContext.footer.iconLink.icon.color}
                size="2x"
              />
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
          &copy; {new Date().getFullYear()} Oregon State University <br />
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
          {user?.data?.isAdmin && (
            <>
              <FooterDeployedContent>
                Server Version: {versionLink(serverVersion, 'dx-server')}
              </FooterDeployedContent>
              <FooterDeployedContent>
                Client Version: {versionLink(appVersion, 'dx')}
              </FooterDeployedContent>
            </>
          )}
        </FooterContent>
        {user?.data?.groups?.includes(GROUPS.masquerade) && (
          <Button
            data-testid="masquerade"
            onClick={() => {
              toggleMasqueradeDialog();
              Event('footer', 'masquerade', 'click masquerade modal open');
            }}
            bg={themeContext.footer.masquerade.background}
          >
            <Icon icon={faMask} color={themeContext.footer.masquerade.color} size="2x" />
            <VisuallyHidden>Masquerade</VisuallyHidden>
          </Button>
        )}
        <ToastContainer />
      </FooterWrapper>
      {user?.data?.groups?.includes(GROUPS.masquerade) && showMasqueradeDialog && (
        <Masquerade
          showMasqueradeDialog={showMasqueradeDialog}
          toggleMasqueradeDialog={toggleMasqueradeDialog}
        />
      )}
    </>
  );
};

export default Footer;

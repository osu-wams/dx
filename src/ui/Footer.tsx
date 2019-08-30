import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { faMask, faUserHeadset, faCommentAltCheck } from '@fortawesome/pro-light-svg-icons';
import VisuallyHidden from '@reach/visually-hidden';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '@reach/dialog/styles.css';
import MyDialog from './MyDialog';
import Button from './Button';
import Input from './Input';
import Label from './Label';
import { Color, theme } from '../theme';
import { UserContext } from '../App';
import Icon from './Icon';
import { getMasqueradeUser, postMasqueradeUser } from '../api/masquerade';

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

const Footer = () => {
  const [showMasqueradeDialog, setShowMasqueradeDialog] = useState(false);
  const [masqueradeId, setMasqueradeId] = useState('');
  const user = useContext<any>(UserContext);

  useEffect(() => {
    loadMasqueradeId();
  }, []);

  const toggleMasqueradeDialog = () => setShowMasqueradeDialog(!showMasqueradeDialog);

  const loadMasqueradeId = async () => {
    try {
      const { data } = await getMasqueradeUser();
      if (data.masqueradeId) {
        setMasqueradeId(data.masqueradeId);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const masquerade = () => {
    if (masqueradeId) {
      postMasqueradeUser(masqueradeId)
        .then(() => {
          toggleMasqueradeDialog();
          toast.success(`Masquerading as OSU ID ${masqueradeId}.`, { transition: Zoom });
          setTimeout(() => {
            window.location.reload(true);
          }, 2000);
        })
        .catch(err => console.log(err));
    } else {
      postMasqueradeUser()
        .then(() => {
          toggleMasqueradeDialog();
          setMasqueradeId('');
          toast.info('Masquerade session ended.', { transition: Zoom });
          setTimeout(() => {
            window.location.reload(true);
          }, 2000);
        })
        .catch(err => console.log(err));
    }
  };

  const handleChange = e => {
    setMasqueradeId(e.target.value);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      masquerade();
    }
  };

  return (
    <>
      <FooterWrapper>
        <FooterContent>
          <FooterButtonWrapper>
            <FooterIconLink href="#CHANGE-WHEN-READY">
              <Icon icon={faUserHeadset} color={Color['orange-400']} size="2x" />
              <br />
              Get Support
            </FooterIconLink>
            <FooterIconLink href="#CHANGE-WHEN-READY">
              <Icon icon={faCommentAltCheck} color={Color['orange-400']} size="2x" />
              <br />
              Give Feedback
            </FooterIconLink>
          </FooterButtonWrapper>
          <a href="https://oregonstate.edu/copyright">Copyright</a> &copy; 2019 Oregon State
          University <br />
          <a href="https://oregonstate.edu/official-web-disclaimer">Disclaimer</a> |{' '}
          <a href="https://accessibility.oregonstate.edu">Accessibility Information</a>
        </FooterContent>
        {user && user.isAdmin && (
          <Button onClick={toggleMasqueradeDialog} bg={Color.transparent}>
            <Icon icon={faMask} color={Color.white} size="2x" />
            <VisuallyHidden>Masquerade</VisuallyHidden>
          </Button>
        )}
        <ToastContainer />
      </FooterWrapper>
      <MyDialog isOpen={showMasqueradeDialog} data-testid="masquerade-dialog">
        <h2>Log in as another user</h2>
        <Label htmlFor="osu-id">
          Enter user OSU ID
          <br />
          <Input
            type="text"
            id="osu-id"
            value={masqueradeId}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </Label>
        <br />
        <br />
        <Button type="submit" onClick={masquerade}>
          Masquerade
        </Button>
        <Button
          bg={Color['neutral-200']}
          fg={Color['neutral-700']}
          onClick={toggleMasqueradeDialog}
        >
          Cancel
        </Button>
      </MyDialog>
    </>
  );
};

export default Footer;

import React, { useEffect, useState, useContext } from 'react';
import MyDialog from '../ui/MyDialog';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Label from '../ui/Label';
import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Event } from '../util/gaTracking';
import { getMasqueradeUser, postMasqueradeUser } from '../api/masquerade';
import * as cache from '../util/cache';
import { ThemeContext } from '../theme';

interface MasqueradeProps {
  showMasqueradeDialog: boolean;
  toggleMasqueradeDialog: (event?: any) => void;
}

export const Masquerade = (props: MasqueradeProps) => {
  const themeContext = useContext(ThemeContext);
  const { showMasqueradeDialog, toggleMasqueradeDialog } = props;
  const [masqueradeId, setMasqueradeId] = useState('');
  const [masqueradeReason, setMasqueradeReason] = useState('');

  useEffect(() => {
    getMasqueradeUser()
      .then(data => {
        if (data && data.masqueradeId !== '') {
          cache.clear();
          setMasqueradeId(data.masqueradeId);
          setMasqueradeReason(data.masqueradeReason);
        }
      })
      .catch(err => console.log);
  }, []);

  const performMasquerade = () => {
    if (!masqueradeDisabled()) {
      postMasqueradeUser(masqueradeId, masqueradeReason)
        .then(() => {
          cache.clear();
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
          cache.clear();
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
    if (e.target.id === 'osu-id') {
      setMasqueradeId(e.target.value);
    }
    if (e.target.id === 'masquerade-reason') {
      setMasqueradeReason(e.target.value);
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      performMasquerade();
    }
  };

  /**
   * Masquerade is disabled if there is a non-empty masqueradeId without a reason supplied.
   * In the case of an empty masqueradeId, the intent is to "remove the masquerade".
   */
  const masqueradeDisabled = () => {
    if (masqueradeId !== '' && masqueradeReason !== '') {
      return false;
    }
    if (masqueradeId === '') {
      return false;
    }
    return true;
  };

  /**
   * An empty masqueradeId means the user would intend on removing the masquerade and resuming
   * usage as themselves.
   */
  const masqueradeText = () => {
    if (masqueradeId === '') {
      return 'Remove Masquerade';
    } else {
      return 'Masquerade';
    }
  };

  return (
    <MyDialog
      isOpen={showMasqueradeDialog}
      onDismiss={() => toggleMasqueradeDialog()}
      data-testid="masquerade-dialog"
      aria-labelledby="maskDialog-title"
    >
      <h2 id="maskDialog-title">Log in as another user</h2>
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
      {masqueradeId !== '' && (
        <>
          <Label htmlFor="masquerade-reason">
            Enter a reason
            <br />
            <Input
              type="text"
              id="masquerade-reason"
              value={masqueradeReason}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </Label>
          <br />
        </>
      )}
      <br />
      <Button
        type="submit"
        disabled={masqueradeDisabled()}
        bg={
          masqueradeDisabled() ? themeContext.features.masquerade.buttonAlt.background : undefined
        }
        fg={masqueradeDisabled() ? themeContext.features.masquerade.buttonAlt.color : undefined}
        onClick={() => {
          Event('footer', 'masquerade', 'submit form to masquerade');
          performMasquerade();
        }}
      >
        {masqueradeText()}
      </Button>
      <Button
        bg={themeContext.features.masquerade.buttonAlt.background}
        fg={themeContext.features.masquerade.buttonAlt.color}
        onClick={toggleMasqueradeDialog}
      >
        Cancel
      </Button>
    </MyDialog>
  );
};

export default Masquerade;

import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import VisuallyHidden from '@reach/visually-hidden';
import { theme, Color } from '../../theme';
import Icon from '../Icon';
import MyDialog from '../MyDialog';
import { CloseButton } from './index';
import { AppContext } from '../../App';
import { InfoButtonState } from '../../api/info-buttons';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons';
import Button from './Button';
import { Event } from '../../util/gaTracking';

const DialogHeader = styled.div`
  display: flex;
  flex-direction: row;
`;

const DialogClose = styled(CloseButton)`
  float: none;
  padding: 0;
`;

const DialogTitle = styled.span`
  flex-grow: 2;
  font-size: ${theme.fontSize['20']};
`;

const DialogContent = styled.div`
  font-size: ${theme.fontSize['14']};
`;

const InfoButton = props => {
  const appContext = useContext(AppContext);
  const [dialogVisible, toggleDialog] = useState(false);
  const [currentButton, setButton] = useState<InfoButtonState | null>(null);

  useEffect(() => {
    const thisButton = appContext.infoButtonData.find(i => i.id === props.infoButtonId);
    if (thisButton) {
      setButton(thisButton);
    }
  }, [appContext.infoButtonData, props.infoButtonId]);

  return currentButton ? (
    <>
      <Button
        bg={Color.transparent}
        data-testid={props.infoButtonId}
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          toggleDialog(true);
          Event('info-button', currentButton.title);
        }}
      >
        <Icon icon={faInfoCircle} size="lg" color={Color['neutral-600']} />
        <VisuallyHidden>Information about {currentButton.title}</VisuallyHidden>
      </Button>
      <MyDialog isOpen={dialogVisible} aria-labelledby="infobtn-title">
        <DialogHeader>
          <DialogTitle id="infobtn-title">{currentButton.title}</DialogTitle>
          <DialogClose onClick={(e: React.MouseEvent<HTMLElement>) => toggleDialog(false)} />
        </DialogHeader>
        <DialogContent dangerouslySetInnerHTML={{ __html: currentButton.content }} />
      </MyDialog>
    </>
  ) : (
    <></>
  );
};

export default InfoButton;

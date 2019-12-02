import React, { useEffect, useState, useContext } from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import { themeSettings, styled, ThemeContext } from '../../theme';
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
  font-size: ${themeSettings.fontSize['20']};
`;

const DialogContent = styled.div`
  font-size: ${themeSettings.fontSize['14']};
`;

const InfoButton = props => {
  const themeContext = useContext(ThemeContext);
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
        bg={themeContext.ui.button.info.background}
        data-testid={props.infoButtonId}
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          toggleDialog(true);
          Event('info-button', currentButton.title);
        }}
      >
        <Icon icon={faInfoCircle} size="lg" color={themeContext.ui.button.info.icon.color} />
        <VisuallyHidden>Information about {currentButton.title}</VisuallyHidden>
      </Button>
      <MyDialog
        isOpen={dialogVisible}
        onDismiss={() => toggleDialog(false)}
        aria-labelledby="infobtn-title"
      >
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

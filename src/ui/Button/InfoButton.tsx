import React, { useEffect, useState, useContext } from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import styled, { ThemeContext } from 'styled-components/macro';
import { fontSize } from 'src/theme';
import Icon from 'src/ui/Icon';
import MyDialog from 'src/ui/MyDialog';
import { CloseButton } from './index';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons';
import Button from './Button';
import { Event } from 'src/util/gaTracking';
import { InfoButtonState } from '@osu-wams/hooks/dist/api/infoButtons';
import { useRecoilValue } from 'recoil';
import { infoButtonState } from 'src/state/application';

const DialogHeader = styled.div`
  display: flex;
  flex-direction: row;
`;

const DialogClose = styled(CloseButton)`
  float: none;
  padding: 0;
`;

const DialogTitle = styled.h2`
  flex-grow: 2;
  font-size: ${fontSize['20']};
`;

const DialogContent = styled.div`
  font-size: ${fontSize['14']};
`;

const InfoButton = (props) => {
  const themeContext = useContext(ThemeContext);
  const infoButtonData = useRecoilValue(infoButtonState);
  const [dialogVisible, toggleDialog] = useState(false);
  const [currentButton, setButton] = useState<InfoButtonState | null>(null);

  useEffect(() => {
    if (Array.isArray(infoButtonData)) {
      const thisButton = infoButtonData.find((i) => i.id === props.infoButtonId);
      if (thisButton) {
        setButton(thisButton);
      }
    }
  }, [infoButtonData, props.infoButtonId]);

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

import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { theme } from '../../theme';
import Icon from '../Icon';
import MyDialog from '../MyDialog';
import { CloseButton } from './index';
import { InfoButtonContext } from '../../App';
import { InfoButtonState } from '../../api/info-buttons';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons';

const InfoButtonIcon = styled(Icon)`
  &:hover {
    cursor: pointer;
  }
`;

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
  const infoButtons = useContext(InfoButtonContext);
  const [dialogVisible, toggleDialog] = useState(false);
  const [currentButton, setButton] = useState<InfoButtonState | null>(null);

  useEffect(() => {
    const thisButton = infoButtons.find(i => i.id === props.infoButtonId);
    if (thisButton) {
      setButton(thisButton);
    }
  }, [infoButtons, props.infoButtonId]);

  return currentButton ? (
    <>
      <InfoButtonIcon
        icon={faInfoCircle}
        onClick={(e: React.MouseEvent<HTMLElement>) => toggleDialog(true)}
      />
      <MyDialog isOpen={dialogVisible}>
        <DialogHeader>
          <DialogTitle>{currentButton.title}</DialogTitle>
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

import React from 'react';
import styled from 'styled-components/macro';
import Button from './Button';
import Icon from 'src/ui/Icon';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
import VisuallyHidden from '@reach/visually-hidden';

const Btn = styled(Button)`
  color: ${({ theme }) => theme.ui.button.close.color};
  background: ${({ theme }) => theme.ui.button.close.background};
  padding: 1rem 2rem;
  font-size: 2.4rem;
`;
const CloseButton = ({ ...props }) => (
  <Btn className="closeButton" {...props}>
    <Icon icon={faTimes} />
    <VisuallyHidden>Close</VisuallyHidden>
  </Btn>
);

export default CloseButton;

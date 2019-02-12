import Button from './Button';
import React from 'react';
import styled from 'styled-components';
import Icon from '../../ui/Icon';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
import VisuallyHidden from '@reach/visually-hidden';

const Btn = styled(Button)`
  & {
    color: black;
    background: transparent;
    padding: 1rem 2rem;
    font-size: 2.4rem;
  }
`;
const CloseButton = ({ ...props }) => (
  <Btn type="cancel" {...props}>
    <Icon icon={faTimes} />
    <VisuallyHidden>Close</VisuallyHidden>
  </Btn>
);

export default CloseButton;

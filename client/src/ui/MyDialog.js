import styled from 'styled-components';
import { Dialog } from '@reach/dialog';
import { theme, colors } from '../theme';

const MyDialog = styled(Dialog)`
  border-radius: ${theme.roundedCorners};
  [type='cancel'] {
    float: right;
  }
  h2 {
    font-family: Stratum2, sans-serif;
    color: ${props => colors[props.color]};
    margin-bottom: 0;
  }
  h3 {
    font-size: ${theme.fontSize.normal};
    color: ${colors['neutral-200']};
    margin-bottom: 0.5rem;
  }
  .details {
    color: ${colors['neutral-200']};
    font-size: ${theme.fontSize.small};
    margin-top: -1rem;
    margin-bottom: 2rem;
  }
  @media screen and (max-width: 767px) {
    &[data-reach-dialog-content] {
      width: 92%;
      margin: 2rem auto;
      padding-top: 0.5rem;
    }
  }
  @media (min-width: 768px) {
    &[data-reach-dialog-content] {
      width: 60vw;
      max-width: 768px;
    }
  }
`;

export default MyDialog;

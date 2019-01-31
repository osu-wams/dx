import styled from 'styled-components';
import { Dialog } from '@reach/dialog';
import { theme, Color } from '../theme';

const MyDialog = styled(Dialog)`
  border-radius: ${theme.borderRadius};
  [type='cancel'] {
    float: right;
  }
  h2 {
    font-family: Stratum2, sans-serif;
    color: ${props => props.color || Color['stratosphere-400']};
    margin-bottom: 0;
  }
  h3 {
    font-size: ${theme.fontSize[16]};
    color: ${Color['neutral-200']};
    margin-bottom: 0.5rem;
  }
  .details {
    color: ${Color['neutral-200']};
    font-size: ${theme.fontSize[14]};
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

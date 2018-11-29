import styled from 'styled-components';
import { Dialog } from '@reach/dialog';

const MyDialog = styled(Dialog)`
  border-top: 8px solid ${props => props.theme.colors[props.color]};
  [type='cancel'] {
    float: right;
  }
  h2 {
    font-family: Stratum2, sans-serif;
    color: ${props => props.theme.colors[props.color]};
    margin-bottom: 0;
  }
  h3 {
    font-size: ${props => props.theme.fontSize.normal};
    color: ${props => props.theme.colors.nimbus};
    margin-bottom: 0.5rem;
  }
  .details {
    color: ${props => props.theme.colors.nimbus};
    font-size: ${props => props.theme.fontSize.small};
    margin-top: -1rem;
    margin-bottom: 2rem;
  }
  @media screen and (max-width: 767px) {
    &[data-reach-dialog-content] {
      width: 100%;
      margin: 64px 0 0 0;
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

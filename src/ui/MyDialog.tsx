import styled from 'styled-components';
import { Dialog } from '@reach/dialog';
import { theme, Color } from '../theme';

const MyDialog = styled(Dialog)`
  border-radius: ${theme.borderRadius};
  .closeButton {
    float: right;
    margin-right: -2rem;
  }
  h2 {
    color: ${props => props.color || Color['orange-400']};
    font-size: ${theme.fontSize[24]};
    font-weight: 500;
    margin-bottom: 0;
    margin-top: 0.5rem;
  }
  h3 {
    font-size: ${theme.fontSize[16]};
    color: ${Color['neutral-200']};
    margin-bottom: 0.5rem;
  }
  .details {
    color: ${Color['neutral-600']};
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

const MyDialogFooter = styled.div`
  margin: 2.5rem 0 0;
  display: flex;
  a {
    margin-left: auto;
  }
`;

export { MyDialogFooter };
export default MyDialog;

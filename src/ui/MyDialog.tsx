import { Dialog } from '@reach/dialog';
import { themeSettings, styled } from '../theme';

const MyDialog = styled(Dialog)`
  border-radius: ${themeSettings.borderRadius[16]};
  .closeButton {
    float: right;
    margin-right: -2rem;
  }
  h2 {
    color: ${({ color, theme }) => color || theme.ui.myDialog.h2.color};
    font-size: ${themeSettings.fontSize[24]};
    font-weight: 500;
    margin-bottom: 0;
    margin-top: 0.5rem;
  }
  h3 {
    font-size: ${themeSettings.fontSize[16]};
    color: ${({ theme }) => theme.ui.myDialog.h3.color};
    margin-bottom: 0.5rem;
  }
  .details {
    color: ${({ theme }) => theme.ui.myDialog.details.color};
    font-size: ${themeSettings.fontSize[14]};
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

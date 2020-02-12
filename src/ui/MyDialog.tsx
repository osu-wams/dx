import { Dialog } from '@reach/dialog';
import { themeSettings, styled } from '../theme';

const MyDialog = styled(Dialog)<{ padding?: string }>`
  background: ${({ theme }) => theme.ui.myDialog.background};
  border-radius: ${themeSettings.borderRadius[16]};
  .closeButton {
    float: right;
    margin-right: -1.5rem;
    font-size: ${themeSettings.fontSize[26]};
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
    hr {
      margin: 0;
    }
    &[data-reach-dialog-content] {
      width: 100%;
      margin: 0;
      ${props => (props.padding === 'false' ? 'padding: 0;' : '')}
      border-radius: 0;
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
  margin: 2.5rem 1.5rem 0;
  display: flex;
  a {
    margin-left: auto;
  }
`;

const MyDialogHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.ui.myDialog.header.border};
  > div {
    display: flex;
    flex-direction: row;
    padding-top: 1rem;
  }

  @media (min-width: 768px) {
    padding-top: 0;
  }
`;

export { MyDialogHeader, MyDialogFooter };
export default MyDialog;

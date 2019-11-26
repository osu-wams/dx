import { styled } from '../theme';

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.ui.divider.border};
  margin: 3rem 0;
`;

export default Divider;

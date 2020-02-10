import { themeSettings, breakpoints, styled, shadows } from '../../theme';
import { MenuList, MenuButton } from '@reach/menu-button';

const HeaderNavButton = styled(MenuButton)`
  color: ${({ theme }) => theme.header.userButton.color};
  background: ${({ theme }) => theme.header.userButton.background};
  border: none;
  cursor: pointer;
  margin-left: 6px;
  @media (min-width: ${breakpoints.small}) {
    margin-left: 16px;
  }
`;

const HeaderNavWrapper = styled.div`
  @media (min-width: ${breakpoints.small}) {
    position: absolute;
    top: 35px;
    right: 10px;
  }
`;

const HeaderNavList = styled(MenuList)`
  &[data-reach-menu-list] {
    background-color: ${({ theme }) => theme.header.headerNavList.background};
    border-radius: ${themeSettings.borderRadius[8]};
    color: ${({ theme }) => theme.header.headerNavList.color};
    min-width: 15rem;
    padding: 8px 0;
    border: none;
    box-shadow: ${shadows[1]};
    [data-reach-menu-item] {
      background-color: ${({ theme }) => theme.header.headerNavList.background};

      padding: 1rem 2rem;
      font-size: ${themeSettings.fontSize[16]};
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    svg {
      color: ${({ theme }) => theme.header.headerNavList.svg.color};
      margin-right: 1.2rem;
      font-size: ${themeSettings.fontSize[24]};
    }
    div + div {
      [data-reach-menu-item] {
        border: none;
        border-top: 1px solid ${({ theme }) => theme.header.headerNavList.menuItem.borderTop};
      }
    }
  }
  [data-reach-menu-item][data-selected] {
    background-color: ${({ theme }) => theme.header.headerNavList.menuItemSelected.background};
    color: ${({ theme }) => theme.header.headerNavList.menuItemSelected.color};
    svg {
      color: ${({ theme }) => theme.header.headerNavList.menuItemSelected.color};
    }
  }
`;

const HeaderNavText = styled.span`
  padding: 0 8px;
`;

export { HeaderNavText, HeaderNavList, HeaderNavButton, HeaderNavWrapper };
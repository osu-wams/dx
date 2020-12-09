import react from 'react';
import styled from 'styled-components/macro';
import { MenuList, MenuButton } from '@reach/menu-button';
import { borderRadius, fontSize, shadows, spacing } from 'src/theme';

export const MenuButtonWrapper = styled(MenuButton)<{ selected: boolean }>`
  color: ${({ theme, selected }) =>
    selected
      ? theme.features.trainings.filter.selected.color
      : theme.features.trainings.filter.color};
  margin-right: ${spacing.medium};
  font-size: ${fontSize[16]};
  font-weight: 'semi-bold';
  padding: ${spacing.xm} ${spacing.default};
  text-decoration: none;
  border-radius: ${borderRadius[8]};
  border: 1px solid ${({ theme }) => theme.features.trainings.filter.border};
  background-color: ${({ theme, selected }) =>
    selected
      ? theme.features.trainings.filter.selected.background
      : theme.features.trainings.filter.background};
  &:hover {
    cursor: pointer;
  }
  > svg {
    margin-left: 5px;
  }
`;

export const MenuListWrapper = styled(MenuList)`
  &[data-reach-menu-list] {
    background-color: ${({ theme }) => theme.features.trainings.menu.background};
    border-radius: ${borderRadius[8]};
    color: ${({ theme }) => theme.features.trainings.menu.color};
    padding: ${spacing.medium} 0;
    border: 1px solid ${({ theme }) => theme.features.trainings.menu.border.color};
    box-shadow: ${shadows[1]};
    [data-reach-menu-item] {
      background-color: ${({ theme }) => theme.features.trainings.menu.background};
      padding: ${spacing.medium} ${spacing.xm};
      font-size: ${fontSize[14]};
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      svg {
        color: ${({ theme }) => theme.features.trainings.menu.svg.color};
        margin-right: 1.2rem;
        margin-top: ${spacing.small};
        font-size: ${fontSize[14]};
      }
    }
    div + div {
      [data-reach-menu-item] {
        border: none;
        border-top: 1px solid ${({ theme }) => theme.features.trainings.menu.menuItem.borderTop};
      }
    }
  }
  [data-reach-menu-item][data-selected] {
    background-color: ${({ theme }) => theme.features.trainings.menu.menuItemSelected.background};
    color: ${({ theme }) => theme.features.trainings.menu.menuItemSelected.color};
    svg {
      color: ${({ theme }) => theme.features.trainings.menu.menuItemSelected.color};
    }
  }
`;

export const TrainingSubHeader = styled.h2`
  font-size: ${fontSize[16]};
  font-weight: normal;
`;

import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import { MenuList, MenuButton } from '@reach/menu-button';
import { borderRadius, fontSize, shadows, spacing } from 'src/theme';
import { Menu, MenuItem, MenuPopover } from '@reach/menu-button';
import { faDotCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import { faCaretDown } from '@fortawesome/pro-solid-svg-icons';
import VisuallyHidden from '@reach/visually-hidden';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Event, IComponents } from 'src/util/gaTracking';
import {
  selectedTrainingAudienceState,
  selectedTrainingTagState,
  trainingSearchState,
  trainingAudienceState,
  trainingTagState,
} from 'src/state';
import Icon from 'src/ui/Icon';
import { ThemeContext } from 'styled-components/macro';

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
        margin-top: ${spacing.medium};
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

const TrainingsFilter: React.FC<any> = ({
  filterState,
  searchState,
  dataState,
  eventName,
  allLabel,
  allTitle,
  menuButtonClick,
}: {
  filterState: typeof selectedTrainingAudienceState | typeof selectedTrainingTagState;
  searchState: typeof trainingSearchState;
  dataState: typeof trainingAudienceState | typeof trainingTagState;
  allLabel: string;
  allTitle: string;
  eventName: IComponents;
  menuButtonClick: () => typeof Event;
}) => {
  const [activeFilter, setActiveFilter] = useRecoilState(filterState);
  const [query, setQuery] = useRecoilState(searchState);
  const items = useRecoilValue(dataState);
  const themeContext = useContext(ThemeContext);

  const selectedAll = (name?: string) => name?.toLowerCase() === 'all' ?? false;

  const handleClick = (name: string) => {
    setActiveFilter(name);
    Event(eventName, name);
    query && setQuery(''); // clears search input
  };

  return (
    <Menu>
      <MenuButtonWrapper selected={!selectedAll(activeFilter)} onClick={() => menuButtonClick()}>
        {selectedAll(activeFilter) ? allLabel : activeFilter}{' '}
        <Icon
          icon={faCaretDown}
          color={
            selectedAll(activeFilter)
              ? themeContext.features.trainings.filter.color
              : themeContext.features.trainings.filter.selected.color
          }
        />
        <VisuallyHidden>{allLabel}</VisuallyHidden>
      </MenuButtonWrapper>
      <MenuPopover>
        <MenuListWrapper>
          <MenuItem
            key="all"
            id="all"
            selected={selectedAll(activeFilter)}
            onSelect={() => handleClick('all')}
          >
            <Icon icon={selectedAll(activeFilter) ? faDotCircle : faCircle} />
            {allTitle}
          </MenuItem>
          {items?.data?.length &&
            items?.data?.map((type) => (
              <MenuItem
                key={type.id}
                id={type.name}
                selected={activeFilter?.toLowerCase() === type.name.toLowerCase() ? true : false}
                onSelect={() => handleClick(type.name)}
              >
                <Icon
                  icon={
                    activeFilter?.toLowerCase() === type.name.toLowerCase() ? faDotCircle : faCircle
                  }
                />
                {type.name}
              </MenuItem>
            ))}
        </MenuListWrapper>
      </MenuPopover>
    </Menu>
  );
};

export default TrainingsFilter;

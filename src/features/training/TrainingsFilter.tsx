import React, { useContext } from 'react';
import { Menu, MenuItem, MenuPopover } from '@reach/menu-button';
import { faDotCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import { faCaretDown } from '@fortawesome/pro-solid-svg-icons';
import VisuallyHidden from '@reach/visually-hidden';
import { State } from '@osu-wams/hooks';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Event, IComponents } from 'src/util/gaTracking';
import Icon from 'src/ui/Icon';
import { ThemeContext } from 'styled-components/macro';
import { MenuButtonWrapper, MenuListWrapper } from './TrainingStyles';

const {
  selectedTrainingAudienceState,
  selectedTrainingTagState,
  trainingSearchState,
  trainingAudienceState,
  trainingTagState,
} = State;

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

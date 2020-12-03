import React from 'react';
import styled from 'styled-components/macro';
import { MenuList, MenuButton } from '@reach/menu-button';
import { borderRadius, fontSize, shadows, spacing } from 'src/theme';
import TrainingsFilter from './TrainingsFilter';
import { Event } from 'src/util/gaTracking';
import {
  selectedTrainingAudienceState,
  selectedTrainingTagState,
  trainingSearchState,
  trainingAudienceState,
  trainingTagState,
} from 'src/state';

export const MenuButtonWrapper = styled(MenuButton)<{ selected: boolean }>`
  color: ${({ theme, selected }) =>
    selected
      ? theme.features.trainings.filter.selected.color
      : theme.features.trainings.filter.color};
  margin-right: 8px;
  font-size: ${fontSize[14]};
  font-weight: 'semi-bold';
  padding: 5px 7px;
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

const TrainingsFilters: React.FC<any> = () => {
  return (
    <>
      <TrainingsFilter
        filterState={selectedTrainingTagState}
        searchState={trainingSearchState}
        dataState={trainingTagState}
        allLabel="Category"
        allTitle="All Trainings"
        eventName="training-tags"
        menuButtonClick={() =>
          Event('training-tags', 'training-tags-button-menu', 'Training Tags button menu expanded')
        }
      />
      <TrainingsFilter
        filterState={selectedTrainingAudienceState}
        searchState={trainingSearchState}
        dataState={trainingAudienceState}
        allLabel="Audience"
        allTitle="All Audiences"
        eventName="training-audiences"
        menuButtonClick={() =>
          Event(
            'training-audiences',
            'training-audiences-button-menu',
            'Training Audiences button menu expanded'
          )
        }
      />
    </>
  );
};

export default TrainingsFilters;

import React from 'react';
import TrainingsFilter from './TrainingsFilter';
import { Event } from 'src/util/gaTracking';
import {
  selectedTrainingAudienceState,
  selectedTrainingTagState,
  trainingSearchState,
  trainingAudienceState,
  trainingTagState,
} from 'src/state';
import { TrainingSubHeader } from './TrainingStyles';

const TrainingsFilters: React.FC<any> = () => {
  return (
    <>
      <TrainingSubHeader>Filter by topic and audience</TrainingSubHeader>
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

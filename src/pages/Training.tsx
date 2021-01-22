import React, { useEffect, useState } from 'react';
import { Loading } from 'src/ui/Loading';
import styled from 'styled-components/macro';
import { useDebounce } from 'use-debounce';
import { MainGridWrapper, MainGrid } from 'src/theme';
import { useTrainings, useTrainingAudiences, useTrainingTags } from '@osu-wams/hooks';
import PageTitle from 'src/ui/PageTitle';
import VisuallyHidden from '@reach/visually-hidden';
import { Event } from 'src/util/gaTracking';
import {
  FeatureCard,
  FeatureCardGrid,
  FeatureCardHeader,
  FeatureCardContent,
} from 'src/ui/Card/variants/FeatureCard';
import { TrainingDetails } from 'src/features/training/TrainingDetails';
import { singularPlural } from 'src/util/helpers';
import placeholderImage from 'src/assets/training-placeholder.png';
import { useResetScroll } from 'src/util/useResetScroll';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  trainingState,
  trainingTagState,
  debouncedTrainingSearchState,
  filteredTrainingsState,
  selectedTrainingTagState,
  trainingSearchState,
  trainingAudienceState,
} from 'src/state';
import TrainingsSearch from 'src/features/training/TrainingsSearch';
import TrainingsFilters from 'src/features/training/TrainingsFilters';
import { TrainingSubHeader } from 'src/features/training/TrainingStyles';

const Training = () => {
  useResetScroll();
  const [isOpen, setOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const query = useRecoilValue(trainingSearchState);
  const [debouncedValue] = useDebounce(query, 250);
  const [debouncedQuery, setDebouncedQuery] = useRecoilState(debouncedTrainingSearchState);
  const filteredTrainings = useRecoilValue(filteredTrainingsState);
  const activeTag = useRecoilValue(selectedTrainingTagState);
  const trainingTags = useTrainingTags();
  const setTrainingTags = useSetRecoilState(trainingTagState);
  const trainingAudiences = useTrainingAudiences();
  const setTrainingAudiences = useSetRecoilState(trainingAudienceState);
  const trainings = useTrainings();
  const [trainingsState, setTrainings] = useRecoilState(trainingState);

  // Hides or shows course details
  const toggleTraining = (t?) => {
    setOpen(!isOpen);
    if (t) {
      setSelectedTraining(t);
    }
  };

  useEffect(() => {
    // Only reset trainingState when the hook has returned new data that isn't already set
    if (trainings.isSuccess && trainings.data && trainings.data !== trainingsState.data) {
      setTrainings({
        data: trainings.data,
        isLoading: trainings.isLoading,
        isSuccess: trainings.isSuccess,
        isError: trainings.isError,
      });
    }
  }, [trainings.data, trainings.isSuccess]);

  useEffect(() => {
    if (trainingTags.isSuccess && trainingTags.data) {
      setTrainingTags({
        data: trainingTags.data,
        isLoading: trainingTags.isLoading,
        isSuccess: trainingTags.isSuccess,
        isError: trainingTags.isError,
      });
    }
  }, [trainingTags.data, trainingTags.isSuccess]);

  useEffect(() => {
    if (trainingAudiences.isSuccess && trainingAudiences.data) {
      setTrainingAudiences({
        data: trainingAudiences.data,
        isLoading: trainingAudiences.isLoading,
        isSuccess: trainingAudiences.isSuccess,
        isError: trainingAudiences.isError,
      });
    }
  }, [trainingAudiences.data, trainingAudiences.isSuccess]);

  const featuredTrainings = (training) => {
    return training.featured === true;
  };

  const allTrainings = (training) => {
    return !training.featured;
  };

  /**
   * When useDebounce triggers a change in debouncedValue, propagate that value
   * to the debounced training search term state.
   */
  useEffect(() => {
    setDebouncedQuery(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    if (debouncedQuery) {
      // If a query has no results, emit a GA Event to track for improving trainings
      if (filteredTrainings.length === 0) {
        Event('training-search-failed', debouncedQuery);
      }

      // Avoids sending single characters to Google Analytics
      if (debouncedQuery.length >= 2 && filteredTrainings.length > 0) {
        Event('training-search', debouncedQuery);
      }
    }
  }, [debouncedQuery, filteredTrainings]);

  return (
    <MainGridWrapper>
      <PageTitle title="Training and Professional Development" />
      <MainGrid>
        <TrainingWrapper>
          <TrainingsSearch />
          {activeTag && <TrainingsFilters />}
          {!trainings.isLoading &&
            trainings.isSuccess &&
            trainings.data &&
            trainings.data.length > 0 && (
              <VisuallyHidden>
                <a href="#trainingResults">Skip to results</a>
              </VisuallyHidden>
            )}
          {trainingTags.isLoading && <Loading />}

          {trainings.isLoading && <Loading lines={5} />}

          {trainings.isSuccess && (
            <p>
              found {filteredTrainings.length} {singularPlural(filteredTrainings.length, 'result')}
            </p>
          )}
          {trainings.isSuccess && filteredTrainings.length > 0 ? (
            <div id="trainingResults" aria-live="polite" aria-atomic="true">
              {filteredTrainings.filter(featuredTrainings).length > 0 && (
                <>
                  <TrainingSubHeader>Spotlighted Trainings</TrainingSubHeader>

                  <FeatureCardGrid>
                    {filteredTrainings.filter(featuredTrainings).map((t) => (
                      <FeatureCard
                        key={t.id}
                        featured={true}
                        onClick={() => {
                          toggleTraining(t);
                          Event('training', 'featured training opened', t.title);
                        }}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <img src={t.image ? t.image : placeholderImage} alt="" />
                        <FeatureCardHeader>{t.title}</FeatureCardHeader>
                        {t.body && (
                          <FeatureCardContent dangerouslySetInnerHTML={{ __html: t.body }} />
                        )}
                      </FeatureCard>
                    ))}
                  </FeatureCardGrid>
                </>
              )}
              <TrainingSubHeader>All Trainings</TrainingSubHeader>
              <FeatureCardGrid>
                {filteredTrainings.filter(allTrainings).map((t) => (
                  <FeatureCard
                    key={t.id}
                    onClick={() => {
                      toggleTraining(t);
                      Event('training', 'training opened', t.title);
                    }}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FeatureCardHeader>{t.title}</FeatureCardHeader>
                    {t.body && <FeatureCardContent dangerouslySetInnerHTML={{ __html: t.body }} />}
                  </FeatureCard>
                ))}
              </FeatureCardGrid>

              {isOpen && selectedTraining && (
                <TrainingDetails
                  training={selectedTraining}
                  isOpen
                  toggleTraining={toggleTraining}
                />
              )}
            </div>
          ) : (
            !trainings.isLoading && (
              /* @TODO need mockup styling to do and messaging for no results */
              <p>Try another search term</p>
            )
          )}
        </TrainingWrapper>
      </MainGrid>
    </MainGridWrapper>
  );
};

const TrainingWrapper = styled.div`
  padding: 0;
`;

export default Training;

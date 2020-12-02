import React, { useEffect, useState } from 'react';
import { Loading } from 'src/ui/Loading';
import styled from 'styled-components/macro';
import { useDebounce } from 'use-debounce';
import { spacing, MainGridWrapper, MainGrid } from 'src/theme';
import { useTrainings, useTrainingTags } from '@osu-wams/hooks';
import PageTitle from 'src/ui/PageTitle';
import VisuallyHidden from '@reach/visually-hidden';
import { Event } from 'src/util/gaTracking';
import {
  FeatureCard,
  FeatureCardGrid,
  FeatureCardHeader,
  FeatureCardContent,
} from 'src/ui/Card/variants/FeatureCard';
import CustomBtn from 'src/ui/CustomBtn';
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
} from 'src/state';
import TrainingsSearch from 'src/features/training/TrainingsSearch';

const Training = () => {
  useResetScroll();
  const [isOpen, setOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [query, setQuery] = useRecoilState(trainingSearchState);
  const [debouncedValue] = useDebounce(query, 250);
  const [debouncedQuery, setDebouncedQuery] = useRecoilState(debouncedTrainingSearchState);
  const filteredTrainings = useRecoilValue(filteredTrainingsState);
  const [activeTag, setActiveTag] = useRecoilState(selectedTrainingTagState);
  const trainingTags = useTrainingTags();
  const setTrainingTags = useSetRecoilState(trainingTagState);
  const trainings = useTrainings();
  const setTrainings = useSetRecoilState(trainingState);

  // Hides or shows course details
  const toggleTraining = (t?) => {
    setOpen(!isOpen);
    if (t) {
      setSelectedTraining(t);
    }
  };

  // Actions to perform on tagClick
  const tagClick = (name: string) => {
    setActiveTag(name);
    Event('training-tags', name);
    query && setQuery(''); // clears search input to show all trainings with that tag
  };

  useEffect(() => {
    if (trainings.isSuccess && trainings.data) {
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
          {activeTag && (
            <div style={{ marginBottom: spacing.default }}>
              <CustomBtn
                key="all"
                text="All"
                id="all"
                selected={activeTag?.toLowerCase() === 'all' ? true : false}
                clickHandler={() => tagClick('all')}
              />
              {trainingTags?.data?.length &&
                trainingTags?.data?.map((type) => (
                  <CustomBtn
                    key={type.id}
                    text={type.name}
                    id={type.name}
                    selected={activeTag?.toLowerCase() === type.name.toLowerCase() ? true : false}
                    clickHandler={() => tagClick(type.name)}
                  />
                ))}
            </div>
          )}
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
            <p style={{ marginTop: '0' }}>
              found {filteredTrainings.length} {singularPlural(filteredTrainings.length, 'result')}
            </p>
          )}
          {trainings.isSuccess && filteredTrainings.length > 0 ? (
            <FeatureCardGrid id="trainingResults" aria-live="polite" aria-atomic="true">
              {filteredTrainings.map((t) => (
                <FeatureCard
                  key={t.id}
                  featured={t.featured}
                  onClick={() => {
                    toggleTraining(t);
                    Event('training', 'training opened', t.title);
                  }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t.featured && t.image && <img src={t.image} alt="" />}
                  {t.featured && !t.image && <img src={placeholderImage} alt="" />}
                  <FeatureCardHeader>{t.title}</FeatureCardHeader>
                  {t.body && <FeatureCardContent dangerouslySetInnerHTML={{ __html: t.body }} />}
                </FeatureCard>
              ))}
              {isOpen && selectedTraining && (
                <TrainingDetails
                  training={selectedTraining}
                  isOpen
                  toggleTraining={toggleTraining}
                />
              )}
            </FeatureCardGrid>
          ) : (
            !trainings.isLoading && (
              /* @TODO need mockup styling to do and messaging for no results */
              <div>Try another search term</div>
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

import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components/macro';
import { useDebounce } from 'use-debounce';
import { spacing, MainGridWrapper, MainGrid } from 'src/theme';
import { Types } from '@osu-wams/lib';
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
import { SearchBar } from 'src/ui/SearchBar';
import CustomBtn from 'src/ui/CustomBtn';
import { TrainingDetails } from 'src/features/training/TrainingDetails';
import { singularPlural } from 'src/util/helpers';
import placeholderImage from 'src/assets/training-placeholder.png';

const Training = () => {
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery] = useDebounce(query, 250);
  const [selectedTrainingTag, setSelectedTrainingTag] = useState('all');
  const [isOpen, setOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [filteredTrainings, setFilteredTrainings] = useState<Types.Training[]>([]);
  const trainingTags = useTrainingTags();
  const trainings = useTrainings();

  const filterByTag = React.useCallback(
    (name: string, trainings: Types.Training[]): Types.Training[] => {
      // Do not filter, give me all trainings
      if (name === 'all') return trainings;

      return trainings.filter(
        (training) =>
          training.tags?.length > 0 &&
          training.tags.findIndex((s) => s.toLowerCase().includes(name.toLowerCase())) > -1
      );
    },
    []
  );

  // Hides or shows course details
  const toggleTraining = (t?) => {
    setOpen(!isOpen);
    if (t) {
      setSelectedTraining(t);
    }
  };

  // Actions to perform on tagClick
  const tagClick = (name: string) => {
    setSelectedTrainingTag(name);
    Event('training-tags', name);
    query && setQuery(''); // clears search input to show all trainings with that tag
  };

  useEffect(() => {
    if (trainings.isSuccess && trainings.data.length > 0) {
      let filtered = trainings.data;
      // Nobody has searched, so it's page load or tag click
      if (!debouncedQuery && selectedTrainingTag && Array.isArray(filtered)) {
        filtered = filterByTag(selectedTrainingTag, filtered);
      } else {
        const re = new RegExp(debouncedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        filtered = filtered.filter((t) => t.title.match(re) || t.body?.match(re));

        if (debouncedQuery.length >= 2 && filtered.length > 0) {
          Event('training-search', debouncedQuery);
        }

        // If a query has no results, emit a GA Event to track for improving
        if (filtered.length === 0) {
          Event('training-search-failed', debouncedQuery);
        }
      }

      setFilteredTrainings(filtered);
    }
  }, [
    debouncedQuery,
    selectedTraining,
    filterByTag,
    selectedTrainingTag,
    trainings.data,
    trainings.isSuccess,
  ]);

  return (
    <MainGridWrapper>
      <PageTitle title="Training and Professional Development" />
      <MainGrid>
        <TrainingWrapper>
          <SearchBar
            id="training"
            labelText="Search"
            inputValue={query}
            onChange={(e) => {
              setQuery(e.target.value);
              selectedTrainingTag !== 'all' && setSelectedTrainingTag('all');
            }}
          />
          {selectedTrainingTag && (
            <div style={{ marginBottom: spacing.default }}>
              <CustomBtn
                key="all"
                text="All"
                id="all"
                selected={selectedTrainingTag?.toLowerCase() === 'all' ? true : false}
                clickHandler={() => tagClick('all')}
              />
              {trainingTags?.data?.length &&
                trainingTags?.data?.map((type) => (
                  <CustomBtn
                    key={type.id}
                    text={type.name}
                    id={type.name}
                    selected={
                      selectedTrainingTag?.toLowerCase() === type.name.toLowerCase() ? true : false
                    }
                    clickHandler={() => tagClick(type.name)}
                  />
                ))}
            </div>
          )}
          {!trainings.isLoading && trainings.isSuccess && trainings.data?.length > 0 && (
            <VisuallyHidden>
              <a href="#trainingResults">Skip to results</a>
            </VisuallyHidden>
          )}
          {trainingTags.isLoading && <Skeleton />}

          {trainings.isLoading && <Skeleton count={5} />}

          {trainings.isSuccess && (
            <p style={{ marginTop: '0' }}>
              found {filteredTrainings.length} {singularPlural(filteredTrainings.length, 'result')}
            </p>
          )}
          {trainings.isSuccess && filteredTrainings.length > 0 ? (
            <FeatureCardGrid id="trainingResults" aria-live="polite" aria-atomic="true">
              {filteredTrainings.map((t) => (
                <FeatureCard
                  as="button"
                  style={{ cursor: 'pointer' }}
                  key={t.id}
                  featured={t.featured}
                  onClick={() => {
                    toggleTraining(t);
                    Event('training', 'training opened', t.title);
                  }}
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

import React, { useEffect, useState, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components/macro';
import { useDebounce } from 'use-debounce';
import { spacing, MainGridWrapper, breakpoints, fontSize, MainGrid } from 'src/theme';
import { Types } from '@osu-wams/lib';
import { useTrainings } from '@osu-wams/hooks';
import PageTitle from 'src/ui/PageTitle';
import VisuallyHidden from '@reach/visually-hidden';
import { AppContext } from 'src/contexts/app-context';
import { Event } from 'src/util/gaTracking';
import {
  FeatureCard,
  FeatureCardGrid,
  FeatureCardHeader,
  FeatureCardContent,
} from 'src/ui/Card/variants/FeatureCard';
import { SearchBar } from 'src/ui/SearchBar';
import CustomBtn from 'src/ui/CustomBtn';

const tempResult = {
  isLoading: false,
  isSuccess: true,
  data: [
    {
      audiences: ['Academic Faculty', 'Professional Faculty', 'Staff', 'Students'],
      id: '71560c56-dabb-48e1-a663-64da7a7bb6e18',
      title: 'Play nice with others',
      image: 'https://data-stage.dx.oregonstate.edu/sites/default/files/2019-11/WellnessNook.jpg',
      contact: 'noreply@oregonstate.edu',
      cost: true,
      body:
        "<p>In this basic course, you'll learn how to play nice with others. Activities include sharing toys, using your words, and being patient.</p>",
      department: 'Daycare',
      duration: '1hr',
      featured: true,
      frequency: 'Daily',
      prerequisites: 'None',
      courseDesign: 'Blended',
      tags: ['growth'],
      types: 'Professional Learning Community',
      websiteUri: 'https://oregonstate.edu',
      websiteTitle: '',
    },
    {
      audiences: ['Academic Faculty', 'Professional Faculty', 'Staff', 'Students'],
      id: '71560c56-dabb-48e1-a663-64da7a7bb6111e8',
      title: 'Play nice with others',
      image: 'https://data-stage.dx.oregonstate.edu/sites/default/files/2019-11/WellnessNook.jpg',
      contact: 'noreply@oregonstate.edu',
      cost: true,
      body:
        "<p>In this basic course, you'll learn how to play nice with others. Activities include sharing toys, using your words, and being patient.</p>",
      department: 'Daycare',
      duration: '1hr',
      featured: true,
      frequency: 'Daily',
      prerequisites: 'None',
      courseDesign: 'Blended',
      tags: ['growth'],
      types: 'Professional Learning Community',
      websiteUri: 'https://oregonstate.edu',
      websiteTitle: '',
    },
    {
      audiences: ['Academic Faculty', 'Professional Faculty', 'Staff', 'Students'],
      id: '71560c56-dabb-48e1-a663-64da7a7b1111111b6e8',
      title: 'Play nice with others',
      image: 'https://data-stage.dx.oregonstate.edu/sites/default/files/2019-11/WellnessNook.jpg',
      contact: 'noreply@oregonstate.edu',
      cost: true,
      body:
        "<p>In this basic course, you'll learn how to play nice with others. Activities include sharing toys, using your words, and being patient.</p>",
      department: 'Daycare',
      duration: '1hr',
      featured: true,
      frequency: 'Daily',
      prerequisites: 'None',
      courseDesign: 'Blended',
      tags: ['growth'],
      types: 'Professional Learning Community',
      websiteUri: 'https://oregonstate.edu',
      websiteTitle: '',
    },

    {
      audiences: ['Academic Faculty', 'Professional Faculty', 'Staff', 'Students'],
      id: '71560c56-dabb-48e1-a663-64da7a7bb6e81',
      title: 'Super Job',
      image: 'https://data-stage.dx.oregonstate.edu/sites/default/files/2019-11/WellnessNook.jpg',
      contact: 'noreply@oregonstate.edu',
      cost: true,
      body:
        "<p>In this super course, you'll learn how to play nice with others. Activities include sharing toys, using your words, and being patient.</p>",
      department: 'WAMS',
      duration: '1hr',
      featured: false,
      frequency: 'Daily',
      prerequisites: 'None',
      courseDesign: 'Blended',
      tags: ['growth'],
      types: 'Professional Learning Community',
      websiteUri: 'https://oregonstate.edu',
      websiteTitle: '',
    },
    {
      audiences: ['Academic Faculty', 'Professional Faculty', 'Staff', 'Students'],
      id: '71560c56-dabb-48e1-a663-64da7a7222bb6e81',
      title: 'Wat Wat Job',
      image: 'https://data-stage.dx.oregonstate.edu/sites/default/files/2019-11/WellnessNook.jpg',
      contact: 'noreply@oregonstate.edu',
      cost: true,
      body:
        "<p>In this super course, you'll learn how to play nice with others. Activities include sharing toys, using your words, and being patient.</p><p>In this super course, you'll learn how to play nice with others. Activities include sharing toys, using your words, and being patient.</p>",
      department: 'WAMS',
      duration: '1hr',
      featured: false,
      frequency: 'Daily',
      prerequisites: 'None',
      courseDesign: 'Blended',
      tags: ['growth'],
      types: 'Professional Learning Community',
      websiteUri: 'https://oregonstate.edu',
      websiteTitle: '',
    },
    {
      audiences: ['Academic Faculty', 'Professional Faculty', 'Staff', 'Students'],
      id: '71560c56-dabb-48e1-a663-22264da7a7bb6e81',
      title: 'Wat Wat Job',
      image: 'https://data-stage.dx.oregonstate.edu/sites/default/files/2019-11/WellnessNook.jpg',
      contact: 'noreply@oregonstate.edu',
      cost: true,
      body:
        "<p>In this super course, you'll learn how to play nice with others. Activities include sharing toys, using your words, and being patient.</p><p>In this super course, you'll learn how to play nice with others. Activities include sharing toys, using your words, and being patient.</p>",
      department: 'WAMS',
      duration: '1hr',
      featured: false,
      frequency: 'Daily',
      prerequisites: 'None',
      courseDesign: 'Blended',
      tags: ['growth'],
      types: 'Professional Learning Community',
      websiteUri: 'https://oregonstate.edu',
      websiteTitle: '',
    },
    {
      audiences: ['Academic Faculty', 'Professional Faculty', 'Staff', 'Students'],
      id: '71560c56-dabb-482222e1-a663-64da7a7bb6e81',
      title: 'Wat Wat Job',
      image: 'https://data-stage.dx.oregonstate.edu/sites/default/files/2019-11/WellnessNook.jpg',
      contact: 'noreply@oregonstate.edu',
      cost: true,
      body:
        "<p>In this super course, you'll learn how to play nice with others. Activities include sharing toys, using your words, and being patient.</p><p>In this super course, you'll learn how to play nice with others. Activities include sharing toys, using your words, and being patient.</p>",
      department: 'WAMS',
      duration: '1hr',
      featured: false,
      frequency: 'Daily',
      prerequisites: 'None',
      courseDesign: 'Blended',
      tags: ['growth'],
      types: 'Professional Learning Community',
      websiteUri: 'https://oregonstate.edu',
      websiteTitle: '',
    },
  ],
};
// Resources Page with components to filter, search and favorite resources
const Training = () => {
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery] = useDebounce(query, 250);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTrainingType, setSelectedTrainingType] = useState(activeCategory);

  // const categories = useCategories();
  const trainingTypes = {
    isLoading: false,
    data: [{ name: 'All' }, { name: 'Diversity' }, { name: 'Leadership' }, { name: 'Management' }],
  };

  // const trainings = useTrainings();
  const trainings = tempResult;

  return (
    <MainGridWrapper>
      <PageTitle title="Training and Professional Development" />
      <MainGrid>
        <TrainingWrapper>
          <SearchBar
            id="training"
            labelText="Search"
            inputValue={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {activeCategory !== '' && (
            <>
              {trainingTypes?.data?.length && (
                <div style={{ marginBottom: spacing.default }}>
                  {trainingTypes.data.map((type) => (
                    <CustomBtn
                      key={type.name}
                      text={type.name}
                      id={type.name}
                      selected={
                        selectedTrainingType?.toLowerCase() === type.name.toLowerCase()
                          ? true
                          : false
                      }
                      clickHandler={() => {
                        setSelectedTrainingType(type.name);
                        setQuery(''); // clears search input since we want to show all trainings with that type
                      }}
                    />
                  ))}
                </div>
              )}
              {!trainings.isLoading && trainings.isSuccess && trainings.data?.length > 0 && (
                <VisuallyHidden>
                  <a href="#trainingResults">Skip to results</a>
                </VisuallyHidden>
              )}
              {trainingTypes.isLoading && <Skeleton />}
            </>
          )}
          {trainings.isLoading && <Skeleton count={5} />}
          {trainings.isSuccess && trainings.data.length > 0 ? (
            <FeatureCardGrid id="trainingResults">
              {trainings.data.map((t) => (
                <FeatureCard key={t.id} featured={t.featured}>
                  {t.featured && t.image && <img src={t.image} alt="" />}
                  <FeatureCardHeader>{t.title}</FeatureCardHeader>
                  {t.body && <FeatureCardContent dangerouslySetInnerHTML={{ __html: t.body }} />}
                </FeatureCard>
              ))}
            </FeatureCardGrid>
          ) : (
            !trainings.isLoading && (
              /* @TODO need mockup styling to do and messaging for no results */
              <div>No results</div>
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

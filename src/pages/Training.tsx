import React, { useEffect, useState, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components/macro';
import { useDebounce } from 'use-debounce';
import { CardBase } from 'src/ui/Card';
import { spacing, MainGridWrapper, breakpoints, fontSize, MainGrid } from 'src/theme';
import ResourcesCategories from 'src/features/resources/ResourcesCategories';
import ResourcesSearch from 'src/features/resources/ResourcesSearch';
import ResourcesList from 'src/features/resources/ResourcesList';
import { Types } from '@osu-wams/lib';
import { Resources as hooksResources, useCategories, useResources, User } from '@osu-wams/hooks';
import PageTitle from 'src/ui/PageTitle';
import VisuallyHidden from '@reach/visually-hidden';
import { activeFavoriteResources } from 'src/features/resources/resources-utils';
import { AppContext } from 'src/contexts/app-context';
import { Event } from 'src/util/gaTracking';
import {
  FeatureCard,
  FeatureCardGrid,
  FeatureCardHeader,
  FeatureCardContent,
} from 'src/ui/Card/variants/FeatureCard';

const { hasAudience, getAffiliation } = User;

const tempResult = {
  loading: false,
  data: [
    {
      audiences: ['Academic Faculty', 'Professional Faculty', 'Staff', 'Students'],
      id: '71560c56-dabb-48e1-a663-64da7a7bb6e8',
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
      id: '71560c56-dabb-48e1-a663-64da7a7bb6e8',
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
      id: '71560c56-dabb-48e1-a663-64da7a7bb6e8',
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
      id: '71560c56-dabb-48e1-a663-64da7a7bb6e8',
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
      id: '71560c56-dabb-48e1-a663-64da7a7bb6e8',
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
      id: '71560c56-dabb-48e1-a663-64da7a7bb6e8',
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
      id: '71560c56-dabb-48e1-a663-64da7a7bb6e8',
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
      id: '71560c56-dabb-48e1-a663-64da7a7bb6e81',
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
      id: '71560c56-dabb-48e1-a663-64da7a7bb6e81',
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
      id: '71560c56-dabb-48e1-a663-64da7a7bb6e81',
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
  const { user } = useContext(AppContext);
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery] = useDebounce(query, 250);
  const [activeCategory, setActiveCategory] = useState('All');
  // const categories = useCategories();
  // const res = useResources();
  const categories = { loading: false, data: ['All', 'Diversity', 'Leadership', 'Management'] };
  const trainings = tempResult;
  const [filteredResources, setFilteredResources] = useState<any>([]);

  return (
    <MainGridWrapper>
      <PageTitle title="Training and Professional Development" />
      <MainGrid>
        <TrainingWrapper>
          {activeCategory !== '' && (
            <>
              {/* <ResourcesSearch
                query={query}
                setQuery={setQuery}
                setSelectedCategory={setActiveCategory}
              /> */}
              {!trainings.loading && trainings.data.length > 0 && (
                // Anchor link matches ResourcesList component main div id
                <VisuallyHidden>
                  <a href="#resourcesResults">Skip to results</a>
                </VisuallyHidden>
              )}
              {categories.loading && <Skeleton />}
              {/* <ResourcesCategories
                categories={categories.data}
                selectedCategory={activeCategory}
                setQuery={setQuery}
                setSelectedCategory={setActiveCategory}
                hasFavorite={
                  user.data.favoriteResources && user.data.favoriteResources.some((f) => f.active)
                }
              /> */}
            </>
          )}
          {trainings.loading && <Skeleton count={5} />}
          {!trainings.loading && trainings.data.length > 0 ? (
            <FeatureCardGrid>
              {trainings.data.map((t) => (
                <FeatureCard key={t.id} featured={t.featured}>
                  {t.featured && <img src={t.image} alt="" />}
                  <FeatureCardHeader>{t.title}</FeatureCardHeader>
                  <FeatureCardContent dangerouslySetInnerHTML={{ __html: t.body }} />
                </FeatureCard>
              ))}
            </FeatureCardGrid>
          ) : (
            !trainings.loading && (
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

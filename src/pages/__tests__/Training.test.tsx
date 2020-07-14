import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'src/util/test-utils';
import userEvent from '@testing-library/user-event';
import Training from 'src/pages/Training';
import { mockGAEvent } from 'src/setupTests';
import { Trainings } from '@osu-wams/hooks';
const trainings = {
  status: 'success',
  isIdle: false,
  isLoading: false,
  isSuccess: true,
  isError: false,
  error: null,
  isFetching: false,
  failureCount: 0,
  refetch: () => {},
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
      tags: ['Employee Engagement'],
      type: 'Professional Learning Community',
      websiteUri: 'https://oregonstate.edu',
      websiteTitle: '',
    },
    {
      audiences: ['Academic Faculty', 'Professional Faculty', 'Staff', 'Students'],
      id: '71560c56-dabb-48e1-a663-64da7a7bb6e82',
      title: 'Testo Training',
      image: '',
      contact: 'noreply@oregonstate.edu',
      cost: true,
      body:
        "<p>Training Body, you'll learn how to play nice with others. Activities include sharing toys, using your words, and being patient.</p>",
      department: 'Daycare',
      duration: '1hr',
      featured: true,
      frequency: 'Daily',
      prerequisites: 'None',
      courseDesign: 'Blended',
      tags: ['Leadership'],
      type: 'Professional Learning Community',
      websiteUri: '',
      websiteTitle: '',
    },
    {
      audiences: ['Academic Faculty', 'Professional Faculty', 'Staff', 'Students'],
      id: '71560c56-dabb-48e1-a663-64da7a7bb6e83',
      title: 'Super Testo 2',
      image: 'https://data-stage.dx.oregonstate.edu/sites/default/files/2019-11/WellnessNook.jpg',
      contact: 'noreply@oregonstate.edu',
      cost: true,
      body: "<p>Super Body, you'll learn how to play nice with others.</p>",
      department: 'Daycare',
      duration: '1hr',
      featured: false,
      frequency: 'Daily',
      prerequisites: 'None',
      courseDesign: 'Blended',
      tags: ['Employee Engagement', 'Leadership'],
      type: 'Professional Learning Community',
      websiteUri: 'https://oregonstate.edu',
      websiteTitle: '',
    },
  ],
};
const mockUseTrainings = jest.fn();
const mockUseTrainingTags = jest.fn();
const mockTrainings = Trainings.mockTrainings;
const mockTrainingTags = Trainings.mockTrainingTags;

jest.mock('@osu-wams/hooks', () => {
  const original = jest.requireActual('@osu-wams/hooks');
  return {
    ...original,
    useTrainings: () => mockUseTrainings(),
    useTrainingTags: () => mockUseTrainingTags(),
  };
});

/**
 * Render Trainings with the most commonly used features
 * We reuse a lot of these elements in our tests
 * Here we can simplify the logic in one place
 */
const renderTrainings = () => {
  const utils = render(<Training />);

  const all = utils.getByLabelText('All');
  const searchInput = utils.getByPlaceholderText('Search') as HTMLInputElement;
  const leadership = utils.getByLabelText('Leadership');
  const engagement = utils.getByLabelText(/employee engagement/i);

  return {
    ...utils,
    searchInput,
    leadership,
    all,
    engagement,
  };
};

describe('<Training />', () => {
  // Set mock function result before running any tests
  beforeEach(() => {
    mockUseTrainings.mockReturnValue(trainings);
    mockUseTrainingTags.mockReturnValue(mockTrainingTags);
  });

  describe('Main components', () => {
    it('Renders and finds the page title', () => {
      renderTrainings();
      expect(screen.getByText(/Professional Development/i)).toBeInTheDocument();
    });

    it('Renders the search input', () => {
      const { searchInput } = renderTrainings();
      expect(searchInput).toBeInTheDocument();
    });

    it('Finds the tags, 3 total', () => {
      const { all, leadership, engagement } = renderTrainings();
      expect(all).toBeInTheDocument();
      expect(leadership).toBeInTheDocument();
      expect(engagement).toBeInTheDocument();
    });

    it('Finds 3 total results for trainings ', () => {
      renderTrainings();
      expect(screen.getByText(/found 3 results/i)).toBeInTheDocument();
    });

    it('Has a skip link to results with matching ID in the result container', async () => {
      renderTrainings();
      const skipLink = screen.getByText('Skip to results');
      const anchor = skipLink.getAttribute('href');

      // Anchor link above has an id in the document (result container)
      expect(document.querySelector(anchor!)).toBeInTheDocument();
    });

    it('Displays the title and body of a training', () => {
      renderTrainings();
      expect(screen.getByText(/super testo 2/i)).toBeInTheDocument();
      expect(screen.getByText(/super body/i)).toBeInTheDocument();
    });

    it('Finds 2 images, for the 2 featured items', () => {
      renderTrainings();
      const images = document.querySelectorAll('img');
      expect(images.length).toEqual(2);
    });
  });

  describe('Tag behavior', () => {
    it('Filters training results when clicking on tags', async () => {
      const { all, leadership, engagement } = renderTrainings();
      expect(all).toHaveClass('selected'); // default selected
      expect(await screen.findByText('found 3 results')).toBeInTheDocument();
      const nice = 'Play nice with others';
      expect(screen.getByText(nice)).toBeInTheDocument();

      userEvent.click(leadership);
      expect(await screen.findByText('found 2 results')).toBeInTheDocument();
      expect(screen.queryByText(nice)).toBeNull(); // Cannot find play nice since it's not tagged 'leadership'
      expect(screen.getByText(/Super Testo 2/i)).toBeInTheDocument();
      expect(leadership).toHaveClass('selected');

      userEvent.click(engagement);
      expect(await screen.findByText('found 2 results')).toBeInTheDocument();
      expect(screen.getByText(nice)).toBeInTheDocument(); // play nice is found again under 'engagement'
      expect(engagement).toHaveClass('selected');
      expect(all).not.toHaveClass('selected');
      expect(leadership).not.toHaveClass('selected');

      userEvent.click(all);
      expect(await screen.findByText('found 3 results')).toBeInTheDocument();

      expect(mockGAEvent).toHaveBeenCalledTimes(3);
    });

    it('Clicking a tag clears previously entered data and shows all results under the tag', async () => {
      const { searchInput, all } = renderTrainings();

      userEvent.type(searchInput, 'Super Testo 2');
      expect(await screen.findByText('found 1 result')).toBeInTheDocument();

      userEvent.click(all);
      expect(await screen.findByText('found 3 results')).toBeInTheDocument();
      expect(searchInput.value).toEqual('');
    });
  });

  describe('Search interactions', () => {
    it('Finds one result for Super Testo 2', async () => {
      const { searchInput } = renderTrainings();
      userEvent.type(searchInput, 'Super Testo 2');

      expect(await screen.findByText('found 1 result')).toBeInTheDocument();

      expect(screen.getByText(/Super Testo 2/i)).toBeInTheDocument();
    });

    it('Finds zero results when typing something bogus', async () => {
      const { searchInput } = renderTrainings();
      // initally finds super testo
      expect(screen.getByText(/Super Testo 2/i)).toBeInTheDocument();

      userEvent.type(searchInput, 'noResultsHere');
      expect(await screen.findByText('found 0 results')).toBeInTheDocument();
      expect(await screen.findByText('Try another search term')).toBeInTheDocument();

      // no longer shows up
      expect(screen.queryByText(/Super Testo 2/i)).toBeNull();
      expect(mockGAEvent).toHaveBeenCalledTimes(1);
    });

    it('Clicking a tag clears previously entered data and shows all results under the tag', async () => {
      const { searchInput } = renderTrainings();
      userEvent.type(searchInput, 'Super Testo 2');

      expect(await screen.findByText('found 1 result')).toBeInTheDocument();
    });

    it('Searches activate the "all" tag and looks through all trainings even if a different tag was selected', async () => {
      const { all, searchInput, leadership } = renderTrainings();
      const nice = 'Play nice with others';
      userEvent.click(leadership);
      expect(await screen.findByText('found 2 results')).toBeInTheDocument();
      expect(screen.queryByText(nice)).toBeNull(); // Cannot find play nice since it's not tagged 'leadership'

      userEvent.type(searchInput, nice);
      expect(await screen.findByText(nice)).toBeInTheDocument();
      expect(all).toHaveClass('selected'); // all tag selected
    });

    it('Changing search term re-runs the search and finds result', async () => {
      const { searchInput } = renderTrainings();

      userEvent.type(searchInput, 'noResultsHere');
      expect(await screen.findByText('found 0 results')).toBeInTheDocument();

      searchInput.value = ''; // clear search term

      userEvent.type(searchInput, 'Super Testo 2');
      expect(await screen.findByText('found 1 result')).toBeInTheDocument();
      expect(await screen.findByText('Super Testo 2')).toBeInTheDocument();
    });
  });

  describe('Modal interactions', () => {
    it('Can open and close the Training Details modal', async () => {
      renderTrainings();
      userEvent.click(screen.getByText('Super Testo 2'));

      const close = await screen.findByRole('button', { name: /close/i });
      expect(close).toBeInTheDocument();

      userEvent.click(close);
      expect(screen.queryByRole('button', { name: /close/i })).toBeNull();
    });
  });
});

/**
 * TODO: modals
 * can open and close
 * data is present
 * with contact entered and NO website
 * with website and contact entered
 */

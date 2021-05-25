import React from 'react';
import { screen } from '@testing-library/react';
import { mockEmployeeUser, renderWithAllContexts as render } from 'src/util/test-utils';
import userEvent from '@testing-library/user-event';
import Training from 'src/pages/Training';
import { mockGAEvent, mockInitialState } from 'src/setupTests';
import { State, Trainings } from '@osu-wams/hooks';

const { trainingTagState, trainingAudienceState, trainingState } = State;
/**
 * Render Trainings with the most commonly used features
 * We reuse a lot of these elements in our tests
 */
const renderTrainings = () => {
  render(<Training />, { user: mockEmployeeUser, initialStates: mockInitialState() });

  const category = screen.getByRole('button', { name: 'Category Category' });
  const audience = screen.getByRole('button', { name: 'Audience Audience' });
  const searchInput = screen.getByPlaceholderText('Search for trainings') as HTMLInputElement;
  return {
    searchInput,
    category,
    audience,
  };
};

describe('<Training />', () => {
  beforeEach(() => {
    mockInitialState.mockReturnValue([
      {
        state: trainingAudienceState,
        value: Trainings.mockTrainingAudiences,
      },
      {
        state: trainingTagState,
        value: Trainings.mockTrainingTags,
      },
      { state: trainingState, value: Trainings.mockTrainings },
    ]);
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

    it('Finds the categories, 3 total', async () => {
      const { category } = renderTrainings();
      expect(category).toBeInTheDocument();
      userEvent.click(category);

      expect(screen.getByRole('menuitem', { name: /All Trainings/i })).toBeInTheDocument();

      expect(screen.getByText('Leadership')).toBeInTheDocument();
      expect(screen.getByText('Employee Engagement')).toBeInTheDocument();
    });

    it('Finds the audience, 2 total', async () => {
      const { audience } = renderTrainings();
      expect(audience).toBeInTheDocument();
      userEvent.click(audience);
      expect(screen.getByText('All Audiences')).toBeInTheDocument();
      expect(screen.getByText('Classified Staff')).toBeInTheDocument();
      expect(screen.getByText('Student')).toBeInTheDocument();
    });

    it('Finds 3 total results for trainings ', async () => {
      renderTrainings();
      expect(await screen.findByText(/found 3 results/i)).toBeInTheDocument();
    });

    it('Has a skip link to results with matching ID in the result container', async () => {
      renderTrainings();
      const skipLink = await screen.findByText('Skip to results');
      const anchor = skipLink.getAttribute('href');

      // Anchor link above has an id in the document (result container)
      expect(document.querySelector(anchor!)).toBeInTheDocument();
    });

    it('Displays the title and body of a training', async () => {
      renderTrainings();
      expect(await screen.findByText(/super testo 2/i)).toBeInTheDocument();
      expect(await screen.findByText(/super body/i)).toBeInTheDocument();
    });

    it('Finds 2 images, for the 2 featured items', async () => {
      renderTrainings();

      expect(await screen.findByText(/super testo 2/i)).toBeInTheDocument();

      const images = document.querySelectorAll('img');
      expect(images.length).toEqual(2);
    });
  });

  describe('Filter behavior', () => {
    it('Filters training results when clicking on category button', async () => {
      const { category } = renderTrainings();
      expect(await screen.findByText('found 3 results')).toBeInTheDocument();
      const nice = 'Play nice with others';
      expect(screen.getByText(nice)).toBeInTheDocument();

      userEvent.click(category);
      const alltrainings = await screen.findByRole('menuitem', { name: /All Trainings/i });
      const leadership = await screen.findByText('Leadership');
      const engagement = await screen.findByText('Employee Engagement');

      userEvent.click(leadership);
      expect(category).toHaveTextContent('Leadership');
      expect(await screen.findByText('found 2 results')).toBeInTheDocument();
      expect(screen.queryByText(nice)).not.toBeInTheDocument(); // Cannot find play nice since it's not tagged 'leadership'
      expect(screen.getByText(/Super Testo 2/i)).toBeInTheDocument();

      userEvent.click(engagement);
      expect(category).toHaveTextContent('Employee Engagement');
      expect(await screen.findByText('found 2 results')).toBeInTheDocument();
      expect(screen.getByText(nice)).toBeInTheDocument(); // play nice is found again under 'engagement'

      userEvent.click(alltrainings);
      expect(category).toHaveTextContent('Category');
      expect(await screen.findByText('found 3 results')).toBeInTheDocument();

      expect(mockGAEvent).toHaveBeenCalledTimes(4);
    });

    it('Filters training results when clicking on audience button', async () => {
      const { audience } = renderTrainings();
      expect(await screen.findByText('found 3 results')).toBeInTheDocument();
      const nice = 'Play nice with others';
      expect(screen.getByText(nice)).toBeInTheDocument();

      userEvent.click(audience);
      const allaudience = await screen.findByText('All Audiences');
      const classified = await screen.findByText('Classified Staff');
      const student = await screen.findByText('Student');

      userEvent.click(classified);
      expect(audience).toHaveTextContent('Classified Staff');
      expect(await screen.findByText('found 2 results')).toBeInTheDocument();
      expect(screen.queryByText(nice)).not.toBeInTheDocument(); // Cannot find play nice since it's not for 'Classified Staff' audience
      expect(screen.getByText(/Super Testo 2/i)).toBeInTheDocument();

      userEvent.click(student);
      expect(audience).toHaveTextContent('Student');
      expect(await screen.findByText('found 1 result')).toBeInTheDocument();
      expect(screen.getByText(nice)).toBeInTheDocument(); // play nice is found again for 'Student' audience

      userEvent.click(allaudience);
      expect(audience).toHaveTextContent('Audience');
      expect(await screen.findByText('found 3 results')).toBeInTheDocument();

      expect(mockGAEvent).toHaveBeenCalledTimes(4);
    });

    it('Filters training as a composite of both audience and category', async () => {
      const { audience, category } = renderTrainings();
      expect(await screen.findByText('found 3 results')).toBeInTheDocument();
      const nice = 'Play nice with others';
      expect(screen.getByText(nice)).toBeInTheDocument();

      userEvent.click(audience);
      const allaudience = await screen.findByText('All Audiences');
      const classified = await screen.findByText('Classified Staff');
      userEvent.click(category);
      const alltrainings = await screen.findByRole('menuitem', { name: /All Trainings/i });
      const engagement = await screen.findByText('Employee Engagement');

      // Set an audience filter and find 1 training is filtered out now.
      userEvent.click(classified);
      expect(audience).toHaveTextContent('Classified Staff');
      expect(await screen.findByText('found 2 results')).toBeInTheDocument();
      expect(screen.queryByText(nice)).not.toBeInTheDocument(); // Cannot find play nice since it's not for 'Classified Staff' audience
      expect(screen.getByText(/Super Testo 2/i)).toBeInTheDocument();

      // Add the category filter and find that another training has been filtered out now.
      userEvent.click(engagement);
      expect(category).toHaveTextContent('Employee Engagement');
      expect(await screen.findByText('found 1 result')).toBeInTheDocument();
      expect(screen.queryByText(/Testo Training/i)).not.toBeInTheDocument(); // Cannot find Testo Training because it's not for 'Employee Engagement'

      // Unset the category filter and find that more results show again.
      userEvent.click(alltrainings);
      expect(category).toHaveTextContent('Category');
      expect(await screen.findByText('found 2 results')).toBeInTheDocument(); // Reset to all categories now shows the filter as it was with audiences filtered only

      // Unset the audience filter and find that all results show now.
      userEvent.click(allaudience);
      expect(audience).toHaveTextContent('Audience');
      expect(await screen.findByText('found 3 results')).toBeInTheDocument(); // Reset to all trainings now shows with no filters set

      expect(mockGAEvent).toHaveBeenCalledTimes(6);
    });

    it('Clicking a category clears previously entered data and shows all results under the tag', async () => {
      const { searchInput, category } = renderTrainings();

      userEvent.type(searchInput, 'Super Testo 2');
      expect(await screen.findByText('found 1 result')).toBeInTheDocument();
      userEvent.click(category);
      const alltrainings = await screen.findByRole('menuitem', { name: /All Trainings/i });
      userEvent.click(alltrainings);
      expect(await screen.findByText('found 3 results')).toBeInTheDocument();
      expect(searchInput.value).toEqual('');
    });

    it('Can show and hide header Spotlighted Trainings as needed', async () => {
      const { searchInput } = renderTrainings();

      expect(await screen.findByText('Spotlighted Trainings')).toBeInTheDocument();
      userEvent.type(searchInput, 'Super Testo 2');

      expect(await screen.findByText('found 1 result')).toBeInTheDocument();

      expect(await screen.findByRole('heading', { name: /All Trainings/i }));
      expect(screen.queryByText('Spotlighted Trainings')).not.toBeInTheDocument();
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
      expect(await screen.findByText(/Super Testo 2/i)).toBeInTheDocument();

      userEvent.type(searchInput, 'noResultsHere');
      expect(await screen.findByText('found 0 results')).toBeInTheDocument();
      expect(await screen.findByText('Try another search term')).toBeInTheDocument();

      // no longer shows up
      expect(screen.queryByText(/Super Testo 2/i)).not.toBeInTheDocument();
      expect(mockGAEvent).toHaveBeenCalledTimes(1);
    });

    it('Clicking a tag clears previously entered data and shows all results under the tag', async () => {
      const { searchInput } = renderTrainings();
      userEvent.type(searchInput, 'Super Testo 2');

      expect(await screen.findByText('found 1 result')).toBeInTheDocument();
    });

    it('Searches reset category and audience filters and looks through all trainings', async () => {
      const { category, searchInput } = renderTrainings();
      const nice = 'Play nice with others';
      userEvent.click(category);
      const leadership = await screen.findByText('Leadership');
      userEvent.click(leadership);
      expect(await screen.findByText('found 2 results')).toBeInTheDocument();
      expect(screen.queryByText(nice)).not.toBeInTheDocument(); // Cannot find play nice since it's not tagged 'leadership'

      userEvent.type(searchInput, nice);
      expect(await screen.findByText(nice)).toBeInTheDocument();
    });

    it('Changing search term re-runs the search and finds result', async () => {
      const { searchInput } = renderTrainings();

      userEvent.type(searchInput, 'noResultsHere');
      expect(await screen.findByText('found 0 results')).toBeInTheDocument();

      searchInput.value = ''; // clear search term

      userEvent.type(searchInput, 'Super Testo');
      expect(await screen.findByText('found 1 result')).toBeInTheDocument();
      expect(await screen.findByText('Super Testo 2')).toBeInTheDocument();
    });
  });

  describe('Modal interactions', () => {
    it('Can open and close the Training Details modal', async () => {
      renderTrainings();
      userEvent.click(await screen.findByText(/Super Testo 2/i));

      const close = await screen.findByRole('button', { name: /close/i });
      expect(close).toBeInTheDocument();

      userEvent.click(close);
      expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
    });
  });
});

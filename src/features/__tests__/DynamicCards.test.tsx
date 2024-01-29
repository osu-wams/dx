/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { screen, within } from '@testing-library/react';
import {
  renderWithRouter as render,
  mockEmployeeUser,
  mockGradUser,
  mockStudentEmployeeUser,
} from 'src/util/test-utils';
import Dashboard from 'src/pages/Dashboard';
import Finances from 'src/pages/Finances';
import Academics from 'src/pages/Academics';
import Profile from 'src/pages/Profile';
import { State, Resources, Cards } from '@osu-wams/hooks';
import { mockCourseSchedule } from 'src/mocks/handlers';

const { courseState, resourceState, dynamicCardState } = State;
const { resourcesData } = Resources.mockResources;
const { cardsData } = Cards.mockCards;

const mockResourceData = jest.fn();
const mockCardData = jest.fn();
const mockInitialState = jest.fn();
const mockPostFavorite = jest.fn();

jest.mock('@osu-wams/hooks', () => {
  const original = jest.requireActual('@osu-wams/hooks');
  return {
    ...original,
    Resources: {
      ...original.Resources,
      postFavorite: () => mockPostFavorite(),
    },
  };
});

describe('<DynamicCard />', () => {
  beforeEach(() => {
    mockCardData.mockReturnValue(cardsData);
    mockResourceData.mockReturnValue(resourcesData);
    mockInitialState.mockReturnValue([
      {
        state: resourceState,
        value: () => mockResourceData(),
      },
      {
        state: dynamicCardState,
        value: () => mockCardData(),
      },
      {
        state: courseState,
        value: { isLoading: false, isError: false, isSuccess: true, data: mockCourseSchedule },
      },
    ]);
  });

  describe('<Dashboard />', () => {
    it('Employee should find "All Employees" Dynamic Card NOT "All Students"', async () => {
      mockCardData.mockReturnValue({
        ...cardsData,
        data: [{ ...cardsData.data[4] }],
      });
      render(<Dashboard />, { user: mockEmployeeUser, initialStates: mockInitialState() });

      const cardTitle = await screen.findByText(/All Employees!/i);
      expect(cardTitle).toBeInTheDocument();

      const dynamicCard = cardTitle.closest('div');
      // Finds Bend Resource and Student one because we don't filter resources further (filter is on Card)
      expect(within(dynamicCard!).getByText(/Bend Testo Success Center/i)).toBeInTheDocument();
      expect(within(dynamicCard!).getByText(/Academics for Student Athletes/i)).toBeInTheDocument();

      // Does not find Student affiliation dynamic card or Graduate Student card
      expect(screen.queryByText(/All Students!/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Graduates Card!/i)).not.toBeInTheDocument();
    });
  });

  describe('Finances', () => {
    beforeEach(() => {
      mockCardData.mockReturnValue({
        ...cardsData,
        data: [
          { ...cardsData.data[1], pages: ['Finances'] },
          { ...cardsData.data[3], pages: ['Finances'] },
          { ...cardsData.data[4], pages: ['Finances'] },
        ],
      });
    });
    it('Employee should find "All Employees" Dynamic Card', async () => {
      render(<Finances />, { user: mockEmployeeUser, initialStates: mockInitialState() });

      expect(screen.getByText(/All Employees!/i)).toBeInTheDocument();

      expect(screen.queryByText(/All Students!/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Graduates Card!/i)).not.toBeInTheDocument();
    });

    it('Undergrad should only find "All Students" Dynamic Card', async () => {
      render(<Finances />, { initialStates: mockInitialState() });

      expect(screen.getByText(/All Students!/i)).toBeInTheDocument();

      expect(screen.queryByText(/All Employees!/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Graduates Card!/i)).not.toBeInTheDocument();
    });

    it('Grad Student should find "All Students" and "Graduates Card" Dynamic Cards', async () => {
      render(<Finances />, { initialStates: mockInitialState(), user: mockGradUser });

      expect(screen.getByText(/All Students!/i)).toBeInTheDocument();
      expect(screen.getByText(/Graduates Card!/i)).toBeInTheDocument();

      expect(screen.queryByText(/All Employees!/i)).not.toBeInTheDocument();
    });
  });

  describe('Academics', () => {
    beforeEach(() => {
      mockCardData.mockReturnValue({
        ...cardsData,
        data: [
          { ...cardsData.data[1], pages: ['Academics'] },
          { ...cardsData.data[3], pages: ['Academics'] },
          { ...cardsData.data[4], pages: ['Academics'] },
        ],
      });
    });
    it('Employee should find "All Employees" Dynamic Card', async () => {
      render(<Academics />, { user: mockEmployeeUser, initialStates: mockInitialState() });

      expect(screen.getByText(/All Employees!/i)).toBeInTheDocument();
      expect(screen.queryByText(/All Students!/i)).not.toBeInTheDocument();
    });

    it('Undergrad should only find "All Students" Dynamic Card', async () => {
      render(<Academics />, { initialStates: mockInitialState() });

      expect(screen.getByText(/All Students!/i)).toBeInTheDocument();
      expect(screen.queryByText(/All Employees!/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Graduates Card!/i)).not.toBeInTheDocument();
    });

    it('Grad Student should find "All Students" and "Graduates Card" Dynamic Cards', async () => {
      render(<Academics />, { user: mockGradUser, initialStates: mockInitialState() });

      expect(screen.getByText(/All Students!/i)).toBeInTheDocument();
      expect(screen.getByText(/Graduates Card!/i)).toBeInTheDocument();

      expect(screen.queryByText(/All Employees!/i)).not.toBeInTheDocument();
    });
  });

  describe('Profile', () => {
    beforeEach(() => {
      mockCardData.mockReturnValue({
        ...cardsData,
        data: [
          { ...cardsData.data[1], pages: ['Profile'] },
          { ...cardsData.data[3], pages: ['Profile'] },
          { ...cardsData.data[4], pages: ['Profile'] },
        ],
      });
    });
    it('Employee should find "All Employees" Dynamic Card', async () => {
      render(<Profile />, { user: mockEmployeeUser, initialStates: mockInitialState() });

      expect(screen.getByText(/All Employees!/i)).toBeInTheDocument();
      expect(screen.queryByText(/All Students!/i)).not.toBeInTheDocument();
    });

    it('Undergrad should only find "All Students" Dynamic Card', async () => {
      render(<Profile />, { initialStates: mockInitialState() });

      expect(screen.getByText(/All Students!/i)).toBeInTheDocument();
      expect(screen.queryByText(/All Employees!/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Graduates Card!/i)).not.toBeInTheDocument();
    });

    it('Grad Student should find "All Students" and "Graduates Card" Dynamic Cards', async () => {
      render(<Profile />, { user: mockGradUser, initialStates: mockInitialState() });

      expect(screen.getByText(/All Students!/i)).toBeInTheDocument();
      expect(screen.getByText(/Graduates Card!/i)).toBeInTheDocument();

      expect(screen.queryByText(/All Employees!/i)).not.toBeInTheDocument();
    });
  });
});

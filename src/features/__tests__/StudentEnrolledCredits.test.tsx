import React from 'react';
import { render } from 'src/util/test-utils';
import { screen } from '@testing-library/react';
import StudentEnrolledCredits from '../academic-overview/StudentEnrolledCredits';
import { courseState } from 'src/state/courses';
import { mockCourseSchedule } from 'src/mocks/handlers';

const mockInitialState = jest.fn();

describe('<StudentEnrolledCredits />', () => {
  it('should render and have the approriate standing', async () => {
    mockInitialState.mockReturnValue([
      {
        state: courseState,
        value: {
          isLoading: false,
          isError: false,
          isSuccess: true,
          data: mockCourseSchedule,
        },
      },
    ]);
    render(<StudentEnrolledCredits />, { initialStates: mockInitialState() });
    const element = await screen.findByText('21');
    expect(element).toBeInTheDocument();
  });

  it('should return appropriate text when data is empty', async () => {
    mockInitialState.mockReturnValue([
      {
        state: courseState,
        value: {
          isLoading: false,
          isError: false,
          isSuccess: true,
          data: [],
        },
      },
    ]);
    render(<StudentEnrolledCredits />, { initialStates: mockInitialState() });
    const element = await screen.findByText('0');
    expect(element).toBeInTheDocument();
  });
});

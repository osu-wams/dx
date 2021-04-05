import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render, mockGradUser } from 'src/util/test-utils';
import AcademicOverview from '../AcademicOverview';
import { mockGAEvent } from 'src/setupTests';
import { courseState } from 'src/state';
import { mockCourseSchedule } from 'src/mocks/handlers';

const mockInitialState = jest.fn();

describe('<Academic Overview />', () => {
  beforeEach(() => {
    mockInitialState.mockReturnValue([
      {
        state: courseState,
        value: { isLoading: false, isError: false, isSuccess: true, data: mockCourseSchedule },
      },
    ]);
  });

  it('Undergraduate Student has some data, including holds, and academic standing', async () => {
    render(<AcademicOverview />, { initialStates: mockInitialState() });
    expect(await screen.findByText(/view more in mydegrees/i)).toBeInTheDocument();
    expect(await screen.findByText(/hold on your student account/i)).toBeInTheDocument();
    expect(await screen.findByText('Academic Standing')).toBeInTheDocument();
    expect(await screen.findByText(/Good Standing/i)).toBeInTheDocument();
    expect(await screen.findByText(/3.1/i)).toBeInTheDocument(); // GPA
    expect(await screen.findByText(/22/i)).toBeInTheDocument(); // Credits
    expect(await screen.findByText(/bill is overdue/i)).toBeInTheDocument();
  });

  it('Graduate Student does not see Academic Standing or My Degrees link', async () => {
    const { debug } = render(<AcademicOverview />, {
      user: mockGradUser,
      initialStates: mockInitialState(),
    });

    expect(await screen.findByText(/bill is overdue/i)).toBeInTheDocument();
    expect(screen.queryByText('View more in MyDegrees')).not.toBeInTheDocument();
    expect(screen.queryByText('Academic Standing')).not.toBeInTheDocument();
  });

  it('Academic Overview has a footer that can be clicked to access My Degrees', async () => {
    render(<AcademicOverview />, { initialStates: mockInitialState() });
    userEvent.click(await screen.findByText('View more in MyDegrees'));
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });
});

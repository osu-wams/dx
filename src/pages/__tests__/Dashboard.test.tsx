import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouter as render, mockEmployeeUser } from 'src/util/test-utils';
import { mockInitialState } from 'src/setupTests';
import { State } from '@osu-wams/hooks';
import { mockCourseSchedule } from 'src/mocks/handlers';

import Dashboard from '../Dashboard';

describe('<StudentDashboard />', () => {
  beforeEach(() => {
    mockInitialState.mockReturnValueOnce([
      {
        state: State.courseState,
        value: { isLoading: false, isError: false, isSuccess: true, data: mockCourseSchedule },
      },
    ]);
    render(<Dashboard />, { initialStates: mockInitialState() });
  });
  it('renders the student dashboard', async () => {
    expect(screen.getByTestId('student-dashboard-page')).toBeInTheDocument();
  });

  it('should find "Courses" and IT System status card in the Student Dashboard', async () => {
    expect(screen.getByText('Courses')).toBeInTheDocument();
    expect(await screen.findByText(/Major Outage/i)).toBeInTheDocument();
  });
});

describe('<EmployeeDashboard />', () => {
  beforeEach(() => {
    render(<Dashboard />, { user: mockEmployeeUser });
  });

  it('renders the employee dashboard', async () => {
    expect(screen.getByTestId('employee-dashboard-page')).toBeInTheDocument();
  });

  it('should find Employee Tools card and IT System Status', async () => {
    expect(screen.getByText('Employee Tools')).toBeInTheDocument();
    expect(await screen.findByText(/Major Outage/i)).toBeInTheDocument();
  });
});

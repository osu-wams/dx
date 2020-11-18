import React from 'react';
import { screen } from '@testing-library/react';
import { render, mockEmployeeUser } from 'src/util/test-utils';
import Dashboard from '../Dashboard';

describe('<StudentDashboard />', () => {
  beforeEach(() => {
    render(<Dashboard />);
  });
  it('renders the student dashboard', async () => {
    expect(screen.getByTestId('student-dashboard-page')).toBeInTheDocument();
  });

  it('should find "Courses" and IT System status card in the Student Dashboard', async () => {
    expect(await screen.findByText('Courses')).toBeInTheDocument();
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
    expect(await screen.findByText('Employee Tools')).toBeInTheDocument();
    expect(await screen.findByText(/Major Outage/i)).toBeInTheDocument();
  });
});

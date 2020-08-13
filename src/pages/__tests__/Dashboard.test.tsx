import React from 'react';
import { screen } from '@testing-library/react';
import { render, mockEmployeeUser } from 'src/util/test-utils';
import Dashboard from '../Dashboard';

describe('<Dashboard />', () => {
  it('renders', async () => {
    render(<Dashboard />);
    expect(screen.getByTestId('student-dashboard-page')).toBeInTheDocument();
  });

  it('should find "Courses" in the Student Dashboard', async () => {
    render(<Dashboard />);
    const courses = await screen.findByText('Courses');
    expect(courses).toBeInTheDocument();
  });

  it('should find Employee Tools card', async () => {
    render(<Dashboard />, { user: mockEmployeeUser });
    const empcenter = await screen.findByText('Employee Tools');
    expect(empcenter).toBeInTheDocument();
  });
});

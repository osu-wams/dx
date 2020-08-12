import React from 'react';
import { render, mockEmployeeUser } from 'src/util/test-utils';
import Dashboard from '../Dashboard';

describe('<Dashboard />', () => {
  it('renders', async () => {
    const { getByTestId } = render(<Dashboard />);
    expect(getByTestId('student-dashboard-page')).toBeInTheDocument();
  });

  it('should find "Courses" in the Student Dashboard', async () => {
    const { findByText } = render(<Dashboard />);
    const courses = await findByText('Courses');
    expect(courses).toBeInTheDocument();
  });

  it('should find Employee Tools card', () => {
    const { getByText } = render(<Dashboard />, { user: mockEmployeeUser });
    const empcenter = getByText('Employee Tools');
    expect(empcenter).toBeInTheDocument();
  });
});

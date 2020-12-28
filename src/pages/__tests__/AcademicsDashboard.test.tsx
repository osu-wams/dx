import React from 'react';
import { render, alterMock } from 'src/util/test-utils';
import AcademicsDashboard from '../Academics/AcademicsDashboard';
import { screen } from '@testing-library/react';
import { ANNOUNCEMENTS_API } from 'src/mocks/apis';

describe('<AcademicsDashboard />', () => {
  it('renders without errors', async () => {
    render(<AcademicsDashboard />);
    screen.getByTestId('academics-dashboard');
  });

  it('should not render Announcements with no events', async () => {
    alterMock(ANNOUNCEMENTS_API, []);
    render(<AcademicsDashboard />);

    // Finds Academic Calendar Events
    expect(await screen.findByText(/Week Zero Summer Session Ends/i)).toBeInTheDocument();

    // Does not render Academic Announcements
    expect(screen.queryByTestId('academics-announcements')).not.toBeInTheDocument();
  });

  it('should render Announcements and event cards when at least one event is present', async () => {
    render(<AcademicsDashboard />);
    expect(await screen.findByTestId('academics-announcements')).toBeInTheDocument();
    expect(await screen.findAllByTestId('eventcard')).toHaveLength(2);
  });
});

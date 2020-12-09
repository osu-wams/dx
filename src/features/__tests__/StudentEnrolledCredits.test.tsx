import React from 'react';
import { alterMock, render } from 'src/util/test-utils';
import { screen } from '@testing-library/react';
import StudentEnrolledCredits from '../academic-overview/StudentEnrolledCredits';
import { CLASS_SCHEDULE_API } from 'src/mocks/apis';

describe('<StudentEnrolledCredits />', () => {
  it('should render and have the approriate standing', async () => {
    render(<StudentEnrolledCredits />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();

    const element = await screen.findByText('21');
    expect(element).toBeInTheDocument();

    expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
  });

  it('should return appropriate text when data is empty', async () => {
    alterMock(CLASS_SCHEDULE_API, []);
    render(<StudentEnrolledCredits />);
    const element = await screen.findByText('0');
    expect(element).toBeInTheDocument();
  });
});

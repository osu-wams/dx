import React from 'react';
import { waitForElement } from '@testing-library/react';
import { render } from '../../util/test-utils';
import StudentEnrolledCredits from '../academic-overview/StudentEnrolledCredits';

const mockGetAcademicStatus = jest.fn();

jest.mock('../../api/student/academic-status', () => ({
  getAcademicStatus: () => mockGetAcademicStatus()
}));

describe('<StudentEnrolledCredits />', () => {
  it('should render and have the approriate standing', async () => {
    mockGetAcademicStatus.mockResolvedValue(Promise.resolve({ creditHoursAttempted: 800 }));
    const { getByText } = render(<StudentEnrolledCredits />);
    const element = await waitForElement(() => getByText('800'));
    expect(element).toBeInTheDocument();
  });

  it('should return appropriate text when data is empty', async () => {
    mockGetAcademicStatus.mockResolvedValue(Promise.resolve({}));
    const { getByText } = render(<StudentEnrolledCredits />);
    const element = await waitForElement(() => getByText('0'));
    expect(element).toBeInTheDocument();
  });
});

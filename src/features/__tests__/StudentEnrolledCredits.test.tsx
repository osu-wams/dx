import React from 'react';
import { waitForElement } from '@testing-library/react';
import { render } from '../../util/test-utils';
import StudentEnrolledCredits from '../academic-overview/StudentEnrolledCredits';

const mockUseCourseSchedule = jest.fn();

jest.mock('../../api/student/course-schedule', () => ({
  useCourseSchedule: () => mockUseCourseSchedule()
}));

describe('<StudentEnrolledCredits />', () => {
  it('should render and have the approriate standing', async () => {
    mockUseCourseSchedule.mockReturnValue({
      data: 7,
      loading: false,
      error: false
    });
    const { getByText } = render(<StudentEnrolledCredits />);
    const element = await waitForElement(() => getByText('7'));
    expect(element).toBeInTheDocument();
  });

  it('should return appropriate text when data is empty', async () => {
    mockUseCourseSchedule.mockReturnValue({data: 0, loading: false, error: false});
    const { getByText } = render(<StudentEnrolledCredits />);
    const element = await waitForElement(() => getByText('0'));
    expect(element).toBeInTheDocument();
  });
});

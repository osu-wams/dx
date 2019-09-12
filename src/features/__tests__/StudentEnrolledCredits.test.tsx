import React from 'react';
import { waitForElement } from '@testing-library/react';
import { render } from '../../util/test-utils';
import StudentEnrolledCredits from '../academic-overview/StudentEnrolledCredits';

const mockGetCourseSchedule = jest.fn();

jest.mock('../../api/student/course-schedule', () => ({
  getCourseSchedule: () => mockGetCourseSchedule()
}));

describe('<StudentEnrolledCredits />', () => {
  it('should render and have the approriate standing', async () => {
    mockGetCourseSchedule.mockResolvedValue(
      Promise.resolve([{ attributes: { creditHours: 5 } }, { attributes: { creditHours: 2 } }])
    );
    const { getByText } = render(<StudentEnrolledCredits />);
    const element = await waitForElement(() => getByText('7'));
    expect(element).toBeInTheDocument();
  });

  it('should return appropriate text when data is empty', async () => {
    mockGetCourseSchedule.mockResolvedValue(Promise.resolve([]));
    const { getByText } = render(<StudentEnrolledCredits />);
    const element = await waitForElement(() => getByText('0'));
    expect(element).toBeInTheDocument();
  });
});

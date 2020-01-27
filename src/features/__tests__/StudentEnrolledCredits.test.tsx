import React from 'react';
import { waitForElement } from '@testing-library/react';
import { render } from '../../util/test-utils';
import StudentEnrolledCredits from '../academic-overview/StudentEnrolledCredits';
import { Student } from '@osu-wams/hooks';

const { schedule: mockCourseSchedule } = Student.CourseSchedule.mockCourseSchedule;
const mockUseCourseSchedule = jest.fn();

jest.mock('@osu-wams/hooks', () => {
  return {
    ...jest.requireActual('@osu-wams/hooks'),
    useCourseSchedule: () => mockUseCourseSchedule()
  };
});

describe('<StudentEnrolledCredits />', () => {
  it('should render and have the approriate standing', async () => {
    mockUseCourseSchedule.mockReturnValue(mockCourseSchedule);
    const { getByText } = render(<StudentEnrolledCredits />);
    const element = await waitForElement(() => getByText('20'));
    expect(element).toBeInTheDocument();
  });

  it('should return appropriate text when data is empty', async () => {
    mockUseCourseSchedule.mockReturnValue({ data: [], loading: false, error: false });
    const { getByText } = render(<StudentEnrolledCredits />);
    const element = await waitForElement(() => getByText('0'));
    expect(element).toBeInTheDocument();
  });
});

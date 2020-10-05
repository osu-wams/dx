import React from 'react';
import { render } from 'src/util/test-utils';
import StudentEnrolledCredits from '../academic-overview/StudentEnrolledCredits';
import { Student } from '@osu-wams/hooks';

const { schedule: mockCourseSchedule } = Student.CourseSchedule.mockCourseSchedule;
const mockUseCourseSchedule = jest.fn();

jest.mock('@osu-wams/hooks', () => {
  return {
    ...jest.requireActual('@osu-wams/hooks'),
    useCourseSchedule: () => mockUseCourseSchedule(),
  };
});

describe('<StudentEnrolledCredits />', () => {
  it('should render and have the approriate standing', () => {
    mockUseCourseSchedule.mockReturnValue(mockCourseSchedule);
    const { getByText } = render(<StudentEnrolledCredits />);
    const element = getByText('21');
    expect(element).toBeInTheDocument();
  });

  it('should return appropriate text when data is empty', () => {
    mockUseCourseSchedule.mockReturnValue({ data: [], loading: false, error: false });
    const { getByText } = render(<StudentEnrolledCredits />);
    const element = getByText('0');
    expect(element).toBeInTheDocument();
  });
});

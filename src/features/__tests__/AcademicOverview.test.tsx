import React from 'react';
import { waitForElement, fireEvent } from '@testing-library/react';
import { render } from '../../util/test-utils';
import AcademicOverview from '../AcademicOverview';
import { gpaUndergraduateData } from '../../api/student/__mocks__/gpa.data';
import { mockGAEvent } from '../../setupTests';
import { Student } from '@osu-wams/hooks';

const mockAcademicStatus = Student.AcademicStatus.mockAcademicStatus;
const mockUseAcademicStatus = jest.fn();
const mockUseStudentGpa = jest.fn();
const mockCourseSchedule = Student.CourseSchedule.mockCourseSchedule.schedule;
const mockUseCourseSchedule = jest.fn();
const mockUseAccountHolds = jest.fn();

jest.mock('@osu-wams/hooks', () => {
  return {
    ...jest.requireActual('@osu-wams/hooks'),
    useAcademicStatus: () => mockUseAcademicStatus(),
    useCourseSchedule: () => mockUseCourseSchedule()
  };
});

jest.mock('../../api/student/holds', () => ({
  useAccountHolds: () => mockUseAccountHolds()
}));

jest.mock('../../api/student/gpa', () => ({
  useGpa: () => mockUseStudentGpa()
}));

describe('<Academic Overview />', () => {
  it('Academic Overview has a footer that can be clicked to access My Degrees', async () => {
    mockUseStudentGpa.mockReturnValue({ data: gpaUndergraduateData, loading: false, error: false });
    mockUseAcademicStatus.mockReturnValue(mockAcademicStatus);
    mockUseCourseSchedule.mockReturnValue(mockCourseSchedule);
    mockUseAccountHolds.mockReturnValue({
      data: [{ description: 'blah' }, { description: 'BobRoss' }],
      loading: false,
      error: false
    });
    const { getByText } = render(<AcademicOverview />);
    const element = await waitForElement(() => getByText('View more in MyDegrees'));
    fireEvent.click(element);
    expect(mockGAEvent).toHaveBeenCalled();
  });
});

import React from 'react';
import { waitForElement, fireEvent } from '@testing-library/react';
import { render, mockUser, authUser } from '../../util/test-utils';
import AcademicOverview from '../AcademicOverview';
import { mockGAEvent } from '../../setupTests';
import { Student } from '@osu-wams/hooks';

const { gpaHookData, gpaUndergraduateData } = Student.Gpa.mockGpa;
const mockAcademicStatus = Student.AcademicStatus.mockAcademicStatus;
const mockUseAcademicStatus = jest.fn();
const mockUseStudentGpa = jest.fn();
const mockCourseSchedule = Student.CourseSchedule.mockCourseSchedule.schedule;
const mockUseCourseSchedule = jest.fn();
const mockHolds = Student.Holds.mockHolds;
const mockUseHolds = jest.fn();

jest.mock('@osu-wams/hooks', () => {
  return {
    ...jest.requireActual('@osu-wams/hooks'),
    useAcademicStatus: () => mockUseAcademicStatus(),
    useCourseSchedule: () => mockUseCourseSchedule(),
    useGpa: () => mockUseStudentGpa(),
    useHolds: () => mockUseHolds()
  };
});

describe('<Academic Overview />', () => {
  it('Academic Overview will filter some content out for graduate students ', async () => {
    mockUseStudentGpa.mockReturnValue(gpaHookData);
    mockUseAcademicStatus.mockReturnValue(mockAcademicStatus);
    mockUseCourseSchedule.mockReturnValue(mockCourseSchedule);
    mockUseHolds.mockReturnValue(mockHolds);
    const { queryByText } = render(<AcademicOverview />);
    const link = queryByText('View more in MyDegrees');
    expect(link).not.toBeInTheDocument();
    const academicStanding = queryByText('Academic Standing');
    expect(academicStanding).not.toBeInTheDocument();
  });
  it('Academic Overview has a footer that can be clicked to access My Degrees', async () => {
    mockUseStudentGpa.mockReturnValue({ ...gpaHookData, data: gpaUndergraduateData });
    mockUseAcademicStatus.mockReturnValue(mockAcademicStatus);
    mockUseCourseSchedule.mockReturnValue(mockCourseSchedule);
    mockUseHolds.mockReturnValue(mockHolds);
    const mockUser = authUser;
    mockUser.data.classification!.attributes!.level = '';
    mockUser.data.audienceOverride = {};

    const { getByText } = render(<AcademicOverview />, { user: mockUser });
    const element = await waitForElement(() => getByText('View more in MyDegrees'));
    fireEvent.click(element);
    expect(mockGAEvent).toHaveBeenCalled();
  });
});

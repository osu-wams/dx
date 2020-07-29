import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render, authUser, mockGradUser } from 'src/util/test-utils';
import AcademicOverview from '../AcademicOverview';
import { mockGAEvent } from 'src/setupTests';
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
    useHolds: () => mockUseHolds(),
  };
});

describe('<Academic Overview />', () => {
  beforeEach(() => {
    mockUseStudentGpa.mockReturnValue({ ...gpaHookData, data: gpaUndergraduateData });
    mockUseAcademicStatus.mockReturnValue(mockAcademicStatus);
    mockUseCourseSchedule.mockReturnValue(mockCourseSchedule);
    mockUseHolds.mockReturnValue(mockHolds);
  });

  it('Undergraduate Student has some data, including holds, and academic standing', async () => {
    render(<AcademicOverview />);
    expect(await screen.findByText(/view more in mydegrees/i)).toBeInTheDocument();
    expect(await screen.findByText(/hold on your student account/i)).toBeInTheDocument();
    expect(await screen.findByText('Academic Standing')).toBeInTheDocument();
    expect(await screen.findByText(/Good Standing/i)).toBeInTheDocument();
    expect(await screen.findByText(/20/i)).toBeInTheDocument(); // Credits
    expect(await screen.findByText(/bill is overdue/i)).toBeInTheDocument();
  });

  it('Graduate Student does not see Academic Standing or My Degrees link', async () => {
    render(<AcademicOverview />, { user: mockGradUser });
    const link = screen.queryByText('View more in MyDegrees');
    expect(link).not.toBeInTheDocument();

    const academicStanding = screen.queryByText('Academic Standing');
    expect(academicStanding).not.toBeInTheDocument();
  });

  it('Academic Overview has a footer that can be clicked to access My Degrees', async () => {
    render(<AcademicOverview />);
    const element = await screen.findByText('View more in MyDegrees');
    userEvent.click(element);

    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });
});

import React from 'react';
import { render } from '../../util/test-utils';
import AcademicsDashboard from '../Academics/AcademicsDashboard';
import { waitForElement } from '@testing-library/dom';
import { academicCalendar6 } from '../../api/__mocks__/academicCalendar.data';
import { Announcements, Resources, Student } from '@osu-wams/hooks';

const { resourcesCardData } = Resources.mockResources;
const { academicAnnouncementResult } = Announcements.mockAnnouncements;
const mockAcademicStatus = Student.AcademicStatus.mockAcademicStatus;
const { schedule: mockCourseSchedule } = Student.CourseSchedule.mockCourseSchedule;
const { gpaHookData, gpaUndergraduateData } = Student.Gpa.mockGpa;

const mockUseAcademicCalendar = jest.fn();
jest.mock('../../api/events', () => ({
  useAcademicCalendarEvents: () => mockUseAcademicCalendar()
}));

const mockUseAcademicStatus = jest.fn();
const mockUseAnnouncements = jest.fn();
const mockUseCourseSchedule = jest.fn();
const mockUseStudentGpa = jest.fn();
const mockUseResourcesByQueue = jest.fn();
jest.mock('@osu-wams/hooks', () => {
  return {
    ...jest.requireActual('@osu-wams/hooks'),
    useAcademicStatus: () => mockUseAcademicStatus(),
    useAnnouncements: () => mockUseAnnouncements(),
    useCourseSchedule: () => mockUseCourseSchedule(),
    useResourcesByQueue: () => mockUseResourcesByQueue(),
    useGpa: () => mockUseStudentGpa()
  };
});

const mockUseAccountHolds = jest.fn();
jest.mock('../../api/student/holds', () => ({
  useAccountHolds: () => mockUseAccountHolds()
}));

describe('<AcademicsDashboard />', () => {
  beforeEach(() => {
    mockUseResourcesByQueue.mockReturnValue(resourcesCardData);
    mockUseAcademicCalendar.mockReturnValue(academicCalendar6);
    mockUseAnnouncements.mockReturnValue(academicAnnouncementResult);
    mockUseStudentGpa.mockReturnValue({ ...gpaHookData, data: gpaUndergraduateData });
    mockUseAcademicStatus.mockReturnValue(mockAcademicStatus);
    mockUseCourseSchedule.mockReturnValue(mockCourseSchedule);
    mockUseAccountHolds.mockReturnValue({
      data: [{ description: 'blah' }, { description: 'BobRoss' }],
      loading: false,
      error: false
    });
  });

  it('renders without errors', async () => {
    const { getByTestId } = render(<AcademicsDashboard />);
    getByTestId('academics-dashboard');
  });

  it('should not render Announcements with no events', async () => {
    mockUseAnnouncements.mockReturnValue({ data: [], loading: false, error: false });
    const { getByTestId } = render(<AcademicsDashboard />);
    expect(() => getByTestId('academics-announcements')).toThrow(); //will throw if announcements is being displayed
  });

  it('should render Announcements and event cards when at least one event is present', async () => {
    const { getAllByTestId, getByTestId } = render(<AcademicsDashboard />);
    await waitForElement(() => getByTestId('academics-announcements')); //will throw if no results
    await waitForElement(() => getAllByTestId('eventcard')); //will throw if no results
  });
});

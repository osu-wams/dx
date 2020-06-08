import React from 'react';
import { render } from 'src/util/test-utils';
import AcademicsDashboard from '../Academics/AcademicsDashboard';
import { screen } from '@testing-library/react';
import { Announcements, Events, Resources, Student } from '@osu-wams/hooks';

const { resourcesCardData } = Resources.mockResources;
const { academicAnnouncementResult } = Announcements.mockAnnouncements;
const mockAcademicStatus = Student.AcademicStatus.mockAcademicStatus;
const { schedule: mockCourseSchedule } = Student.CourseSchedule.mockCourseSchedule;
const { gpaHookData, gpaUndergraduateData } = Student.Gpa.mockGpa;
const mockHolds = Student.Holds.mockHolds;
const { academicCalendar6 } = Events.mockEvents;
const mockUseAcademicCalendar = jest.fn();
const mockUseAcademicStatus = jest.fn();
const mockUseAnnouncements = jest.fn();
const mockUseCourseSchedule = jest.fn();
const mockUseHolds = jest.fn();
const mockUseStudentGpa = jest.fn();
const mockUseResourcesByQueue = jest.fn();
jest.mock('@osu-wams/hooks', () => {
  return {
    ...jest.requireActual('@osu-wams/hooks'),
    useAcademicCalendarEvents: () => mockUseAcademicCalendar(),
    useAcademicStatus: () => mockUseAcademicStatus(),
    useAnnouncements: () => mockUseAnnouncements(),
    useCourseSchedule: () => mockUseCourseSchedule(),
    useResourcesByQueue: () => mockUseResourcesByQueue(),
    useGpa: () => mockUseStudentGpa(),
    useHolds: () => mockUseHolds(),
  };
});

describe('<AcademicsDashboard />', () => {
  beforeEach(() => {
    mockUseResourcesByQueue.mockReturnValue(resourcesCardData);
    mockUseAcademicCalendar.mockReturnValue(academicCalendar6);
    mockUseAnnouncements.mockReturnValue(academicAnnouncementResult);
    mockUseStudentGpa.mockReturnValue({ ...gpaHookData, data: gpaUndergraduateData });
    mockUseAcademicStatus.mockReturnValue(mockAcademicStatus);
    mockUseCourseSchedule.mockReturnValue(mockCourseSchedule);
    mockUseHolds.mockReturnValue(mockHolds);
  });

  it('renders without errors', async () => {
    render(<AcademicsDashboard />);
    screen.getByTestId('academics-dashboard');
  });

  it('should not render Announcements with no events', async () => {
    mockUseAnnouncements.mockReturnValue({ data: [], loading: false, error: false });
    render(<AcademicsDashboard />);
    expect(screen.queryByTestId('academics-announcements')).toBeNull();
  });

  it('should render Announcements and event cards when at least one event is present', async () => {
    render(<AcademicsDashboard />);
    expect(await screen.findByTestId('academics-announcements')).toBeInTheDocument();
    expect(await screen.findAllByTestId('eventcard')).toHaveLength(2);
  });
});

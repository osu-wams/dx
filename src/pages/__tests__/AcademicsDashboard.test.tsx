import React from 'react';
import { render } from '../../util/test-utils';
import AcademicsDashboard from '../Academics/AcademicsDashboard';
import { waitForElement } from '@testing-library/dom';
import { gpaUndergraduateData } from '../../api/student/__mocks__/gpa.data';
import { academicCalendar6 } from '../../api/__mocks__/academicCalendar.data';
import { Announcements, Resources } from '@osu-wams/hooks';

const { resourcesCardData } = Resources.mockResources;
const { academicAnnouncementResult } = Announcements.mockAnnouncements;

const mockUseAcademicCalendar = jest.fn();
jest.mock('../../api/events', () => ({
  useAcademicCalendarEvents: () => mockUseAcademicCalendar()
}));

const mockUseAnnouncements = jest.fn();
const mockUseResourcesByQueue = jest.fn();
jest.mock('@osu-wams/hooks', () => {
  return {
    ...jest.requireActual('@osu-wams/hooks'),
    useResourcesByQueue: () => mockUseResourcesByQueue(),
    useAnnouncements: () => mockUseAnnouncements()
  };
});

const mockUseAccountHolds = jest.fn();
jest.mock('../../api/student/holds', () => ({
  useAccountHolds: () => mockUseAccountHolds()
}));

const mockUseCourseSchedule = jest.fn();
jest.mock('../../api/student/course-schedule', () => ({
  useCourseSchedule: () => mockUseCourseSchedule()
}));

const mockUseAcademicStatus = jest.fn();
jest.mock('../../api/student/academic-status', () => ({
  useAcademicStatus: () => mockUseAcademicStatus()
}));

const mockUseStudentGpa = jest.fn();
jest.mock('../../api/student/gpa', () => ({
  useGpa: () => mockUseStudentGpa()
}));

describe('<AcademicsDashboard />', () => {
  beforeEach(() => {
    mockUseResourcesByQueue.mockReturnValue(resourcesCardData);
    mockUseAcademicCalendar.mockReturnValue(academicCalendar6);
    mockUseAnnouncements.mockReturnValue(academicAnnouncementResult);
    mockUseStudentGpa.mockReturnValue({ data: gpaUndergraduateData, loading: false, error: false });
    mockUseAcademicStatus.mockReturnValue({
      data: { academicStanding: 'Good Standing' },
      loading: false,
      error: false
    });
    mockUseCourseSchedule.mockReturnValue({
      data: [],
      loading: false,
      error: false
    });
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

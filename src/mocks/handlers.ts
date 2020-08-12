import { rest } from 'msw';
import { Student, Events, Announcements, Resources } from '@osu-wams/hooks';
import {
  HOLDS_API,
  GPA_API,
  ACADEMIC_STATUS_API,
  CLASS_SCHEDULE_API,
  ACADEMIC_CALENDAR_API,
  ACADEMIC_ANNOUNCEMENTS_API,
  RESOURCES_BY_QUEUE_API,
  DEGREES_API,
  ACCOUNT_BALANCE_API,
} from './apis';

const mockHolds = Student.Holds.mockHolds.data;
const mockAcademicStatus = Student.AcademicStatus.mockAcademicStatus.data;
const mockCourseSchedule = Student.CourseSchedule.mockCourseSchedule.schedule.data;
const mockDegrees = Student.Degrees.mockDegrees.data;
const { gpaHookData, gpaUndergraduateData } = Student.Gpa.mockGpa;
const mockGpa = { ...gpaHookData, data: gpaUndergraduateData };
const { academicCalendar6 } = Events.mockEvents;
const { academicAnnouncementResult } = Announcements.mockAnnouncements;
const { resourcesCardData } = Resources.mockResources;
const mockAccountBalance = Student.AccountBalance.mockAccountBalance.data;

// Mock API Data for our Endpoints
export const handlers = [
  // Students
  rest.get(ACADEMIC_STATUS_API, async (req, res, ctx) => {
    return res(ctx.json(mockAcademicStatus));
  }),

  rest.get(ACCOUNT_BALANCE_API, async (req, res, ctx) => {
    return res(ctx.json(mockAccountBalance));
  }),

  rest.get(CLASS_SCHEDULE_API, async (req, res, ctx) => {
    return res(ctx.json(mockCourseSchedule));
  }),

  rest.get(DEGREES_API, async (req, res, ctx) => {
    // Modify data to match what the server returns
    const apiData = mockDegrees.map((d) => ({
      attributes: d,
    }));
    return res(ctx.json(apiData));
  }),

  rest.get(GPA_API, async (req, res, ctx) => {
    return res(ctx.json(mockGpa.data));
  }),

  rest.get(HOLDS_API, async (req, res, ctx) => {
    return res(ctx.json(mockHolds));
  }),

  // Events
  rest.get(ACADEMIC_CALENDAR_API, async (req, res, ctx) => {
    return res(ctx.json(academicCalendar6.data));
  }),

  // Anouncements
  rest.get(ACADEMIC_ANNOUNCEMENTS_API, async (req, res, ctx) => {
    return res(ctx.json(academicAnnouncementResult.data));
  }),

  // Resources
  rest.get(RESOURCES_BY_QUEUE_API, async (req, res, ctx) => {
    return res(ctx.json(resourcesCardData.data));
  }),
];

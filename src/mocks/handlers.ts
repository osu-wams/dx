import { rest } from 'msw';
import { Student, Events, Announcements } from '@osu-wams/hooks';
import {
  HOLDS_API,
  GPA_API,
  ACADEMIC_STATUS_API,
  CLASS_SCHEDULE_API,
  ACADEMIC_CALENDAR_API,
  ACADEMIC_ANNOUNCEMENTS_API,
} from './apis';

const mockHolds = Student.Holds.mockHolds.data;
const mockAcademicStatus = Student.AcademicStatus.mockAcademicStatus.data;
const mockCourseSchedule = Student.CourseSchedule.mockCourseSchedule.schedule.data;
const { gpaHookData, gpaUndergraduateData } = Student.Gpa.mockGpa;
const mockGpa = { ...gpaHookData, data: gpaUndergraduateData };
const { academicCalendar6 } = Events.mockEvents;
const { academicAnnouncementResult } = Announcements.mockAnnouncements;

// Mock API Data for our Endpoints
export const handlers = [
  // Students
  rest.get(HOLDS_API, async (req, res, ctx) => {
    return res(ctx.json(mockHolds));
  }),

  rest.get(GPA_API, async (req, res, ctx) => {
    return res(ctx.json(mockGpa.data));
  }),

  rest.get(ACADEMIC_STATUS_API, async (req, res, ctx) => {
    return res(ctx.json(mockAcademicStatus));
  }),

  rest.get(CLASS_SCHEDULE_API, async (req, res, ctx) => {
    return res(ctx.json(mockCourseSchedule));
  }),

  // Events
  rest.get(ACADEMIC_CALENDAR_API, async (req, res, ctx) => {
    return res(ctx.json(academicCalendar6.data));
  }),

  // Anouncements
  rest.get(ACADEMIC_ANNOUNCEMENTS_API, async (req, res, ctx) => {
    return res(ctx.json(academicAnnouncementResult.data));
  }),
];

import { rest } from 'msw';
import { Student } from '@osu-wams/hooks';
import { HOLDS_API, GPA_API, ACADEMIC_STATUS_API, CLASS_SCHEDULE_API } from './apis';

const mockHolds = Student.Holds.mockHolds.data;
const mockAcademicStatus = Student.AcademicStatus.mockAcademicStatus.data;
const mockCourseSchedule = Student.CourseSchedule.mockCourseSchedule.schedule.data;
const { gpaHookData, gpaUndergraduateData } = Student.Gpa.mockGpa;
const mockGpa = { ...gpaHookData, data: gpaUndergraduateData };

// Mock API Data for our Endpoints
export const handlers = [
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
];

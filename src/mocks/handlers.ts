import { rest } from 'msw';
import { Student } from '@osu-wams/hooks';

const mockHolds = Student.Holds.mockHolds.data;
const mockAcademicStatus = Student.AcademicStatus.mockAcademicStatus.data;
const mockCourseSchedule = Student.CourseSchedule.mockCourseSchedule.schedule.data;
const { gpaHookData, gpaUndergraduateData } = Student.Gpa.mockGpa;
const mockGpa = { ...gpaHookData, data: gpaUndergraduateData };

// Mock API Data for our Endpoints
export const handlers = [
  rest.get('/api/student/holds', async (req, res, ctx) => {
    return res(ctx.json(mockHolds));
  }),

  rest.get('/api/student/gpa', async (req, res, ctx) => {
    return res(ctx.json(mockGpa.data));
  }),

  rest.get('/api/student/academic-status', async (req, res, ctx) => {
    return res(ctx.json(mockAcademicStatus));
  }),

  rest.get('/api/student/class-schedule?term=current', async (req, res, ctx) => {
    return res(ctx.json(mockCourseSchedule));
  }),
];

import { rest } from 'msw';
import { Student } from '@osu-wams/hooks';

const mockHolds = Student.Holds.mockHolds;

// Mock API Data for our Endpoints
export const handlers = [
  rest.get('/api/student/holds', async (req, res, ctx) => {
    return res(ctx.json(mockHolds.data));
  }),
];

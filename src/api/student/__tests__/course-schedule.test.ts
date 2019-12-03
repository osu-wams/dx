import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import courses from '../__mocks__/courses.data';
import { useCourseSchedule } from '../course-schedule';
import * as cache from '../../../util/cache';

const initialState = { data: [], loading: true, error: false };
const errorState = { data: [], loading: false, error: true };
const url = /api\/student\/class-schedule/;

describe('useCourseSchedule hook', () => {
  let mockAxios;

  beforeEach(() => {
    cache.clear();
    mockAxios = new MockAdapter(axios);
  });
  afterEach(() => {
    mockAxios.restore();
  });
  it('should have expected data', async () => {
    mockAxios.onGet(url).replyOnce(200, courses.data);
    const { result, waitForNextUpdate } = renderHook(() => useCourseSchedule());
    expect(result.current).toMatchObject(initialState);
    await waitForNextUpdate();
    expect(result.current).toMatchObject(courses);
  });

  it('should report an error if the server fails', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCourseSchedule());
    expect(result.current).toMatchObject(initialState);
    mockAxios.onGet(url).replyOnce(500);
    await waitForNextUpdate();
    expect(result.current).toMatchObject(errorState);
  });
});

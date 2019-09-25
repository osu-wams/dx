import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import courses from '../__mocks__/courses.data';
import { useCourseSchedule } from '../course-schedule';

const mockAxios = new MockAdapter(axios);
const initialState = { data: [], loading: true, error: false };
const errorState = { data: [], loading: false, error: true };
const url = /api\/student\/class-schedule/;

describe('useCourseSchedule hook', () => {
  it('should have expected data', async () => {
    mockAxios.onGet(url).reply(200, courses.data);
    const { result, waitForNextUpdate } = renderHook(() => useCourseSchedule());
    expect(result.current).toEqual(initialState);
    await waitForNextUpdate();
    expect(result.current).toEqual(courses);
  });

  it('should report an error if the server fails', async () => {
    mockAxios.onGet(url).networkError();
    const { result, waitForNextUpdate } = renderHook(() => useCourseSchedule());
    expect(result.current).toEqual(initialState);
    await waitForNextUpdate();
    expect(result.current).toEqual(errorState);
  });
});

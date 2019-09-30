
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import grades from '../__mocks__/grades.data';
import { useGrades } from '..';

const mockAxios = new MockAdapter(axios);
const initialState = { data: [], loading: true, error: false };
const errorState = { data: [], loading: false, error: true };
const url = /api\/student\/grades/;

describe('useGrades hook', () => {
  it('should have expected data', async () => {
    mockAxios.onGet(url).reply(200, grades.data);
    const { result, waitForNextUpdate } = renderHook(() => useGrades());
    expect(result.current).toEqual(initialState);
    await waitForNextUpdate();
    expect(result.current).toEqual(grades);
  });

  it('should report an error if the server fails', async () => {
    mockAxios.onGet(url).networkError();
    const { result, waitForNextUpdate } = renderHook(() => useGrades());
    expect(result.current).toEqual(initialState);
    await waitForNextUpdate();
    expect(result.current).toEqual(errorState);
  });
});
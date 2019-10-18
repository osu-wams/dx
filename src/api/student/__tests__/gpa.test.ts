import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { gpaData } from '../__mocks__/gpa.data';
import { useGpa, gpaInitialState } from '../gpa';

const mockAxios = new MockAdapter(axios);
const initialState = { data: gpaInitialState, loading: true, error: false };
const errorState = { data: gpaInitialState, loading: false, error: true };
const url = /api\/student\/gpa/;

describe('useGrades hook', () => {
  it('should have expected data', async () => {
    mockAxios.onGet(url).reply(200, gpaData);
    const { result, waitForNextUpdate } = renderHook(() => useGpa());
    expect(result.current).toMatchObject(initialState);
    await waitForNextUpdate();
    expect(result.current).toEqual({ data: gpaData, loading: false, error: false });
  });

  it('should report an error if the server fails', async () => {
    mockAxios.onGet(url).reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useGpa());
    expect(result.current).toMatchObject(initialState);
    await waitForNextUpdate();
    expect(result.current).toMatchObject(errorState);
  });
});

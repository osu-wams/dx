import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import gpa from '../__mocks__/gpa.data';
import { useGpa } from '..';

const mockAxios = new MockAdapter(axios);
const initialState = { data: { gpa: '' }, loading: true, error: false };
const errorState = { data: { gpa: '' }, loading: false, error: true };
const url = /api\/student\/gpa/;

describe('useGrades hook', () => {
  it('should have expected data', async () => {
    mockAxios.onGet(url).reply(200, gpa.data);
    const { result, waitForNextUpdate } = renderHook(() => useGpa());
    expect(result.current).toEqual(initialState);
    await waitForNextUpdate();
    expect(result.current).toEqual(gpa);
  });

  it('should report an error if the server fails', async () => {
    mockAxios.onGet(url).networkError();
    const { result, waitForNextUpdate } = renderHook(() => useGpa());
    expect(result.current).toEqual(initialState);
    await waitForNextUpdate();
    expect(result.current).toEqual(errorState);
  });
});

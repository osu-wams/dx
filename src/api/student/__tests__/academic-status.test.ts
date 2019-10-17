import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import academicStatus from '../__mocks__/academicStatus.data';
import { useAcademicStatus } from '../academic-status';

const mockAxios = new MockAdapter(axios);
const initialState = { data: {}, loading: true, error: false };
const errorState = { data: {}, loading: false, error: true };
const url = /\/api\/student\/academic-status/;

describe('useAcademicStatus hook', () => {
  it('should have expected data', async () => {
    mockAxios.onGet(url).reply(200, academicStatus.data);
    const { result, waitForNextUpdate } = renderHook(() => useAcademicStatus());
    expect(result.current).toMatchObject(initialState);
    await waitForNextUpdate();
    expect(result.current).toMatchObject(academicStatus);
  });

  it('should report an error if the server fails', async () => {
    mockAxios.onGet(url).reply(500);
    const { result, waitForNextUpdate } = renderHook(() => useAcademicStatus());
    expect(result.current).toMatchObject(initialState);
    await waitForNextUpdate();
    expect(result.current).toMatchObject(errorState);
  });
});

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { gpaData } from '../__mocks__/gpa.data';
import { useGpa, gpaInitialState } from '../gpa';
import * as cache from '../../../util/cache';

const initialState = { data: gpaInitialState, loading: true, error: false };
const errorState = { data: gpaInitialState, loading: false, error: true };
const url = /api\/student\/gpa/;

describe('useGrades hook', () => {
  let mockAxios;

  beforeEach(() => {
    cache.clear();
    mockAxios = new MockAdapter(axios);
  });
  afterEach(() => {
    mockAxios.restore();
  });
  it('should have expected data', async () => {
    mockAxios.onGet(url).replyOnce(200, gpaData);
    const { result, waitForNextUpdate } = renderHook(() => useGpa());
    expect(result.current).toMatchObject(initialState);
    await waitForNextUpdate();
    expect(result.current).toMatchObject({ data: gpaData, loading: false, error: false });
  });

  it('should report an error if the server fails', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGpa());
    expect(result.current).toMatchObject(initialState);
    mockAxios.onGet(url).replyOnce(500);
    await waitForNextUpdate();
    expect(result.current).toMatchObject(errorState);
  });
});

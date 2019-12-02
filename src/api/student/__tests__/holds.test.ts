import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import holds from '../__mocks__/holds.data';
import { useAccountHolds } from '..';
import * as cache from '../../../util/cache';

const initialState = { data: [], loading: true, error: false };
const errorState = { data: [], loading: false, error: true };
const url = /api\/student\/holds/;

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
    mockAxios.onGet(url).replyOnce(200, holds.data);
    const { result, waitForNextUpdate } = renderHook(() => useAccountHolds());
    expect(result.current).toMatchObject(initialState);
    await waitForNextUpdate();
    expect(result.current).toMatchObject(holds);
  });

  it('should report an error if the server fails', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAccountHolds());
    expect(result.current).toMatchObject(initialState);
    mockAxios.onGet(url).replyOnce(500);
    await waitForNextUpdate();
    expect(result.current).toMatchObject(errorState);
  });
});

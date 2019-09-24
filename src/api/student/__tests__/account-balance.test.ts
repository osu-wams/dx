import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import accountBalance from '../__mocks__/accountBalance.data';
import { useAccountBalance } from '../account-balance';

const mockAxios = new MockAdapter(axios);
const initialState = { data: {}, loading: true, error: false };
const errorState = { data: {}, loading: false, error: true };
const url = /api\/student\/account-balance/;

describe('useAccountBalance hook', () => {
  it('should have expected data', async () => {
    mockAxios.onGet(url).reply(200, accountBalance.data);
    const { result, waitForNextUpdate } = renderHook(() => useAccountBalance());
    expect(result.current).toEqual(initialState);
    await waitForNextUpdate();
    expect(result.current).toEqual(accountBalance);
  });

  it('should report an error if the server fails', async () => {
    mockAxios.onGet(url).networkError();
    const { result, waitForNextUpdate } = renderHook(() => useAccountBalance());
    expect(result.current).toEqual(initialState);
    await waitForNextUpdate();
    expect(result.current).toEqual(errorState);
  });
});
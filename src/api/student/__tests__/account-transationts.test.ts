import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import accountTransactions from '../__mocks__/accountTransactions.data';
import { useAccountTransactions } from '../account-transactions';

const mockAxios = new MockAdapter(axios);
const initialState = { data: {}, loading: true, error: false };
const errorState = { data: {}, loading: false, error: true };
const url = /api\/student\/account-transactions/;

describe('useAccountTransactions hook', () => {
  it('should have expected data', async () => {
    mockAxios.onGet(url).reply(200, accountTransactions.data);
    const { result, waitForNextUpdate } = renderHook(() => useAccountTransactions());
    expect(result.current).toEqual(initialState);
    await waitForNextUpdate();
    expect(result.current).toEqual(accountTransactions);
  });

  it('should report an error if the server fails', async () => {
    mockAxios.onGet(url).networkError();
    const { result, waitForNextUpdate } = renderHook(() => useAccountTransactions());
    expect(result.current).toEqual(initialState);
    await waitForNextUpdate();
    expect(result.current).toEqual(errorState);
  });
});

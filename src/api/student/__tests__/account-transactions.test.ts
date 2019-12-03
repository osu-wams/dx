import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import accountTransactions from '../__mocks__/accountTransactions.data';
import { useAccountTransactions } from '../account-transactions';
import * as cache from '../../../util/cache';

const initialState = { data: {}, loading: true, error: false };
const errorState = { data: {}, loading: false, error: true };
const url = /account-transactions/;

describe('useAccountTransactions hook', () => {
  let mockAxios;

  beforeEach(() => {
    cache.clear();
    mockAxios = new MockAdapter(axios);
  });
  afterEach(() => {
    mockAxios.restore();
  });
  it('should have expected data', async () => {
    mockAxios.onGet(url).replyOnce(200, accountTransactions.data);
    const { result, waitForNextUpdate } = renderHook(() => useAccountTransactions());
    expect(result.current).toMatchObject(initialState);
    await waitForNextUpdate();
    expect(result.current).toMatchObject(accountTransactions);
  });

  it('should report an error if the server fails', async () => {
    mockAxios.onGet(url).replyOnce(500);
    const { result, waitForNextUpdate } = renderHook(() => useAccountTransactions());
    expect(result.current).toMatchObject(initialState);
    await waitForNextUpdate();
    expect(result.current).toMatchObject(errorState);
  });
});

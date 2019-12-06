import axios from 'axios';
import useAPICall from '../useAPICall';

const getAccountBalance = (): Promise<IAccountBalance> =>
  axios.get('/api/student/account-balance').then(res => res.data);
const useAccountBalance = () =>
  useAPICall<IAccountBalance>(getAccountBalance, undefined, data => data, {} as IAccountBalance);

interface IAccountBalance {
  attributes: IAccountBalanceAttributes;
  id: number;
  links: { self: null };
  type: string;
}

export type IAccountBalanceAttributes = {
  currentBalance: number;
};

export { getAccountBalance, useAccountBalance };

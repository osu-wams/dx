import axios from 'axios';
import useAPICall from '../useAPICall';

export const getAccountTransactions = (): Promise<IAccountTransactions> =>
  axios.get('/api/student/account-transactions').then(res => res.data);
export const useAccountTransactions = () =>
  useAPICall<IAccountTransactions>(
    getAccountTransactions,
    undefined,
    data => data,
    {} as IAccountTransactions
  );

export interface IAccountTransactions {
  attributes: { transactions: [ITransaction] };
  id: String;
  links: { self: null };
  type: String;
}

export interface ITransaction {
  amount: number;
  category: string;
  description: string;
  entryDate: Date;
  term: string;
  transactionType: string;
}

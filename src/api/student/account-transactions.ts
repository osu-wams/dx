import axios from 'axios';

export const getAccountTransactions = (): Promise<IAccountTransactions> =>
  axios.get('/api/student/account-transactions').then(res => res.data);

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

import axios from 'axios';
import useAPICall from './useAPICall';

interface User {
  email: String;
}

const getUser = (): Promise<User> =>
  axios
    .get('/api/user')
    .then(res => res.data)
    .catch(e => {
      window.location.href = '/login';
      return e;
    });

export const useUser = () => useAPICall<User | {}>(getUser, undefined, data => data, {});

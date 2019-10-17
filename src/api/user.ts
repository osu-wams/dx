import axios from 'axios';
import useAPICall from './useAPICall';
import { useEffect, useState } from 'react';

interface User {
  email?: string;
  isCanvasOptIn?: boolean;
}

interface UserState {
  data: User | null;
  error: boolean;
  loading: boolean;
  isCanvasOptIn?: boolean;
}

const getUser = (): Promise<User> =>
  axios
    .get('/api/user')
    .then(res => res.data)
    .catch(e => {
      window.location.href = '/login';
      return e;
    });

export const useUser = () => {
  const [user, setUser] = useState<UserState>({
    data: {},
    error: false,
    loading: false,
    isCanvasOptIn: false
  });
  const u = useAPICall<User>(getUser, undefined, data => data, {}, false);

  useEffect(() => {
    setUser({
      data: u.data,
      error: u.error,
      loading: u.loading,
      isCanvasOptIn: u.data.isCanvasOptIn
    });
  }, [u.data, u.error, u.loading]);

  return {
    error: user!.error,
    data: user!.data,
    loading: user!.loading,
    isCanvasOptIn: user!.data!.isCanvasOptIn,
    setUser
  };
};

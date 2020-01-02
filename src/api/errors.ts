import axios from 'axios';
import StackTrace from 'stacktrace-js';

const IGNORED_ERRORS = ['Error: Request aborted'];

export const postError = async (e: Error) => {
  if (!IGNORED_ERRORS.includes(e.toString())) {
    const stack = await StackTrace.fromError(e).catch(err => console.error);
    await axios
      .post('/api/errors', { error: e.toString(), stack })
      .then(res => res)
      .catch(err => {
        console.error('Failed to report application error');
      });
  }
};

export default postError;

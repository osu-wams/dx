import axios from 'axios';

export const postError = async (e: Error): Promise<void> => {
  await axios
    .post('/api/errors', { error: e.toString(), stack: e.stack })
    .then(res => res)
    .catch(err => {
      console.error('Failed to report application error');
    });
};

export default postError;

import axios from 'axios';

const getMasqueradeUser = (): Promise<any> => axios.get(`/api/masquerade`);
const postMasqueradeUser = (masqueradeId?: string): Promise<any> =>
  masqueradeId ? axios.post(`/api/masquerade`, { masqueradeId }) : axios.post(`/api/masquerade`);

export { getMasqueradeUser, postMasqueradeUser };

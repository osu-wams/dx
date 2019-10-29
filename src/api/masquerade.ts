import axios from 'axios';

const getMasqueradeUser = (): Promise<any> => axios.get(`/api/masquerade`).then(d => d.data);
const postMasqueradeUser = (masqueradeId?: string, masqueradeReason?: string): Promise<any> =>
  masqueradeId
    ? axios.post(`/api/masquerade`, { masqueradeId, masqueradeReason })
    : axios.post(`/api/masquerade`);

export { getMasqueradeUser, postMasqueradeUser };

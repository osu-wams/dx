import axios from 'axios';
import useAPICall from './useAPICall';
import statusResponse from './__mocks__/status.data';

export const getStatus = (): Promise<ICachetComponent[]> =>
  axios.get(`/api/status`).then(res => {
    // return res.data;
    return statusResponse.data;
  });

export const useStatus = () =>
  useAPICall<ICachetComponent[]>(getStatus, undefined, data => data, []);

export interface ICachetIncident {
  id: number;
  name: string;
  message: string;
  duration: number;
  permalink: string;
  status: number;
  statusText: string;
  isResolved: boolean;
  updatedAt: string;
}

export interface ICachetComponent {
  id: number;
  name: string;
  description: string;
  statusText: string;
  updatedAt: string;
  incidents: ICachetIncident[];
}

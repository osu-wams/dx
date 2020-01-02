import axios from 'axios';
import useAPICall from './useAPICall';

export const getInfoButtons = (): Promise<InfoButtonState[]> =>
  axios.get(`/api/info-buttons`).then((res: InfoButtonData) => res.data ?? []);

export const useInfoButtons = () =>
  useAPICall<InfoButtonState[]>(getInfoButtons, undefined, data => data, []);

export interface InfoButtonState {
  id: string;
  title: string;
  content: string;
}

export interface InfoButtonData {
  data: InfoButtonState[];
}

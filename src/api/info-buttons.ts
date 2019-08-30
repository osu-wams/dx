import axios from 'axios';

export const getInfoButtons = (): Promise<InfoButtonState[]> =>
  axios
    .get(`/api/info-buttons`)
    .then((res: InfoButtonData) => {
      if (res.data) {
        return res.data;
      }
      return [];
    })
    .catch(() => {
      console.error('InfoButtons API failed, returning empty data');
      return [];
    });

export interface InfoButtonState {
  id: string;
  title: string;
  content: string;
}

export interface InfoButtonData {
  data: InfoButtonState[];
}

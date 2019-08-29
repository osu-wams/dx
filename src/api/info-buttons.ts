import axios from 'axios';

export const getInfoButtons = (): Promise<InfoButtonState[] | []> =>
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
      // TODO: Return an empty array when the backend is wired up and functional.
      return [
        {
          id: 'CHANGE-ME',
          content: '<p>Here is some text <i>with html in it!</i></p>',
          title: 'title'
        }
      ];
    });

export interface InfoButtonState {
  id: string;
  title: string;
  content: string;
}

export interface InfoButtonData {
  data: InfoButtonState[];
}

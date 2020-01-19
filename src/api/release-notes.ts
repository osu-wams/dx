import axios from 'axios';
import { useAPICall } from '@osu-wams/hooks';

export const getReleaseNotes = (): Promise<IreleaseNotes[]> =>
  axios.get(`/api/release-notes/`).then((res: IreleaseNotesData) => res.data ?? []);

export const useReleaseNotes = () =>
  useAPICall<IreleaseNotes[]>({
    api: getReleaseNotes,
    dataTransform: data => data,
    initialState: []
  });

export interface IreleaseNotes {
  title: string;
  content: string;
  date: string;
}

export interface IreleaseNotesData {
  data: IreleaseNotes[];
}

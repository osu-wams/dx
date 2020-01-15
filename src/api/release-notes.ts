import axios from 'axios';
import useAPICall from './useAPICall';

export const getReleaseNotes = (): Promise<IreleaseNotes[]> =>
  axios.get(`/api/release-notes/`).then((res: IreleaseNotesData) => res.data ?? []);

export const useReleaseNotes = () =>
  useAPICall<IreleaseNotes[]>(getReleaseNotes, undefined, data => data, []);

export interface IreleaseNotes {
  title: string;
  content: string;
  date: string;
}

export interface IreleaseNotesData {
  data: IreleaseNotes[];
}

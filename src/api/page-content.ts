import axios from 'axios';
import useAPICall from './useAPICall';

export const getPageContent = (pageTitle: string): Promise<IpageContent[]> =>
  axios.get(`/api/page-content/${pageTitle}`).then((res: InfoButtonData) => res.data ?? []);

export const usePageContent = (pageTitle: string) =>
  useAPICall<IpageContent[]>(getPageContent, pageTitle, data => data, []);

export interface IpageContent {
  title: string;
  content: string;
}

export interface InfoButtonData {
  data: IpageContent[];
}

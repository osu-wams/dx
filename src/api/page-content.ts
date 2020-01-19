import axios from 'axios';
import { useAPICall } from '@osu-wams/hooks';

export const getPageContent = (pageTitle: string): Promise<IpageContent[]> =>
  axios.get(`/api/page-content/${pageTitle}`).then((res: InfoButtonData) => res.data ?? []);

export const usePageContent = (pageTitle: string) =>
  useAPICall<IpageContent[]>({
    api: getPageContent,
    query: pageTitle,
    dataTransform: data => data,
    initialState: []
  });

export interface IpageContent {
  title: string;
  content: string;
}

export interface InfoButtonData {
  data: IpageContent[];
}

import axios from 'axios';
import useAPICall from './useAPICall';
import { IUser, getAffiliation } from '../api/user';

export interface IResourceResult {
  id: string;
  title: string;
  icon?: string;
  uri: string;
}

export interface ICategory {
  id: string;
  name: string;
  icon: string;
}
/**
 * Interface for an Announcement.
 */
export interface IAnnouncement {
  id: string;
  title: string;
  body: string;
  bg_image?: string;
  affiliation: string[];
  audiences: string[];
  pages: string[];
  action?: object;
}

const getAnnouncements = (type): Promise<any> =>
  axios.get(`/api/announcements/${type}`).then(res => res.data);
export const useAnnouncements = (type: string) =>
  useAPICall<any[]>(getAnnouncements, type, d => d, []);

/**
 * Filter callback to see if the user and the announcement have the same affiliation or if the announcement affiliations are blank.
 * @param user User to filter against
 * @param announcement Announcement to filter against
 * @returns {boolean} true or false based on the affiliation of the user and the affiliation of the announcement
 */
export const hasAffiliation = (user: IUser, announcement: IAnnouncement): boolean => {
  if (!announcement?.affiliation) return true;

  return (
    announcement?.affiliation?.length === 0 ||
    announcement?.affiliation?.findIndex(s =>
      s.toLowerCase().includes(getAffiliation(user).toLowerCase())
    ) > -1
  );
};

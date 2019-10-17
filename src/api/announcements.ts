import axios from 'axios';
import useAPICall from './useAPICall';

export interface IUserClassificationAttributes {
  level: string;
  campus: string;
  classification: string;
  isInternational: boolean;
}

export interface IUserClassification {
  attributes?: IUserClassificationAttributes;
  id: string;
}

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

const userClassifications = (user: any): string[] => {
  const results: string[] = [];
  const userClassification: IUserClassification = user.classification || {};
  if (!('attributes' in userClassification)) return results;

  const {
    level,
    campus,
    classification,
    isInternational
  } = userClassification.attributes as IUserClassificationAttributes;
  if (level === 'Graduate') results.push('Graduate Student');
  if (classification === 'Freshman') results.push('First Year');
  if (isInternational) results.push('International Student');
  if (campus) results.push(campus)
  // switch (campus) {
  //   case 'Dist. Degree Corvallis Student':
  //     results.push('Ecampus');
  //     break;
  //   case 'Oregon State - Cascades':
  //     results.push('Bend');
  //     break;
  //   default:
  //     results.push('Corvallis');
  //     break;
  // }
  return results;
};

/**
 *  If a user doesn't have a student classification, or if the resource doesn't
 *  have audiences specified then return the resource.. otherwise, filter the resources.
 * @param resources the list of resources to be optionally filtered
 * @param user the user to consider of filtering resources
 */
export const filterAnnouncementsForUser = (
  announcements: any[],
  user: any
): any[] => {

  
  const classifications = userClassifications(user);
  let announcementsToRemove: any[] = []

  /**
   * Loops through all the announcements to figure out which ones do not have an audience that matches the user campus. In such
   * a case we add the announcement to the an array that we loop through later to remove the announcements so they don't get
   * displayed
   */

  if (user && user.classification && user.classification.attributes && user.classification.attributes.campus) {
    if (announcements) {
      announcements.forEach(e => {
        let shouldRemoveAnnouncement = true;

        console.log('new announcement--')

        if (e.audiences) {
          e.audiences.forEach(announceCampus => {
            console.log('A -', announceCampus)
            console.log('U -', user.classification.attributes.campus)
            if (announceCampus === user.classification.attributes.campus) {
              shouldRemoveAnnouncement = false;
            }
          })
        }
        if (shouldRemoveAnnouncement) {
          console.log('announcement audience did not match user audience')
          announcementsToRemove.push(e)
        } else {
          console.log('announcement audience matched!')
        }
        console.log('end of announcement--')
      })

      console.log('removing: ', announcementsToRemove.length)

      announcementsToRemove.forEach(e => {
        console.log('removing announcement: ',e)
        const indexToRemove = announcements.indexOf(e)
        console.log('# of announcements-',announcements.length)
        announcements.splice(indexToRemove,1)
        console.log('# of announcements-',announcements.length)
      })

    }
  }

  

  return announcements
    .filter(e => {
      if (classifications.length === 0 || e.audiences.length === 0) return true;
      return e.audiences.some(audience => classifications.includes(audience));
    })
    .map(({ audiences, ...resourceAttribs }) => {
      return { ...resourceAttribs };
    });
};
const getAnnouncements = (type): Promise<any> =>
  axios.get(`/api/announcements/${type}`).then(res => res.data);
export const useAnnouncements = (type: string) =>
  useAPICall<any[]>(getAnnouncements, type, d => d, []);

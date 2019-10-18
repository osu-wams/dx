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
    console.log('user--', user)
    if (announcements) {
      announcements.forEach(e => {
        let shouldKeepAnnouncement = false;
        let doesMatchOnCampus = false
        let doesMatchOnLevel = false
        let doesMatchOnInternational = false
        
        console.log('new announcement--',e)

        if (e.audiences) {
          e.audiences.forEach(announceCampus => {
            
            console.log('A -', announceCampus)
            console.log('U -', user.classification.attributes.campus)
            console.log('L -',user.classification.attributes.level)

            let campusMatch = (announceCampus === user.classification.attributes.campus)
            let levelMatch = ((user.classification.attributes.level === announceCampus) ||  (user.classification.attributes.level === 'Undergraduate'))
            let internationalMatch = ((announceCampus === 'mapped_international') && (user.classification.attributes.isInternational))
            
            if (campusMatch) {
              doesMatchOnCampus = true
            }

            if (levelMatch) {
              doesMatchOnLevel = true
            }
            
            if (internationalMatch) {
              doesMatchOnInternational = true
            }

          })
        }

        /**
         * We're collecting the international status of the student and announcement, but it is still
         * slightly unclear what the rules are for that in terms of if an announcement should be 
         * hidden/visible
         * 
         * This logic DOES require that an announcement have both a campus and audience/level in drupal
         * 
         * Undergrads always get a pass on the level check. We don't have an undergrad option on announcements
         * so I hard coded a special case for that a few lines above this. We'll want to think about adding Undergrad
         * going forward as an audience so that we can target announcements at them.
         */

        if (doesMatchOnCampus && doesMatchOnLevel) {
          shouldKeepAnnouncement = true
        }

        console.log('International Match?-',doesMatchOnInternational)

        if (!shouldKeepAnnouncement) {
          console.log('announcement audience and classification level did not match user audience')
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

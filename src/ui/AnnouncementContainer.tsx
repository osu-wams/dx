import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAnnouncements } from '../api/announcements';
import EventCard from './EventCard';
import { breakpoints } from '../theme';
import { UserContext } from '../App';
import { IUser, CAMPUS_CODES } from '../api/user';

const AnnouncementContainerWrapper = styled.div`
  max-width: ${breakpoints[1024]};
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-row-gap: 16px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 16px;
  }
`;

const AnnouncementContainer = ({ type, ...props }) => {
  const [events, setEvents] = useState<any>([]);
  const user = useContext<any>(UserContext);
  const announcements = useAnnouncements(type);

  const hasAudience = (user: IUser, announcement: { audiences: string[] }): boolean => {
    if (announcement.audiences && announcement.audiences.length === 0) return true;
    if (user.classification !== undefined && user.classification.attributes !== undefined) {
      // Find the key name associated to the users campusCode to use for matching in the audiences
      // set for the announcement
      const usersCampusName = Object.keys(CAMPUS_CODES)
        .map(k => k.toLowerCase())
        .find(
          key => CAMPUS_CODES[key] === user.classification!.attributes!.campusCode.toLowerCase()
        );
      if (!usersCampusName) {
        // If there is no matching campusCode, then default to displaying the announcement
        console.error(
          `Expected campus code ${
            user.classification!.attributes!.campusCode
          } not found in configuration, this is an unexpected circumstance that needs to be repaired.`
        );
        return true;
      }
      // The user has a classification and the item has audiences specified, return if
      // this users campusCode exists in the audience list.
      return announcement.audiences.some(a => a.toLowerCase() === usersCampusName.toLowerCase());
    }
    return true;
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  // Fetch data on load
  useEffect(() => {
    let announcementsToUse: any[] = [];

    if (!user.loading && !announcements.loading) {
      announcementsToUse = announcements.data.filter(a => hasAudience(user, a));
    }
    setEvents(announcementsToUse);
  }, [announcements.data, announcements.loading, user.data, user.loading]);
  /* eslint-enable react-hooks/exhaustive-deps */

  if (!events.length) {
    return null;
  }

  return (
    <AnnouncementContainerWrapper {...props}>
      {events.map(item => (
        <EventCard key={item.id} itemContent={item} />
      ))}
    </AnnouncementContainerWrapper>
  );
};

export default AnnouncementContainer;

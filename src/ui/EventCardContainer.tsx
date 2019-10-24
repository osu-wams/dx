import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../App';
import { useAnnouncements } from '../api/announcements';
import { useStudentExperienceEvents, useCampusEvents } from '../api/events';
import { hasAudience, atCampus, CAMPUS_CODES } from '../api/user';
import EventCard from './EventCard';
import { theme, breakpoints } from '../theme';

const EventCardContainerWrapper = styled.div`
  max-width: ${breakpoints[1024]};
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-row-gap: ${theme.spacing.mobile};
  @media screen and (min-width: ${breakpoints[768]}) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: ${theme.spacing.desktop};
  }
`;

const EventCardContainer = ({ ...props }) => {
  const [events, setEvents] = useState<any>([]);
  const user = useContext<any>(UserContext);
  const studentExperienceEvents = useStudentExperienceEvents();
  const bendEvents = useCampusEvents('bend');
  const announcements = useAnnouncements('');

  /* eslint-disable react-hooks/exhaustive-deps */
  // Fetch data on load
  useEffect(() => {
    let announcementsToUse: any[] = [];
    let eventsToUse: any[] = [];

    if (!announcements.loading) {
      announcementsToUse = announcements.data;
    }

    if (!user.loading) {
      const atBend = atCampus(user.data, CAMPUS_CODES.bend);
      if (!announcements.loading) {
        announcementsToUse = announcements.data.filter(announcement =>
          hasAudience(user.data, announcement)
        );
      }
      if (!studentExperienceEvents.loading && !atBend) {
        eventsToUse = studentExperienceEvents.data;
      }
      if (!bendEvents.loading && atBend) {
        eventsToUse = bendEvents.data;
      }
    }
    if (announcementsToUse.length || eventsToUse.length) {
      // Weave two arrays alternating an item from each providing that the array
      // with more elements ends with its remaining items "at the end of the array".
      //
      // * How this works;
      // *  - Create an array setting its length to match the max of the two being weaved.
      // *  - Map through each of this arrays elements, populating it with the item at that index
      // *    from each of the weaved arrays. For example if array 'a' had 4 elements and 'b' had 2 the
      // *    resulting weaved array would look like: [ [a[0],b[0]], [a[1],b[1]], [a[2],undefined], [a[3], undefined] ]
      // *  - Flatten (reduce/concat) the array: [ a[0],b[0],a[1],b[1],a[2],undefined,a[3],undefined ]
      // *  - Finally, filter out the 'undefined': [ a[0],b[0],a[1],b[1],a[2],a[3] ]
      const weavedArrays = Array.from(
        { length: Math.max(announcementsToUse.length, eventsToUse.length) },
        (_, i) => [announcementsToUse[i], eventsToUse[i]]
      )
        .reduce((p, c) => p.concat(c))
        .filter(e => e !== undefined);

      setEvents(weavedArrays);
    }
  }, [
    announcements.data,
    announcements.loading,
    studentExperienceEvents.data,
    studentExperienceEvents.loading,
    user.data,
    user.loading,
    bendEvents.data,
    bendEvents.loading
  ]);
  /* eslint-enable react-hooks/exhaustive-deps */

  if (!events.length) {
    return null;
  }
  return (
    <EventCardContainerWrapper {...props}>
      {events.map(item => (
        <EventCard key={item.id} itemContent={item} />
      ))}
    </EventCardContainerWrapper>
  );
};
export default EventCardContainer;

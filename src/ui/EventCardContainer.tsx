import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';
import { Title } from '../ui/PageTitle';
import { useAnnouncements, hasAffiliation } from '../api/announcements';
import { useStudentExperienceEvents, useCampusEvents, useEmployeeEvents } from '../api/events';
import {
  hasAudience,
  atCampus,
  CAMPUS_CODES,
  hasPrimaryAffiliation,
  AFFILIATIONS
} from '../api/user';
import EventCard from './EventCard';
import { themeSettings, breakpoints, styled, SecondGridWrapper } from '../theme';

const EventCardContainerWrapper = styled.div`
  max-width: ${breakpoints[1024]};
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-row-gap: ${themeSettings.spacing.mobile};
  @media screen and (min-width: ${breakpoints[768]}) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: ${themeSettings.spacing.desktop};
  }
`;

/**
 *  Return an array randomly shuffled.
 * ! Shouldn't be used in huge arrays.. for our case, this is random enough and
 * ! operating on very small arrays.
 * @param arr the original array to shuffle
 */
function shuffleArray(arr: any[]) {
  let shuffled: any[] = [];
  let source: any[] = arr.concat([]);

  // Find a random index of the mutated source array, push that element
  // onto the shuffled array until the mutated source array has been reduced
  // to 0.
  while (source.length) {
    let index = Math.floor(Math.random() * source.length);
    shuffled.push(source.splice(index, 1)[0]);
  }

  return shuffled;
}

const EventCardContainer = ({ page, ...props }) => {
  const [events, setEvents] = useState<any>([]);
  const user = useContext<any>(UserContext);
  const studentExperienceEvents = useStudentExperienceEvents();
  const employeeEvents = useEmployeeEvents();

  const bendEvents = useCampusEvents('bend');
  const announcements = useAnnouncements(page);

  /* eslint-disable react-hooks/exhaustive-deps */
  // Fetch data on load
  useEffect(() => {
    let announcementsToUse: any[] = [];
    let eventsToUse: any[] = [];

    if (!announcements.loading) {
      announcementsToUse = announcements.data;
    }

    if (!user.loading) {
      /**
       * Checks to see if you are an employee or a student at Bend or Corvallis
       * Returns the appropriate events based on that
       */
      if (hasPrimaryAffiliation(user.data, [AFFILIATIONS.employee]) && !employeeEvents.loading) {
        eventsToUse = employeeEvents.data;
      } else {
        const atBend = atCampus(user.data, CAMPUS_CODES.bend);
        if (!studentExperienceEvents.loading && !atBend) {
          eventsToUse = studentExperienceEvents.data;
        }
        if (!bendEvents.loading && atBend) {
          eventsToUse = bendEvents.data;
        }
      }

      if (!announcements.loading) {
        announcementsToUse = shuffleArray(
          announcements.data.filter(
            announcement =>
              hasAudience(user.data, announcement) && hasAffiliation(user.data, announcement)
          )
        );
      }
    }

    announcementsToUse = announcementsToUse.slice(0, 6);
    eventsToUse = eventsToUse.slice(0, 6);

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
    bendEvents.loading,
    employeeEvents.data,
    employeeEvents.loading
  ]);
  /* eslint-enable react-hooks/exhaustive-deps */

  if (events.length === 0) {
    return null;
  }
  return (
    <SecondGridWrapper>
      <Title as="h2">Announcements and Events</Title>
      <EventCardContainerWrapper {...props}>
        {events.map(item => (
          <EventCard key={item.id} itemContent={item} />
        ))}
      </EventCardContainerWrapper>
    </SecondGridWrapper>
  );
};
export default EventCardContainer;

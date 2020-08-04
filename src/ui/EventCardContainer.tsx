import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { Title } from 'src/ui/PageTitle';
import { Types } from '@osu-wams/lib';
import {
  User,
  useStudentExperienceEvents,
  useCampusEvents,
  useEmployeeEvents,
} from '@osu-wams/hooks';
import EventCard from './EventCard';
import { spacing, breakpoints, SecondGridWrapper } from 'src/theme';
import { Announcements, useAnnouncements } from '@osu-wams/hooks';
import { arrayIncludes } from 'src/util/helpers';
import { userState } from 'src/state/application';
import { useRecoilValue } from 'recoil';

const {
  hasAudience,
  atCampus,
  CAMPUS_CODES,
  hasPrimaryAffiliation,
  AFFILIATIONS,
  getAffiliation,
} = User;

const EventCardContainerWrapper = styled.div`
  max-width: ${breakpoints.large};
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-row-gap: ${spacing.mobile};
  @media screen and (min-width: ${breakpoints.small}) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: ${spacing.desktop};
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

const filterEmployeeEvents = (
  inBend: boolean,
  inCorvallis: boolean,
  events: Types.LocalistEvent[]
) => {
  const { bend, corvallis } = CAMPUS_CODES;
  if (inBend) {
    return events.filter((e) => !e.campus_code || arrayIncludes(bend, e.campus_code));
  } else if (inCorvallis) {
    return events.filter((e) => !e.campus_code || arrayIncludes(corvallis, e.campus_code));
  } else {
    return events.filter(
      (e) => !e.campus_code || !arrayIncludes([...bend, ...corvallis], e.campus_code)
    );
  }
};

const EventCardContainer = ({ page, ...props }) => {
  const [events, setEvents] = useState<any>([]);
  const user = useRecoilValue(userState);
  const studentExperienceEvents = useStudentExperienceEvents();
  const employeeEvents = useEmployeeEvents();

  const bendEvents = useCampusEvents('bend');
  const announcements = useAnnouncements(page);

  // Fetch data on load
  useEffect(() => {
    let announcementsToUse: any[] = [];
    let eventsToUse: Types.LocalistEvent[] = [];

    if (!announcements.loading) {
      announcementsToUse = announcements.data;
    }

    if (!user.loading) {
      /**
       * Checks to see if you are an employee or a student at Bend or Corvallis
       * Returns the appropriate events based on that
       */
      const inBend = CAMPUS_CODES.bend.some((c) => atCampus(user.data, c));
      const inCorvallis = CAMPUS_CODES.corvallis.some((c) => atCampus(user.data, c));

      if (
        hasPrimaryAffiliation(user.data, [AFFILIATIONS.employee]) &&
        !employeeEvents.loading &&
        Array.isArray(employeeEvents.data)
      ) {
        eventsToUse = filterEmployeeEvents(inBend, inCorvallis, employeeEvents.data);
      } else {
        if (!studentExperienceEvents.loading && !inBend) {
          eventsToUse = studentExperienceEvents.data;
        }
        if (!bendEvents.loading && inBend) {
          eventsToUse = bendEvents.data;
        }
      }

      if (!announcements.loading && Array.isArray(announcements.data)) {
        announcementsToUse = shuffleArray(
          announcements.data.filter(
            (announcement) =>
              hasAudience(user.data, announcement) &&
              Announcements.hasAffiliation(getAffiliation(user.data), announcement)
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
        .filter((e) => e !== undefined);

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
    employeeEvents.loading,
  ]);

  if (events.length === 0) {
    return null;
  }
  return (
    <SecondGridWrapper>
      <Title as="h2">Announcements and Events</Title>
      <EventCardContainerWrapper {...props}>
        {events.map((item) => (
          <EventCard key={item.id} itemContent={item} />
        ))}
      </EventCardContainerWrapper>
    </SecondGridWrapper>
  );
};
export default EventCardContainer;

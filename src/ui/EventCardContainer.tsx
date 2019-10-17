import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../App';
import { useAnnouncements, filterAnnouncementsForUser } from '../api/announcements';
import { useStudentExperienceEvents } from '../api/events';
import EventCard from './EventCard';
import { theme, breakpoints } from '../theme';
import { IAPIResult } from '../api/useAPICall';

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
  const announcements = useAnnouncements('');
  

  // Helper Function
  const newLocalist = item => {
    return {
      id: item.event.event_instances[0].event_instance.id,
      date: item.event.event_instances[0].event_instance.start,
      title: item.event.title,
      body: null,
      bg_image: item.event.photo_url,
      action: {
        title: null,
        link: item.event.localist_url
      }
    };
  };

  // Fetch data on load
  useEffect(() => {
    const formattedEvents: any[] = [];
    let filteredAnnouncements: any[] = announcements.data;
    if (user) {
      // if the user is present it's safe to filter
      if (announcements) {
        filteredAnnouncements = filterAnnouncementsForUser(announcements.data, user);
      }
    }

    for (
      let i = 0;
      i < Math.min(announcements.data.length, studentExperienceEvents.data.length);
      i++
    ) {
      /*
       * Determines the minimum number of announcements and student experience events.
       * Since we want to alternate between an announcement card and student experience card
       * getting displayed, we first figure out how many we can safely loop through before
       * jumping into logic on how we will finish populating the list.
       */

      formattedEvents.push(announcements.data[i]);
      formattedEvents.push(newLocalist(studentExperienceEvents.data[i]));
    }

    /**
     * If there are less announcements than student experience events, push the rest of
     * the student experience events picking up from where we left off.
     *
     * If there are less student experience events than announcements, push the rest of
     * the announcements picking up from where we left off.
     *
     * No need to worry about if they are == as they would all get gobbled up in the for
     * loop above.
     */

    if (announcements.data.length < studentExperienceEvents.data.length) {
      for (let i = announcements.data.length; i < studentExperienceEvents.data.length; i++) {
        formattedEvents.push(newLocalist(studentExperienceEvents.data[i]));
      }
    } else if (announcements.data.length > studentExperienceEvents.data.length) {
      /*
      
      */
      for (let i = studentExperienceEvents.data.length; i < announcements.data.length; i++) {
        formattedEvents.push(announcements.data[i]);
      }
    }

    //TODO: if user than filter announcements before setting events

    setEvents(formattedEvents);
  }, [announcements.data, studentExperienceEvents.data, user]);

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

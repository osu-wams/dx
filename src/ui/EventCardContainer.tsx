import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../App';
import { useAnnouncements, filterAnnouncementsForUser } from '../api/announcements';
import { useStudentExperienceEvents, useBendEvents } from '../api/events';
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
  const bendEvents = useBendEvents();
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
    let eventsToUse: any = studentExperienceEvents // the default bucket of events

    console.log('bend events--',bendEvents)
    console.log('SExp events--',studentExperienceEvents)

    if (bendEvents && bendEvents.data && bendEvents.data.length) {
      // console.log('updating the events to use to bend!')
      // eventsToUse = bendEvents
    }
    
    
    if (user) {
      if (user && user.classification && user.classification.attributes) {
        console.log('user',user.classification.attributes.campus)

        let userCampus = user.classification.attributes.campus

        if (userCampus === 'Oregon State - Cascades') {
          eventsToUse = bendEvents
        }

      }
      
      

      if (announcements) {
        console.log('before--', filteredAnnouncements.length)
        filteredAnnouncements = filterAnnouncementsForUser(filteredAnnouncements, user);
        console.log('after--', filteredAnnouncements)
      }
    }

    for (
      let i = 0;
      i < Math.min(filteredAnnouncements.length, eventsToUse.data.length);
      i++
    ) {
      /*
       * Determines the minimum number of announcements and student experience events.
       * Since we want to alternate between an announcement card and student experience card
       * getting displayed, we first figure out how many we can safely loop through before
       * jumping into logic on how we will finish populating the list.
       */


      // console.log('newLocalist', newLocalist(studentExperienceEvents.data[i]))
      console.log('riparonis', eventsToUse.data[i])


      formattedEvents.push(filteredAnnouncements[i]);
      formattedEvents.push(newLocalist(eventsToUse.data[i]));
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

    if (filteredAnnouncements.length < eventsToUse.data.length) {
      for (let i = filteredAnnouncements.length; i < eventsToUse.data.length; i++) {
        formattedEvents.push(newLocalist(eventsToUse.data[i]));
      }
    } else if (filteredAnnouncements.length > eventsToUse.data.length) {
      /*
      
      */
      for (let i = eventsToUse.data.length; i < filteredAnnouncements.length; i++) {
        formattedEvents.push(filteredAnnouncements[i]);
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

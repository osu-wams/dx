import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAnnouncements } from '../api/announcements';
import { useStudentExperienceEvents } from '../api/events';
import EventCard from './EventCard';

const EventCardContainerWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-row-gap: 16px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 16px;
  }
`;

const EventCardContainer = ({ ...props }) => {
  const [events, setEvents] = useState<any>([]);
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
    for (
      let i = 0;
      i < Math.min(announcements.data.length, studentExperienceEvents.data.length);
      i++
    ) {
      formattedEvents.push(announcements.data[i]);
      formattedEvents.push(newLocalist(studentExperienceEvents.data[i]));
    }
    if (announcements.data.length < studentExperienceEvents.data.length) {
      for (let i = announcements.data.length; i < studentExperienceEvents.data.length; i++) {
        formattedEvents.push(newLocalist(studentExperienceEvents.data[i]));
      }
    } else if (announcements.data.length > studentExperienceEvents.data.length) {
      for (let i = studentExperienceEvents.data.length; i < announcements.data.length; i++) {
        formattedEvents.push(announcements.data[i]);
      }
    }
    setEvents(formattedEvents);
  }, [announcements.data, studentExperienceEvents.data]);

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

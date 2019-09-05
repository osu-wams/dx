import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAnnouncements } from '../api/announcements';
import EventCard from './EventCard';

const AnnouncementContainerWrapper = styled.div`
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

  // Fetch data on load
  useEffect(() => {
    let isMounted = true;
    getAnnouncements(type)
      .then(data => {
        if (isMounted) {
          for (let i = 0; i < data.length; i++) {
            setEvents(prevEvents => [...prevEvents, data[i]]);
          }
        }
      })
      .catch(console.log);

    return () => {
      isMounted = false;
    };
  }, [type]);

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

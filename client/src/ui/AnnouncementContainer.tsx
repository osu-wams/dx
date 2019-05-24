import React, { useState, useEffect, useRef } from 'react';
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
  const isMounted = useRef(true);

  // Fetch data on load
  useEffect(() => {
    isMounted.current = true;
    getAnnouncements(type)
      .then(data => {
        if (isMounted.current) {
          const newAnnounce = item => {
            const action = item.attributes.field_announcement_action
              ? {
                  title: item.attributes.field_announcement_action.title,
                  link: item.attributes.field_announcement_action.uri
                }
              : {
                  title: null,
                  link: null
                };
            return {
              id: item.id,
              title: item.attributes.title,
              body: item.attributes.field_announcement_body,
              bg_image: item.attributes.background_image,
              action
            };
          };
          for (let i = 0; i < data.length; i++) {
            setEvents(prevEvents => [...prevEvents, newAnnounce(data[i])]);
          }
        }
      })
      .catch(console.log);

    return () => {
      isMounted.current = false;
    };
  }, []);

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

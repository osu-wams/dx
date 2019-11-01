import React from 'react';
import styled from 'styled-components';
import EventCard from './EventCard';
import { breakpoints } from '../theme';

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
  const events = props.events

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

import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import EventCard from './EventCard';
import { Title } from 'src/ui/PageTitle';
import { State, User, useAnnouncementsState } from '@osu-wams/hooks';
import { Types } from '@osu-wams/lib';
import { spacing, breakpoints } from '@osu-wams/theme';
import { SecondGridWrapper } from 'src/ui/grid';
import { useRecoilValue } from 'recoil';

const { hasAudience } = User;

const AnnouncementContainerWrapper = styled.div`
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

const AnnouncementContainer = ({ page, ...props }) => {
  const [events, setEvents] = useState<Types.Announcement[]>([]);
  const user = useRecoilValue(State.userState);
  const { filtered } = useAnnouncementsState(page); // TODO: Promote to application-state for search

  useEffect(() => {
    if (filtered.length) {
      setEvents(filtered.filter((announcement) => hasAudience(user.data, announcement)));
    }
  }, [filtered]);

  if (events.length === 0) {
    return null;
  }

  return (
    <SecondGridWrapper>
      <Title as="h2">Announcements</Title>
      <AnnouncementContainerWrapper {...props}>
        {events.map((item) => (
          <EventCard key={item.id} itemContent={item} />
        ))}
      </AnnouncementContainerWrapper>
    </SecondGridWrapper>
  );
};

export default AnnouncementContainer;

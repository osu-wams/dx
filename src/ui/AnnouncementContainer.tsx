import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import EventCard from './EventCard';
import { Title } from 'src/ui/PageTitle';
import { User } from '@osu-wams/hooks';
import { spacing, breakpoints, SecondGridWrapper } from 'src/theme';
import { Announcements, useAnnouncements } from '@osu-wams/hooks';
import { userState } from 'src/state/application';
import { useRecoilValue } from 'recoil';

const { hasAudience, getAffiliation } = User;

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
  const [events, setEvents] = useState<any>([]);
  const user = useRecoilValue(userState);
  const announcements = useAnnouncements(page);
  const { hasAffiliation } = Announcements;

  // Fetch data on load
  useEffect(() => {
    let announcementsToUse: any[] = [];

    if (!user.loading && !announcements.loading && Array.isArray(announcements.data)) {
      announcementsToUse = announcements.data.filter(
        (announcement) =>
          hasAudience(user.data, announcement) &&
          hasAffiliation(getAffiliation(user.data), announcement)
      );
    }
    setEvents(announcementsToUse);
  }, [announcements.data, hasAffiliation, announcements.loading, user.data, user.loading]);

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

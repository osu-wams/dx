import React, { useContext, useState, useEffect } from 'react';
import EventCard from './EventCard';
import { Title } from '../ui/PageTitle';
import { UserContext } from '../App';
import { hasAudience, getAffiliation } from '../api/user';
import { styled, themeSettings, breakpoints, SecondGridWrapper } from '../theme';
import { Announcements, useAnnouncements } from '@osu-wams/hooks';

const AnnouncementContainerWrapper = styled.div`
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

const AnnouncementContainer = ({ page, ...props }) => {
  const [events, setEvents] = useState<any>([]);
  const user = useContext<any>(UserContext);
  const announcements = useAnnouncements(page);
  const { hasAffiliation } = Announcements;

  /* eslint-disable react-hooks/exhaustive-deps */
  // Fetch data on load
  useEffect(() => {
    let announcementsToUse: any[] = [];

    if (!user.loading && !announcements.loading) {
      announcementsToUse = announcements.data.filter(
        announcement =>
          hasAudience(user.data, announcement) &&
          hasAffiliation(getAffiliation(user.data), announcement)
      );
    }
    setEvents(announcementsToUse);
  }, [announcements.data, announcements.loading, user.data, user.loading]);
  /* eslint-enable react-hooks/exhaustive-deps */

  if (events.length === 0) {
    return null;
  }

  return (
    <SecondGridWrapper>
      <Title as="h2">Announcements</Title>
      <AnnouncementContainerWrapper {...props}>
        {events.map(item => (
          <EventCard key={item.id} itemContent={item} />
        ))}
      </AnnouncementContainerWrapper>
    </SecondGridWrapper>
  );
};

export default AnnouncementContainer;

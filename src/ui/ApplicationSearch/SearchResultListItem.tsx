import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { faExternalLink } from '@fortawesome/pro-solid-svg-icons';
import { ListItemFlex } from 'src/ui/List';
import { SimpleInternalLink, SimpleExternalLink, SimpleModalLink } from 'src/ui/Link';
import { SearchItem } from 'src/state/search';
import Fuse from 'fuse.js';
import { BubbleExternalLink, BubbleInternalLink } from 'src/ui/Bubble';
import { borderRadius, spacing, breakpoints, fontSize } from 'src/theme';
import Icon from '../Icon';
import { TrainingDetails } from 'src/features/training/TrainingDetails';
import Course from 'src/features/Course';
import { sortedGroupedByCourseName } from 'src/features/schedule/schedule-utils';
import { NotificationModal } from '../HeaderNav/NotificationsMenu';

const SearchResultStyles = styled(ListItemFlex)`
  border-radius: ${borderRadius[16]};
  box-shadow: ${({ theme }) => theme.ui.card.boxShadow};
  background-color: ${({ theme }) => theme.ui.card.background};
  overflow: hidden;
  margin-bottom: ${spacing.mobile};
  padding: ${spacing.medium};
  @media (min-width: ${breakpoints.small}) {
    margin-bottom: ${spacing.large};
  }
  flex-direction: column;
  align-items: stretch;
`;

const Header = styled.div`
  display: flex;
  > a {
    flex: 1;
    font-size: ${fontSize[18]};
    margin: 0;
    padding: ${spacing.medium} ${spacing.small} 0 ${spacing.small};
    color: ${({ theme }) => theme.ui.searchResult.title.color};
  }
  > span {
    margin: ${spacing.medium} ${spacing.small};
  }
`;

const SubText = styled.div`
  font-size: ${fontSize[14]};
  font-weight: 300;
  padding: 0 ${spacing.small};
  color: ${({ theme }) => theme.ui.searchResult.subText.color};
`;

const titleLink = (item: SearchItem, toggleModal?: () => void) => {
  const { link, title } = item;
  if (toggleModal && link?.modal) {
    return (
      <SimpleModalLink onClick={toggleModal} css={{ cursor: 'pointer' }}>
        {title}
      </SimpleModalLink>
    );
  }
  return link?.to ? (
    <SimpleInternalLink to={link.to}>{title}</SimpleInternalLink>
  ) : (
    <SimpleExternalLink href={link?.href}>{title}</SimpleExternalLink>
  );
};

const titleBubble = (item: SearchItem) => {
  const { link, type } = item;
  return link?.href ? (
    <BubbleExternalLink>
      {type}
      <Icon icon={faExternalLink} />
    </BubbleExternalLink>
  ) : (
    <BubbleInternalLink>{type}</BubbleInternalLink>
  );
};

const itemModal = (selected: SearchItem, toggleModal: () => void) => {
  switch (selected?.type) {
    case 'Training':
      return (
        <TrainingDetails training={selected?.attr.training!} isOpen toggleTraining={toggleModal} />
      );
    case 'Current Course':
      const course = selected.attr.courses;
      if (!course) return null;
      const map = sortedGroupedByCourseName([course]);
      const {
        attributes: { courseSubject, courseNumber },
      } = course;
      const coursesMap = map.get(`${courseSubject}${courseNumber}`);
      if (!coursesMap) return null;
      return <Course coursesMap={coursesMap} toggleCourse={toggleModal} isOpen />;
    case 'Notification':
      return (
        <NotificationModal isOpen notification={selected?.attr.notification!} close={toggleModal} />
      );
    default:
      return null;
  }
};

const SearchResultListItem = ({
  searchResult: { item },
}: {
  searchResult: Fuse.FuseResult<SearchItem>;
}) => {
  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<SearchItem>();

  const toggleModal = (item?: SearchItem) => {
    setOpen(!isOpen);
    if (item) {
      setSelected(item);
    }
  };

  return (
    <SearchResultStyles
      onClick={() => {
        toggleModal(item);
      }}
    >
      <Header>
        {titleLink(item, () => toggleModal(item))}
        {titleBubble(item)}
      </Header>
      {item.subText &&
        (item.subText.html ? (
          <SubText dangerouslySetInnerHTML={{ __html: item.subText.html ?? '' }} />
        ) : (
          <SubText>{item.subText.value ?? ''}</SubText>
        ))}
      {isOpen && selected && itemModal(selected, () => toggleModal(item))}
    </SearchResultStyles>
  );
};

export default SearchResultListItem;

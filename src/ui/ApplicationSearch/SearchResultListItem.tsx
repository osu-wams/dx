import React, { useState, useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/macro';
import { faExternalLink } from '@fortawesome/pro-solid-svg-icons';
import { ListItemFlex } from 'src/ui/List';
import { SimpleInternalLink, SimpleExternalLink, SimpleModalLink } from 'src/ui/Link';
import { State, useStatus } from '@osu-wams/hooks';
import { Helpers } from '@osu-wams/utils';
import Fuse from 'fuse.js';
import { BubbleExternalLink, BubbleInternalLink } from 'src/ui/Bubble';
import { borderRadius, spacing, breakpoints, fontSize } from '@osu-wams/theme';
import Icon from '../Icon';
import { TrainingDetails } from 'src/features/training/TrainingDetails';
import Course from 'src/features/Course';
import { sortedGroupedByCourseName } from 'src/features/schedule/schedule-utils';
import { NotificationModal } from '../HeaderNav/NotificationsMenu';
import MyDialog, { MyDialogContent, MyDialogFooter } from '../MyDialog';
import { CloseButton } from '../Button';
import { ExternalLink } from '../Link';
import { faExclamationCircle as faExclamationCircleHollow } from '@fortawesome/pro-light-svg-icons';
import { faExclamationCircle as faExclamationCircleSolid } from '@fortawesome/pro-solid-svg-icons';

const DateContainer = styled.div`
  color: ${({ theme }) => theme.notification.date};
`;

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

const titleLink = (
  item: State.SearchItem,
  itStatus: any | undefined,
  openDialog: () => void,
  toggleModal?: () => void
) => {
  const { link, title } = item;
  const themeContext = useContext(ThemeContext);

  if (toggleModal && link?.modal) {
    return (
      <SimpleModalLink onClick={toggleModal} css={{ cursor: 'pointer' }}>
        {title}
      </SimpleModalLink>
    );
  }
  return link?.to ? (
    <SimpleInternalLink data-testid="simple-internal-link" to={link.to}>
      {title}
    </SimpleInternalLink>
  ) : (
    <SimpleExternalLink
      href={link?.href}
      onClick={(e) => {
        if (itStatus !== undefined && itStatus.status !== 1) {
          e.preventDefault();
          openDialog();
        }
      }}
    >
      {title}
      {itStatus && itStatus.status !== 1 && (
        <Icon
          fontSize={fontSize[14]}
          icon={faExclamationCircleSolid}
          color={themeContext.features.itStatus.item.icon.partialOutage}
          data-testid="warning-icon"
          style={{ display: 'inline-block', marginLeft: 5, marginBottom: 8 }}
        />
      )}
    </SimpleExternalLink>
  );
};

const titleBubble = (item: State.SearchItem) => {
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

const itemModal = (selected: State.SearchItem, toggleModal: () => void) => {
  switch (selected?.type) {
    case 'Training':
      return (
        <TrainingDetails
          training={selected?.attr.training!}
          isOpen
          includeShowAll
          toggleTraining={toggleModal}
        />
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
  searchResult: Fuse.FuseResult<State.SearchItem>;
}) => {
  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<State.SearchItem>();
  const themeContext = useContext(ThemeContext);
  const status = useStatus();
  const [itSystemStatus, setItSystemStatus] = useState<{
    details: any | undefined;
    timeChecked: Date | null;
  }>({
    details: undefined,
    timeChecked: null,
  });
  const [showDialog, setShowDialog] = useState(false);
  const openDialog = () => {
    setShowDialog(true);
  };
  const closeDialog = () => setShowDialog(false);

  useEffect(() => {
    if (item.attr.resource && item.attr.resource.hasOwnProperty('itSystem') && status.isSuccess) {
      const resource = item.attr.resource;
      var result = status.data.find((system) => system.name === resource.itSystem);
      setItSystemStatus({
        details: result,
        timeChecked: new Date(),
      });
    }
  }, [status.isSuccess]);

  const OutageDialog = () => (
    <MyDialog
      isOpen={showDialog}
      onDismiss={closeDialog}
      aria-labelledby="message-title"
      style={{ marginTop: '30vh' }}
    >
      <CloseButton onClick={closeDialog} />
      <div>
        <Icon
          fontSize={fontSize[26]}
          icon={faExclamationCircleHollow}
          color={themeContext.features.itStatus.item.icon.partialOutage}
          style={{ display: 'inline-block', paddingRight: '5px' }}
        />
        <h2
          id="message-title"
          style={{
            fontSize: fontSize[18],
            marginTop: '0',
            marginLeft: '5px',
            display: 'inline-block',
          }}
        >
          This resource may be unavailable.
        </h2>
      </div>

      <MyDialogContent column style={{ paddingBottom: '0px' }}>
        <DateContainer>
          {item?.attr?.resource?.title ?? 'Resource'} •{' '}
          {itSystemStatus.timeChecked?.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          }) +
            ' on ' +
            Helpers.format(itSystemStatus.timeChecked ?? '')}
        </DateContainer>
        <p>{itSystemStatus.details.statusText}.</p>
      </MyDialogContent>
      <MyDialogFooter style={{ marginTop: '0' }}>
        <ExternalLink href={item.link?.href} onClick={closeDialog}>
          Continue to resource
        </ExternalLink>
      </MyDialogFooter>
    </MyDialog>
  );

  const toggleModal = (item?: State.SearchItem) => {
    setOpen(!isOpen);
    if (item) {
      setSelected(item);
    }
  };

  return (
    <>
      <SearchResultStyles
        onClick={() => {
          toggleModal(item);
        }}
      >
        <Header>
          {titleLink(item, itSystemStatus.details, openDialog, () => toggleModal(item))}
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
      {showDialog && <OutageDialog />}
    </>
  );
};

export default SearchResultListItem;

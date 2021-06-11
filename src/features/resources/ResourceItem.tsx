import React, { useContext, useState, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components/macro';
import { fal, faHeart, faGripLines } from '@fortawesome/pro-light-svg-icons';
import { faHeart as faSolidHeart } from '@fortawesome/pro-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Checkbox from '@material-ui/core/Checkbox';
import { State, Resources, useStatus } from '@osu-wams/hooks';
import { Types } from '@osu-wams/lib';
import { ListItemFlex, ListItemResourceLink, ListItemContentLinkName } from 'src/ui/List';
import { IconLookup } from './resources-utils';
import Icon from 'src/ui/Icon';
import { TrendingEvent } from './GATrendingResource';
import { Event, EventAction, IComponents } from 'src/util/gaTracking';
import { useRecoilValue } from 'recoil';
import { ExternalLink } from '../../ui/Link';
import { CloseButton } from '../../ui/Button';
import MyDialog, { MyDialogContent, MyDialogFooter } from '../../ui/MyDialog';
import { faExclamationCircle as faExclamationCircleHollow } from '@fortawesome/pro-light-svg-icons';
import { faExclamationCircle as faExclamationCircleSolid } from '@fortawesome/pro-solid-svg-icons';
import { fontSize, Color } from '@osu-wams/theme';
import { Helpers } from '@osu-wams/utils';
import { Draggable } from 'react-beautiful-dnd';

// Adds all font awesome icons so we can call them by name (coming from Drupal API)
library.add(fal, fab);

const DateContainer = styled.div`
  color: ${({ theme }) => theme.notification.date};
`;

const ResourceItem = ({
  resource,
  eventCategory,
  eventAction,
  draggable,
  index,
}: {
  resource: Types.Resource;
  eventCategory: IComponents;
  eventAction: string;
  draggable?: boolean;
  index?: number;
}) => {
  const themeContext = useContext(ThemeContext);
  const user = useRecoilValue(State.userState);
  const [favs, setFav] = useState(false);
  const status = useStatus();
  const [showDialog, setShowDialog] = useState(false);
  const [itSystemError, setItSystemError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [systemCheckedAt, setSystemCheckedAt] = useState(new Date());
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const isFavorite = (resId: string, favs: Types.FavoriteResource[]) => {
    const res: Types.FavoriteResource | undefined = favs.find(
      (r: Types.FavoriteResource) => r.resourceId === resId
    );
    return res?.active || false;
  };

  useEffect(() => {
    if (resource.id && user.data.favoriteResources) {
      setFav(isFavorite(resource.id, user.data.favoriteResources));
    }
  }, [user.data.favoriteResources, resource.id]);

  const favoriteLabelText = (currentFavState: boolean) => {
    return currentFavState
      ? `Remove ${resource.title} link from your favorite resources`
      : `Add ${resource.title} link to your favorite resources`;
  };

  // Adds or removes a resource from FavoriteResource and refreshes the cache to get new list
  const updateFavorites = async () => {
    await Resources.postFavorite([{ resourceId: resource.id, active: !favs, order: index ?? 999 }]);
    if (user.refreshFavorites) await user.refreshFavorites();
    Event('favorite-resource', resource.id, favoriteLabelText(favs));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFav(event.target.checked);
    updateFavorites();
  };

  useEffect(() => {
    if (status.isSuccess) {
      // look for the resource's corresponding IT system
      if (resource.hasOwnProperty('itSystem') && status.data) {
        var result = status.data.find((system) => system.name === resource.itSystem);

        if (resource.itSystem && result && result.status !== 1) {
          setItSystemError(true);
          // check to see if IT system has a status message
          if (result.statusText) setErrorMsg(result.statusText);
        }
        // update date checked time
        setSystemCheckedAt(new Date());
      }
    }
  }, [status.isSuccess, status.data]);

  // Heart Icon to Favorite or unfavorite the Resources
  const FaveHeart = () => (
    <Checkbox
      icon={<Icon icon={faHeart} />}
      checkedIcon={<Icon icon={faSolidHeart} color={Color['orange-400']} />}
      value={resource.id}
      checked={favs}
      onChange={handleChange}
      inputProps={{
        'aria-label': favoriteLabelText(favs),
      }}
    />
  );

  const closeModal = () => {
    Event('resource-warning', EventAction.resourceWarning.modalClosed);
    close();
  };

  // Resource with click event
  const Resource = () => (
    <ListItemResourceLink
      onClick={() => {
        Event(eventCategory, eventAction);

        // if resource's IT system has an error, open the dialog box
        if (itSystemError) {
          Event('resource-warning', EventAction.resourceWarning.modalOpened);
          open();
        }
        // else, open link
        else {
          window.open(resource.link);
          close();
        }
        if (!resource.excludeTrending) {
          TrendingEvent(resource, user.data);
        }
      }}
    >
      {IconLookup(resource.iconName, themeContext.features.resources.icon.color)}
      <ListItemContentLinkName>{resource.title}</ListItemContentLinkName>
      {itSystemError && (
        <Icon
          fontSize={fontSize[18]}
          icon={faExclamationCircleSolid}
          color={themeContext.features.itStatus.item.icon.partialOutage}
          data-testid="warning-icon"
          className="warning-icon"
        />
      )}
    </ListItemResourceLink>
  );

  const OutageDialog = () => (
    <MyDialog
      isOpen={showDialog}
      onDismiss={closeModal}
      aria-labelledby="message-title"
      style={{ marginTop: '30vh' }}
    >
      <CloseButton onClick={closeModal} />
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
          {resource.title} •{' '}
          {systemCheckedAt.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          }) +
            ' on ' +
            Helpers.format(systemCheckedAt)}
        </DateContainer>
        <p>{errorMsg}.</p>
      </MyDialogContent>
      <MyDialogFooter style={{ marginTop: '0' }}>
        <ExternalLink
          href={resource.link}
          onClick={() => {
            close();
            Event('resource-warning', EventAction.resourceWarning.resourceAccessed);
          }}
        >
          Continue to resource
        </ExternalLink>
      </MyDialogFooter>
    </MyDialog>
  );

  if (!draggable) {
    return (
      <>
        <ListItemFlex>
          <Resource />
          <FaveHeart />
        </ListItemFlex>
        {showDialog && <OutageDialog />}
      </>
    );
  } else {
    /**
     * Allows a resource to be Draggable
     * Requires several other components to work. See FavoriteResources.tsx
     */
    return (
      <>
        <Draggable key={resource.id} draggableId={resource.id} index={index}>
          {(provided) => (
            <ListItemFlex
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Icon
                icon={faGripLines}
                color={themeContext.features.resources.dragIcon.color}
                style={{ marginLeft: '5px' }}
              />
              <Resource />
              <FaveHeart />
            </ListItemFlex>
          )}
        </Draggable>
        {showDialog && <OutageDialog />}
      </>
    );
  }
};

export { ResourceItem };

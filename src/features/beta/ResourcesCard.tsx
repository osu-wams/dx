import React, { FC, useContext } from 'react';
import Icon from '../../ui/Icon';
import {
  faCogs,
  faUserHeadset,
  faCommentAltLines,
  faExternalLink
} from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardIcon, CardFooter } from '../../ui/Card';
import { List, ListItem, ListItemText, ListItemContentLink, ListItemContentLinkName } from '../../ui/List';
import { Event } from '../../util/gaTracking';
import Url from '../../util/externalUrls.data';
import { ThemeContext } from '../../theme';

const BetaResources: FC = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <Card collapsing={false}>
      <CardHeader title="Beta Resources" badge={<CardIcon icon={faCogs} />} />
      <CardContent>
        <List>
          <ListItem>
            <ListItemContentLink
              href={Url.feedback.main}
              target="_blank"
              onClick={() => Event('beta', 'feedback')}
            >
              <Icon
                icon={faCommentAltLines}
                color={themeContext.features.beta.resources.icon.color}
              />
              <ListItemText>
                <ListItemContentLinkName>Give us feedback on the beta</ListItemContentLinkName>
              </ListItemText>
            </ListItemContentLink>
          </ListItem>
          <ListItem>
            <ListItemContentLink
              href={Url.support.main}
              target="_blank"
              onClick={() => Event('beta', 'get help')}
            >
              <Icon icon={faUserHeadset} color={themeContext.features.beta.resources.icon.color} />
              <ListItemText>
                <ListItemContentLinkName>Get help with the dashboard</ListItemContentLinkName>
              </ListItemText>
            </ListItemContentLink>
          </ListItem>
          <ListItem>
            <ListItemContentLink
              href={Url.myosu.main}
              target="_blank"
              onClick={() => Event('beta', 'old my osu')}
            >
              <Icon icon={faExternalLink} color={themeContext.features.beta.resources.icon.color} />
              <ListItemText>
                <ListItemContentLinkName>Go back to the old MyOSU portal</ListItemContentLinkName>
              </ListItemText>
            </ListItemContentLink>
          </ListItem>
        </List>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default BetaResources;

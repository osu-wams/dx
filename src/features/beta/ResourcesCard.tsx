import React, { FC } from 'react';
import Icon from '../../ui/Icon';
import {
  faCogs,
  faUserHeadset,
  faCommentAltLines,
  faExternalLink
} from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardIcon, CardFooter } from '../../ui/Card';
import { Color } from '../../theme';
import { List, ListItem, ListItemHeader, ListItemText, ListItemContentLink } from '../../ui/List';
import { Event } from '../../util/gaTracking';
import Url from '../../util/externalUrls.data';

const BetaResources: FC = () => {
  return (
    <Card collapsing={false}>
      <CardHeader title="Beta Resources" badge={<CardIcon icon={faCogs} />} />
      <CardContent>
        <List>
          <ListItem>
            <ListItemContentLink
              href="https://beav.es/dx-form"
              onClick={() => Event('beta', 'feedback')}
            >
              <Icon icon={faCommentAltLines} color={Color['orange-400']} />
              <ListItemText>
                <ListItemHeader>Give us feedback on the beta</ListItemHeader>
              </ListItemText>
            </ListItemContentLink>
          </ListItem>
          <ListItem>
            <ListItemContentLink
              href="https://beav.es/dx-form"
              onClick={() => Event('beta', 'get help')}
            >
              <Icon icon={faUserHeadset} color={Color['orange-400']} />
              <ListItemText>
                <ListItemHeader>Get help with the dashboard</ListItemHeader>
              </ListItemText>
            </ListItemContentLink>
          </ListItem>
          <ListItem>
            <ListItemContentLink
              href={Url.myosu.main}
              target="_blank"
              onClick={() => Event('beta', 'old my osu')}
            >
              <Icon icon={faExternalLink} color={Color['orange-400']} />
              <ListItemText>
                <ListItemHeader>Go back to the old MyOSU portal</ListItemHeader>
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

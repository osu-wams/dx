import React, { FC } from 'react';
import Icon from '../../ui/Icon';
import { faCogs, faUserHeadset, faCommentAltLines, faExternalLink } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardIcon } from '../../ui/Card';
import { Color } from '../../theme';
import { List, ListItem, ListItemHeader, ListItemText, ListItemContentLink } from '../../ui/List';

const BetaResources: FC = () => {
  return (
    <Card>
      <CardHeader
        title="Beta Resources"
        badge={<CardIcon icon={faCogs} />}
      />
      <CardContent>
        <List>
          <ListItem>
            <ListItemContentLink href="#CHANGE-WHEN-READY">
              <Icon icon={faCommentAltLines} color={Color["orange-400"]} />
              <ListItemText>
                <ListItemHeader>Give us feedback on the beta</ListItemHeader>
              </ListItemText>
            </ListItemContentLink>
          </ListItem>
          <ListItem>
            <ListItemContentLink href="#CHANGE-WHEN-READY">
              <Icon icon={faUserHeadset} color={Color["orange-400"]} />
              <ListItemText>
                <ListItemHeader>Get help with the dashboard</ListItemHeader>
              </ListItemText>
            </ListItemContentLink>
          </ListItem>
          <ListItem>
            <ListItemContentLink href="https://myosu.oregonstate.edu/" target="_blank">
              <Icon icon={faExternalLink} color={Color["orange-400"]} />
              <ListItemText>
                <ListItemHeader>Go back to the old MyOSU portal</ListItemHeader>
              </ListItemText>
            </ListItemContentLink>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default BetaResources;

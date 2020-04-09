import React, { FC, useContext } from 'react';
import Icon from 'src/ui/Icon';
import {
  faCogs,
  faUserHeadset,
  faCommentAltLines,
  faExternalLink,
} from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardIcon, CardFooter } from 'src/ui/Card';
import {
  List,
  ListItem,
  ListItemText,
  ListItemContentLinkSVG,
  ListItemContentLinkName,
} from 'src/ui/List';
import { Event } from 'src/util/gaTracking';
import Url from 'src/util/externalUrls.data';
import { ThemeContext } from 'src/theme';

const BetaResources: FC = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <Card collapsing={false}>
      <CardHeader title="Beta Resources" badge={<CardIcon icon={faCogs} />} />
      <CardContent>
        <List>
          <ListItem>
            <ListItemContentLinkSVG
              href={Url.feedback.main}
              target="_blank"
              onClick={() => Event('beta', 'feedback')}
            >
              <Icon icon={faCommentAltLines} color={themeContext.ui.list.item.link.color} />
              <ListItemText>
                <ListItemContentLinkName>Give us feedback on the beta</ListItemContentLinkName>
              </ListItemText>
            </ListItemContentLinkSVG>
          </ListItem>
          <ListItem>
            <ListItemContentLinkSVG
              href={Url.support.main}
              target="_blank"
              onClick={() => Event('beta', 'get help')}
            >
              <Icon icon={faUserHeadset} color={themeContext.ui.list.item.link.color} />
              <ListItemText>
                <ListItemContentLinkName>Get help with the dashboard</ListItemContentLinkName>
              </ListItemText>
            </ListItemContentLinkSVG>
          </ListItem>
          <ListItem>
            <ListItemContentLinkSVG
              href={Url.myosu.main}
              target="_blank"
              onClick={() => Event('beta', 'old my osu')}
            >
              <Icon icon={faExternalLink} color={themeContext.ui.list.item.link.color} />
              <ListItemText>
                <ListItemContentLinkName>Go back to the old MyOSU portal</ListItemContentLinkName>
              </ListItemText>
            </ListItemContentLinkSVG>
          </ListItem>
        </List>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default BetaResources;

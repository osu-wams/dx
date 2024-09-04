import React, { FC, useContext } from 'react';
import { ThemeContext } from 'styled-components/macro';
import Icon from 'src/ui/Icon';
import {
  faCogs,
  faUserHeadset,
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
import { Url } from '@osu-wams/utils';

const SupportResources: FC = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <Card collapsing={false}>
      <CardHeader title="Support Resources" badge={<CardIcon icon={faCogs} />} />
      <CardContent>
        <List>
          <ListItem>
            <ListItemContentLinkSVG
              href={Url.support.main}
              target="_blank"
              onClick={() => Event('about', 'get help')}
            >
              <Icon icon={faUserHeadset} color={themeContext.ui.list.item.link.color} />
              <ListItemText>
                <ListItemContentLinkName>Get help with MyOregonState</ListItemContentLinkName>
              </ListItemText>
            </ListItemContentLinkSVG>
          </ListItem>
        </List>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default SupportResources;

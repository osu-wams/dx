import React, { useContext } from 'react';
import { faFileAlt } from '@fortawesome/pro-light-svg-icons';
import { format } from 'date-fns';
import {
  CardSection,
  SectionHeader,
  NoItems,
  NoItemsImage,
  NoItemsText
} from './ScheduleCardStyles';
import { UserContext } from '../../App';
import Url from '../../util/externalUrls.data';
import Icon from '../../ui/Icon';
import { Color } from '../../theme';
import assignment from '../../assets/assignment.svg';
import {
  List,
  ListItem,
  ListItemHeader,
  ListItemDescription,
  ListItemText,
  ListItemContentLink
} from '../../ui/List';
import { AuthorizeCanvasCompact } from '../canvas/AuthorizeCanvasCompact';

const ScheduleCardAssignments = ({ selectedPlannerItems }) => {
  const user = useContext<any>(UserContext);

  return (
    <CardSection>
      <SectionHeader>Assignments</SectionHeader>
      <List>
        {user.isCanvasOptIn !== undefined && !user.isCanvasOptIn && <AuthorizeCanvasCompact />}
        {user.isCanvasOptIn &&
          selectedPlannerItems.length > 0 &&
          selectedPlannerItems.map(
            ({ plannable_id, html_url, plannable_type, plannable: { title, due_at } }) => (
              <ListItem key={plannable_id}>
                <ListItemContentLink href={Url.canvas.main + html_url}>
                  <Icon icon={faFileAlt} color={Color['orange-200']} />
                  <ListItemText>
                    <ListItemHeader>{title} </ListItemHeader>
                    <ListItemDescription>
                      {plannable_type !== 'announcement'
                        ? `Due today at ${format(due_at, 'h:mma')}`
                        : ''}
                    </ListItemDescription>
                  </ListItemText>
                </ListItemContentLink>
              </ListItem>
            )
          )}
        {user.isCanvasOptIn && selectedPlannerItems.length === 0 && (
          <NoItems>
            <NoItemsImage src={assignment} alt="" />
            <NoItemsText>No Canvas assignments due today</NoItemsText>
          </NoItems>
        )}
      </List>
    </CardSection>
  );
};

export { ScheduleCardAssignments };

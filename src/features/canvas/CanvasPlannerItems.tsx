import React from 'react';
import { faFileEdit } from '@fortawesome/pro-light-svg-icons';
import { ThemeContext } from 'styled-components/macro';
import { Types } from '@osu-wams/lib';
import Icon from 'src/ui/Icon';
import {
  ListItem,
  ListItemContentLink,
  ListItemContent,
  ListItemDescription,
  ListItemHeader,
  ListItemText,
} from 'src/ui/List';
import { courseCodeOrIcon } from 'src/features/Courses';
import { format } from 'src/util/helpers';
import Url from 'src/util/externalUrls.data';
import { Event } from 'src/util/gaTracking';

/**
 * Some Canvas link include the full path including https://instructure...
 * Check to see if that data is included, and if so don't prepend it.
 * If that's not there we add that ourselves. (Most links don't have it)
 */
export const canvasUrl = (url) => {
  if (!url) {
    return Url.canvas.main;
  }
  if (url.startsWith(Url.canvas.main) || url.startsWith(Url.canvas.test)) {
    return url;
  } else {
    return Url.canvas.main + url;
  }
};

export const CanvasPlannerItems = ({
  data,
  courses,
}: {
  data: Types.PlannerItem[];
  courses: Types.CourseSchedule[];
}) => {
  const themeContext = React.useContext(ThemeContext);

  const PlannerText = ({ title, plannable_type, plannable_date }) => (
    <ListItemText>
      <ListItemHeader>{title}</ListItemHeader>
      <ListItemDescription>
        {/* Announcements from Canvas should not display a due date */}
        {plannable_type &&
          plannable_date &&
          plannable_type !== 'announcement' &&
          `Due ${format(plannable_date, 'dueAt')}`}
      </ListItemDescription>
    </ListItemText>
  );

  const PlannerIcon = () => (
    <Icon
      icon={faFileEdit}
      color={themeContext.features.academics.courses.plannerItems.list.icon.color}
    />
  );

  return (
    <>
      {data.map(
        ({
          context_name,
          plannable_id,
          plannable_type,
          plannable_date,
          html_url,
          plannable: { title },
        }) => (
          <ListItem key={plannable_id}>
            {html_url ? (
              <ListItemContentLink
                href={canvasUrl(html_url)}
                target="_blank"
                onClick={() =>
                  Event('planner-items', 'Canvas planner item click', canvasUrl(html_url))
                }
              >
                {courseCodeOrIcon(context_name, courses, <PlannerIcon />)}
                <PlannerText
                  title={title}
                  plannable_type={plannable_type}
                  plannable_date={plannable_date}
                />
              </ListItemContentLink>
            ) : (
              /* Some canvas items have no url assigned to them */
              <ListItemContent>
                {courseCodeOrIcon(context_name, courses, <PlannerIcon />)}
                <PlannerText
                  title={title}
                  plannable_type={plannable_type}
                  plannable_date={plannable_date}
                />
              </ListItemContent>
            )}
          </ListItem>
        )
      )}
    </>
  );
};

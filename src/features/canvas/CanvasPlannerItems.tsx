import React from 'react';
import { faFileEdit } from '@fortawesome/pro-light-svg-icons';
import { ThemeContext } from 'styled-components/macro';
import { Types } from '@osu-wams/lib';
import Icon from 'src/ui/Icon';
import {
  ListItemContentLink,
  ListItemContent,
  ListItemDescription,
  ListItemHeader,
  ListItemText,
  ListItemFlex,
} from 'src/ui/List';
import { courseCodeOrIcon } from 'src/features/Courses';
import { format } from 'src/util/helpers';
import Url from 'src/util/externalUrls.data';
import { Event } from 'src/util/gaTracking';
import { Bubble } from 'src/ui/Bubble';

/**
 * Some Canvas link include the full path including https://instructure...
 * Check to see if that data is included, and if so don't prepend it.
 * If that's not there we add that ourselves. (Most links don't have it)
 */
export const canvasUrl = (url) => {
  if (!url) {
    return Url.canvas.main;
  }
  // Old canvas url is replaced with the new format
  if (url.startsWith(Url.canvas.mainOld)) {
    const newUrl = url.replace(Url.canvas.mainOld, Url.canvas.main);
    return newUrl;
  }
  // Canvas url is correctly formed or legacy url for dev.dx
  if (
    url.startsWith(Url.canvas.main) ||
    url.startsWith(Url.canvas.betaOld) ||
    url.startsWith(Url.canvas.testOld)
  ) {
    return url;
  } else {
    return Url.canvas.main + url;
  }
};

// removes underscores from plannable_type
const replaceUnderScore = (val: string) => {
  return val.replaceAll('_', ' ');
};

/* Announcements from Canvas should not display a due date */
const dateItem = (type, date) => {
  if (!date || type === 'announcement') {
    return;
  }

  if (type && date) {
    if (type === 'calendar_event') {
      return format(date);
    } else {
      return `Due ${format(date, 'dueAt')}`;
    }
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
      <ListItemDescription>{dateItem(plannable_type, plannable_date)}</ListItemDescription>
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
          <ListItemFlex key={plannable_id}>
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
                <Bubble>{replaceUnderScore(plannable_type)}</Bubble>
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
                <Bubble>{replaceUnderScore(plannable_type)}</Bubble>
              </ListItemContent>
            )}
          </ListItemFlex>
        )
      )}
    </>
  );
};

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
import { Canvas, Course } from '@osu-wams/utils';
import { Event } from 'src/util/gaTracking';
import { Bubble } from 'src/ui/Bubble';

// removes underscores from plannable_type
const replaceUnderScore = (val: string) => {
  return val.replace('_', ' ');
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
        {Course.plannerItemDate(plannable_type, plannable_date)}
      </ListItemDescription>
    </ListItemText>
  );

  const PlannerIcon = () => (
    <Icon
      data-testid="planner-icon"
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
          <ListItemFlex key={plannable_id} hoverable={typeof html_url !== 'undefined'}>
            {html_url ? (
              <ListItemContentLink
                href={Canvas.canvasUrl(html_url)}
                target="_blank"
                onClick={() =>
                  Event('planner-items', 'Canvas planner item click', Canvas.canvasUrl(html_url))
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

import React from 'react';
import { List } from 'src/ui/List';
import { Event } from 'src/util/gaTracking';
import { Types } from '@osu-wams/lib';
import { Helpers } from '@osu-wams/utils';
import { ResourceItem } from './ResourceItem';

const ResourcesList: React.FC<{ resources: Types.Resource[]; user: Types.User }> = ({
  resources,
}) => {
  return (
    <div id="resourcesResults" data-testid="resourcesResults" aria-live="polite" aria-atomic="true">
      {`found ${resources?.length} ${Helpers.singularPlural(resources?.length, 'result')}`}
      <List>
        {resources.length > 0 &&
          resources.map((resource: Types.Resource) => (
            <ResourceItem
              key={resource.id}
              resource={resource}
              eventCategory="resource"
              eventAction={resource.title}
            />
          ))}
      </List>
    </div>
  );
};

export default ResourcesList;

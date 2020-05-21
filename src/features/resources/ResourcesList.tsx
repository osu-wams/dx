import React from 'react';
import { List } from 'src/ui/List';
import { Event } from 'src/util/gaTracking';
import { singularPlural } from 'src/util/helpers';
import { Types } from '@osu-wams/lib';
import { ResourceItem } from './ResourceItem';
import { useRecoilValue, useRecoilState, selectorFamily } from 'recoil';
import { resourcesState, resourceSearch } from './resources-recoil';

const ResourcesList: React.FC<{ user: Types.User }> = () => {
  const resources = useRecoilValue(resourceSearch);
  return (
    <div id="resourcesResults" data-testid="resourcesResults" aria-live="polite" aria-atomic="true">
      {`found ${resources?.length} ${singularPlural(resources?.length, 'result')}`}
      <List>
        {(resources?.length ?? 0) > 0 &&
          resources.map((resource: Types.Resource) => (
            <ResourceItem
              key={resource.id}
              resource={resource}
              event={() => Event('resource', resource.title)}
            />
          ))}
      </List>
    </div>
  );
};

export default ResourcesList;

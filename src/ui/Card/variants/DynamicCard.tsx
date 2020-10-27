import React, { useContext } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from 'src/ui/Card';
import { List } from 'src/ui/List';
import { ResourceItem } from 'src/features/resources//ResourceItem';
import { Types } from '@osu-wams/lib';
import { Event } from 'src/util/gaTracking';
import { RichTextContent } from 'src/ui/RichText';
import { ExternalLink } from 'src/ui/Link';
import { IconLookup } from 'src/features/resources/resources-utils';
import { ThemeContext } from 'styled-components/macro';

const DynamicCard: React.FC<{ data: Types.DynamicCard }> = ({ data }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <Card key={data.id}>
      <CardHeader>
        {/* Matches the styles in CardIcon.tsx */}
        <span style={{ fontSize: '24px', marginRight: '12px' }}>
          {IconLookup(data.icon || 'bobross', themeContext.ui.card.icon.color)}
        </span>
        {data.title}
      </CardHeader>
      <CardContent>
        {data.body && (
          <RichTextContent dangerouslySetInnerHTML={{ __html: data.body }}></RichTextContent>
        )}
        {data.resources && data.resources.length > 0 && (
          <List>
            {data.resources
              .map((r: Types.Resource | string) => {
                if (typeof r === 'string') return null;
                return (
                  <ResourceItem
                    key={r.id}
                    resource={r}
                    event={() => Event('dynamic-card', 'resource', r.title)}
                  />
                );
              })
              .filter(Boolean)}
          </List>
        )}
      </CardContent>
      <CardFooter infoButtonId={data.infoButtonId}>
        {data.link && data.linkText && (
          <ExternalLink
            href={data.link}
            onClick={() => Event('dynamic-card', 'footer link', data.link)}
          >
            {data.linkText}
          </ExternalLink>
        )}
      </CardFooter>
    </Card>
  );
};

export { DynamicCard };

import React, { useContext } from 'react';
import { faFlag } from '@fortawesome/pro-light-svg-icons';
import styled, { ThemeContext } from 'styled-components/macro';
import { CardContentCell } from 'src/ui/Card';
import { Event } from 'src/util/gaTracking';
import { ExternalLink } from 'src/ui/Link';
import Url from 'src/util/externalUrls.data';
import { ListItem } from 'src/ui/List';
import { fontSize } from 'src/theme';
import { format } from 'src/util/helpers';
import Icon from 'src/ui/Icon';
import { ICachetComponent, ICachetIncident } from '@osu-wams/hooks/dist/api/status';
import VisuallyHidden from '@reach/visually-hidden';

const Header = styled.div`
  display: flex;
`;

const Badge = styled.span`
  background-color: ${({ theme }) => theme.features.itStatus.sticky.badge.background};
  color: ${({ theme }) => theme.features.itStatus.sticky.badge.color};
  font-size: ${fontSize[12]};
  vertical-align: middle;
  padding: 3px 6px;
  border-radius: 4px;
  margin: 0px 10px;
  font-weight: bold;
  text-decoration: none;
  height: 22px;
  white-space: nowrap;
`;

const Title = styled.strong`
  color: ${({ theme }) => theme.features.itStatus.sticky.title.color};
`;

const Date = styled.div`
  padding-left: 34px;
  width: 100%;
  color: ${({ theme }) => theme.features.itStatus.sticky.date.color};
`;

const Message = styled.div`
  padding-left: 34px;
  width: 100%;
  color: ${({ theme }) => theme.features.itStatus.sticky.message.color};
`;

const ITSystemSticky: React.FC<{ components: ICachetComponent[] }> = ({ components }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <CardContentCell>
      {components.map((c: ICachetComponent) =>
        c.incidents.map((i: ICachetIncident) => (
          <ListItem spaced key={i.id}>
            <Header>
              <Icon
                fontSize={fontSize[24]}
                icon={faFlag}
                color={themeContext.features.itStatus.sticky.icon.color}
              />
              <Badge data-testid="sticky-incident-badge">{c.name}</Badge>
              <Title>{i.name}</Title>
            </Header>
            <Date>{format(i.updatedAt, 'h:mmaaaa, ccc, LLL Lo')}</Date>
            <Message>{i.message}</Message>
          </ListItem>
        ))
      )}
      <ExternalLink
        style={{ float: 'right', paddingTop: '16px' }}
        href={Url.itSystemStatus.main}
        onClick={() => Event('it-system-status-sticky', `view IT system status sticky link`)}
      >
        View details <VisuallyHidden>about IT incidents</VisuallyHidden>
      </ExternalLink>
    </CardContentCell>
  );
};

export { ITSystemSticky };

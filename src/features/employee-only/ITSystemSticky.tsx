import React, { useContext } from 'react';
import { faFlag } from '@fortawesome/pro-light-svg-icons';
import { CardContentCell } from '../../ui/Card';
import { Event } from '../../util/gaTracking';
import { ExternalLink } from '../../ui/Link';
import Url from '../../util/externalUrls.data';
import { ICachetIncident, ICachetComponent } from '../../api/status';
import { ListItem } from '../../ui/List';
import { themeSettings, ThemeContext, styled } from '../../theme';
import { format } from '../../util/helpers';
import Icon from '../../ui/Icon';

const Header = styled.div`
  display: flex;
`;

const Badge = styled.span`
  background-color: ${({ theme }) => theme.features.itStatus.sticky.badge.background};
  color: ${({ theme }) => theme.features.itStatus.sticky.badge.color};
  font-size: ${themeSettings.fontSize[12]};
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
                fontSize={themeSettings.fontSize[24]}
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
        onClick={() => Event('it-system-status-sticky', `view it system status sticky link`)}
      >
        View details
      </ExternalLink>
    </CardContentCell>
  );
};

export { ITSystemSticky };

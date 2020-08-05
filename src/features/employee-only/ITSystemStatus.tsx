import React from 'react';
import { Loading } from 'src/ui/Loading';
import styled from 'styled-components/macro';
import { faDesktop } from '@fortawesome/pro-light-svg-icons';
import {
  Card,
  CardHeader,
  CardContentTable,
  CardContentRow,
  CardIcon,
  CardFooter,
} from 'src/ui/Card';
import { Event } from 'src/util/gaTracking';
import { ExternalLink } from 'src/ui/Link';
import Url from 'src/util/externalUrls.data';
import { ITSystemSticky } from './ITSystemSticky';
import { Status, useStatus } from '@osu-wams/hooks';
import { ITSystemItem } from './ITSystemItem';
import { breakpoints } from 'src/theme';
import operationalStatus from 'src/assets/systems-status-operational.svg';
import { EmptyState, EmptyStateImage, EmptyStateText } from 'src/ui/EmptyStates';

const AllOperational = () => (
  <EmptyState>
    <EmptyStateImage src={operationalStatus} alt="" />
    <EmptyStateText>All IT systems operating normally.</EmptyStateText>
  </EmptyState>
);

const { withStickyIncidents, sortedByStatus, allOperational } = Status;

const StatusItemRow = styled(CardContentRow)`
  flex-direction: column;
  flex-wrap: wrap;
  > li {
    flex-basis: 1;
  }
  > li:nth-child(odd) {
    border-right: 1px solid ${({ theme }) => theme.ui.card.contentCell.borderLeft};
  }
  @media (min-width: ${breakpoints.large}) {
    flex-direction: row;
    flex-wrap: wrap;
    > li {
      flex-basis: 50%;
    }
  }
`;

const ITSystemStatus = () => {
  const status = useStatus();

  return (
    <Card collapsing={false}>
      <CardHeader title="IT System Status" badge={<CardIcon icon={faDesktop} />} />
      {status.loading && <Loading lines={5} />}
      {!status.loading && (
        <CardContentTable>
          {withStickyIncidents(status.data).length > 0 && (
            <CardContentRow className="row-span-1">
              <ITSystemSticky components={withStickyIncidents(status.data)}></ITSystemSticky>
            </CardContentRow>
          )}
          {allOperational(status.data) && <AllOperational />}
          <StatusItemRow>
            {!allOperational(status.data) &&
              status.data.length &&
              sortedByStatus(status.data)
                .filter((c) => c.status > 1)
                .map((c) => <ITSystemItem key={`item-${c.id}`} component={c} />)}
          </StatusItemRow>
        </CardContentTable>
      )}
      <CardFooter infoButtonId="it-system-status">
        <ExternalLink
          href={Url.itSystemStatus.main}
          onClick={() => Event('it-system-status', `view it system status link`)}
        >
          View more at status portal
        </ExternalLink>
      </CardFooter>
    </Card>
  );
};

export { ITSystemStatus };

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
  CardHeaderSimple,
} from 'src/ui/Card';
import { Event } from 'src/util/gaTracking';
import { ExternalLink } from 'src/ui/Link';
import { Url } from '@osu-wams/utils';
import { ITSystemSticky } from './ITSystemSticky';
import { Status, useStatus } from '@osu-wams/hooks';
import { ITSystemItem } from '../it-systems-status/ITSystemItem';
import { breakpoints } from 'src/theme';

const AllOperational = () => (
  <CardHeaderSimple>
    <CardIcon icon={faDesktop} />
    <ExternalLink
      href={Url.itSystemStatus.main}
      onClick={() => Event('it-system-status', `All IT systems are operating normally`)}
    >
      All IT systems are operating normally
    </ExternalLink>
  </CardHeaderSimple>
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
  const { data, isLoading, isSuccess } = useStatus();

  return (
    <Card collapsing={false}>
      {isLoading && <Loading lines={2} />}

      {isSuccess && data && allOperational(data) && AllOperational()}

      {isSuccess && data && !allOperational(data) && (
        <>
          <CardHeader title="IT System Status" badge={<CardIcon icon={faDesktop} />} />
          <CardContentTable>
            {withStickyIncidents(data).length > 0 && (
              <CardContentRow className="row-span-1">
                <ITSystemSticky components={withStickyIncidents(data)}></ITSystemSticky>
              </CardContentRow>
            )}

            <StatusItemRow>
              {!allOperational(data) &&
                data.length &&
                sortedByStatus(data)
                  .filter((c) => c.status > 1)
                  .map((c) => <ITSystemItem key={`item-${c.id}`} component={c} />)}
            </StatusItemRow>
          </CardContentTable>
          <CardFooter infoButtonId="it-system-status">
            <ExternalLink
              href={Url.itSystemStatus.main}
              onClick={() => Event('it-system-status', `view it system status link`)}
            >
              View more at status portal
            </ExternalLink>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export { ITSystemStatus };

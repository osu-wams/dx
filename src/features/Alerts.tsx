import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/macro';
import {
  faExclamationTriangle,
  faCommentAltExclamation,
  faInfoCircle,
  IconDefinition,
} from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, Badge } from 'src/ui/Card';
import Icon from 'src/ui/Icon';
import { Helpers } from '@osu-wams/utils';
import { Types } from '@osu-wams/lib';
import { useDxAlerts, useRaveAlerts } from '@osu-wams/hooks';
import { fontSize, breakpoints } from '@osu-wams/theme';

const AlertWrapper = styled.div`
  width: 100%;
  font-size: ${fontSize[14]};
  padding: 0;
  > div {
    margin-bottom: 0 !important;
  }
`;
const AlertCardWrapper = styled(Card)`
  width: 100%;
  max-width: ${breakpoints.large};
  background-color: ${({ theme }) => theme.alert.background};
  box-shadow: none;
  margin: 0 auto;
  padding: 1rem 1.6rem !important;
`;
const RaveAlertCard = styled(Card)`
  background-color: ${({ theme }) => theme.alert.rave.background};
  color: ${({ theme }) => theme.alert.rave.color};
  border-radius: 0;
`;
const DxInfoAlertCard = styled(RaveAlertCard)`
  background-color: ${({ theme }) => theme.alert.dx.info.background};
  color: ${({ theme }) => theme.alert.dx.info.color};
`;
const DxWarnAlertCard = styled(RaveAlertCard)`
  background-color: ${({ theme }) => theme.alert.dx.warn.background};
  color: ${({ theme }) => theme.alert.dx.warn.color};
`;
const AlertHeader = styled(CardHeader)`
  border-bottom: none;
  padding: 0;
  height: auto;
  span {
    font-size: ${fontSize[24]};
  }
`;
const AlertContent = styled(CardContent)`
  font-weight: 300;
  padding: 0 1.6rem 0 4.5rem;
  p {
    margin-top: 0;
  }
`;

interface IconProps {
  icon: IconDefinition;
  color: string;
}

/**
 * Alerts
 * Alerts from  university-wide system Rave, and from DX API in Drupal
 */
const Alerts = () => {
  const raveAlerts = useRaveAlerts();
  const dxAlerts = useDxAlerts();
  const themeContext = useContext(ThemeContext);

  const cardBody = (alert: Types.Alert, iconProps: IconProps): JSX.Element => (
    <AlertCardWrapper>
      <AlertHeader
        title={alert.title}
        badge={
          <Badge bg={themeContext.alert.header.badge.background}>
            <Icon {...iconProps} size="2x" />
          </Badge>
        }
      />
      <AlertContent>
        <p>
          {Helpers.format(alert.updated)}: {alert.content ?? ''}
        </p>
      </AlertContent>
    </AlertCardWrapper>
  );

  const alertCard = (alert: Types.Alert): JSX.Element => {
    switch (alert.type) {
      case 'rave':
        return (
          <RaveAlertCard>
            {cardBody(alert, {
              icon: faExclamationTriangle,
              color: themeContext.alert.rave.icon.color,
            })}
          </RaveAlertCard>
        );
      case 'info':
        return (
          <DxInfoAlertCard>
            {cardBody(alert, { icon: faInfoCircle, color: themeContext.alert.dx.info.icon.color })}
          </DxInfoAlertCard>
        );
      case 'warn':
        return (
          <DxWarnAlertCard>
            {cardBody(alert, {
              icon: faCommentAltExclamation,
              color: themeContext.alert.dx.warn.icon.color,
            })}
          </DxWarnAlertCard>
        );
      default:
        return <></>;
    }
  };

  if (
    (raveAlerts.isSuccess && raveAlerts.data && raveAlerts.data.length) ||
    (dxAlerts.isSuccess && dxAlerts.data && dxAlerts.data.length)
  ) {
    return (
      <AlertWrapper>
        {raveAlerts.data && raveAlerts.data[0] && alertCard(raveAlerts.data[0])}
        {dxAlerts.data && dxAlerts.data[0] && alertCard(dxAlerts.data[0])}
      </AlertWrapper>
    );
  } else {
    return <></>;
  }
};

export default Alerts;

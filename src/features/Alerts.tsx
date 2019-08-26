import React, { useState, useEffect } from 'react';
import {
  faExclamationTriangle,
  faCommentAltExclamation,
  faInfoCircle,
  IconDefinition
} from '@fortawesome/pro-light-svg-icons';
import styled from 'styled-components';
import { Card, CardHeader, CardContent, Badge } from '../ui/Card';
import Icon from '../ui/Icon';
import { formatDate } from '../util/helpers';
import { getDxAlerts, getRaveAlerts, Alert } from '../api/alerts';
import { Color, theme, breakpoints } from '../theme';

const AlertWrapper = styled.div`
  width: 100%;
  font-size: ${theme.fontSize[14]};
  padding: 0 0 1rem 0;
`;
const AlertCardWrapper = styled(Card)`
  width: 100%;
  max-width: ${breakpoints[1024]};
  background-color: transparent;
  box-shadow: none;
  margin: 0 auto;
  padding: 1rem 1.6rem !important;
`;
const RaveAlertCard = styled(Card)`
  background-color: ${Color['lava-400']};
  color: ${Color.white};
  border-radius: 0;
`;
const DxInfoAlertCard = styled(RaveAlertCard)`
  background-color: ${Color['roguewave-400']};
`;
const DxWarnAlertCard = styled(RaveAlertCard)`
  background-color: ${Color['luminance-300']};
  color: ${Color.black};
`;
const AlertHeader = styled(CardHeader)`
  border-bottom: none;
  padding: 0;
  height: auto;
  span {
    font-size: ${theme.fontSize[24]};
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
  color: Color;
}

/**
 * Alerts
 * Alerts from  university-wide system Rave, and from DX API in Drupal
 */
const Alerts = () => {
  const [raveAlerts, setRaveAlerts] = useState<Alert[]>([]);
  const [dxAlerts, setDxAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    getRaveAlerts()
      .then(setRaveAlerts)
      .catch(console.log);
    getDxAlerts()
      .then(setDxAlerts)
      .catch(console.log);
  }, []);

  const cardBody = (alert: Alert, iconProps: IconProps): JSX.Element => (
    <AlertCardWrapper>
      <AlertHeader
        title={alert.title}
        badge={
          <Badge bg={Color.transparent}>
            <Icon {...iconProps} size="2x" />
          </Badge>
        }
      />
      <AlertContent>
        <p>
          {formatDate(alert.date)}: {alert.content}
        </p>
      </AlertContent>
    </AlertCardWrapper>
  );

  const alertCard = (alert: Alert): JSX.Element => {
    switch (alert.type) {
      case 'rave':
        return (
          <RaveAlertCard>
            {cardBody(alert, { icon: faExclamationTriangle, color: Color.white })}
          </RaveAlertCard>
        );
      case 'info':
        return (
          <DxInfoAlertCard>
            {cardBody(alert, { icon: faInfoCircle, color: Color.white })}
          </DxInfoAlertCard>
        );
      case 'warn':
        return (
          <DxWarnAlertCard>
            {cardBody(alert, { icon: faCommentAltExclamation, color: Color.black })}
          </DxWarnAlertCard>
        );
      default:
        return <></>;
    }
  };

  if (raveAlerts.length || dxAlerts.length) {
    return (
      <AlertWrapper>
        {raveAlerts[0] && alertCard(raveAlerts[0])}
        {dxAlerts[0] && alertCard(dxAlerts[0])}
      </AlertWrapper>
    );
  } else {
    return <></>;
  }
};

export default Alerts;

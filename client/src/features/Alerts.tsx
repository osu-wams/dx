import React, { useState, useEffect } from 'react';
import { faExclamationCircle } from '@fortawesome/pro-light-svg-icons';
import styled from 'styled-components';
import { Card, CardHeader, CardContent, Badge } from '../ui/Card';
import Icon from '../ui/Icon';
import { formatDate } from '../util/helpers';
import { getAlerts, RaveAlert } from '../api/alerts';
import { Color, theme, breakpoints } from '../theme';

const AlertWrapper = styled.div`
  width: 100%;
  background-color: ${Color['lava-400']};
  font-size: ${theme.fontSize[14]};
  padding: 1rem 0;
`;
const AlertCard = styled(Card)`
  background-color: ${Color['lava-400']};
  box-shadow: none;
  color: ${Color.white};
  border-radius: 0;
  margin: 0 auto;
  max-width: ${breakpoints[1024]};
  padding: 0 1.6rem !important;
`;
const AlertHeader = styled(CardHeader)`
  border-bottom: none;
  padding: 0;
  height: auto;
  svg {
    color: #fff;
  }
`;
const AlertContent = styled(CardContent)`
  font-weight: 300;
  padding: 0 1.6rem 0 4.5rem;
  p {
    margin-top: 0;
  }
`;

/**
 * Rave Alerts
 * Single alert university-wide system
 */
const Alerts = () => {
  const [alert, setAlert] = useState<RaveAlert[]>([]);

  // Populate assignment data for current user
  useEffect(() => {
    getAlerts()
      .then(setAlert)
      .catch(console.log);
  }, []);

  if (alert.length) {
    return (
      <AlertWrapper>
        {console.log(alert[0].title)}
        <AlertCard>
          <AlertHeader
            title={alert[0].title}
            badge={
              <Badge bg={Color.transparent}>
                <Icon icon={faExclamationCircle} color={Color.white} size="2x" />
              </Badge>
            }
          />
          <AlertContent>
            <p>
              {formatDate(alert[0].date)}: {alert[0].content}
            </p>
          </AlertContent>
        </AlertCard>
      </AlertWrapper>
    );
  } else {
    return <></>;
  }
};

export default Alerts;

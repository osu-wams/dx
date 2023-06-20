import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/macro';
import {
  faInfoCircle,
  IconDefinition,
} from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, Badge } from 'src/ui/Card';
import Icon from 'src/ui/Icon';
import { Types } from '@osu-wams/lib';
import { fontSize, breakpoints } from '@osu-wams/theme';
import { ExternalLink, InternalLink, SimpleExternalLink } from '../ui/Link';


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
  border-radius: 1rem;
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
const RaveAlertCard = styled(Card)`
  background-color: ${({ theme }) => theme.alert.rave.background};
  color: ${({ theme }) => theme.alert.rave.color};
`;
const DxInfoAlertCard = styled(RaveAlertCard)`
  background-color: ${({ theme }) => theme.alert.dx.info.background};
  color: ${({ theme }) => theme.alert.dx.info.color};
  a {
    text-decoration: underline;
  }
`;

interface IconProps {
  icon: IconDefinition;
  color: string;
}

const BeaverhubAlert = () => {
  const themeContext = useContext(ThemeContext);
  const icon = { icon: faInfoCircle, color: themeContext.alert.dx.info.icon.color };

  // const cardBody = (alert: Types.Alert, iconProps: IconProps): JSX.Element => (
  const cardBody = (): JSX.Element => (
    <AlertCardWrapper>
      <AlertHeader
        title='Your OSU Student Portal is Moving!'
        badge={
          <Badge bg={themeContext.alert.header.badge.background}>
            <Icon { ...icon } size="2x" />
          </Badge>
        }
      />
      <AlertContent>
        <p>
        The student experience in MyOregonState is moving to <SimpleExternalLink
            href={'https://beaverhub.oregonstate.edu'}
            fg='white'
          >
            Beaver Hub
          </SimpleExternalLink>. Learn more about Beaver Hub and the new features that will be available on the <SimpleExternalLink
            href={'https://uit.oregonstate.edu/beaver-hub'}
            fg='white'
          >
            Beaver Hub website
          </SimpleExternalLink>.
        </p>
      </AlertContent>
    </AlertCardWrapper>
  );

  return (
    <DxInfoAlertCard>
      {cardBody()}
    </DxInfoAlertCard>
  );
}

export default BeaverhubAlert;

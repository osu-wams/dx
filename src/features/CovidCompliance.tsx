import React, { FC, useContext } from 'react';
import { Loading } from 'src/ui/Loading';
import styled, { ThemeContext } from 'styled-components/macro';
import { faExclamationCircle, faNotesMedical } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardIcon } from 'src/ui/Card';
import { fontSize, spacing } from '@osu-wams/theme';
import { useHasMember } from '@osu-wams/hooks';
import { ExternalLink } from 'src/ui/Link';
import { Url } from '@osu-wams/utils';
import { Event } from 'src/util/gaTracking';
import { Types } from '@osu-wams/lib';
import Icon from 'src/ui/Icon';

const VaccinationContent = styled.div({
  flex: 1,
  flexDirection: 'row',
  display: 'flex',
  paddingBottom: spacing.default,
  paddingLeft: spacing.default,
});

const VaccinationContentBody = styled.div(({ theme }) => ({
  color: theme.features.covidVaccination.content.color,
  display: 'flex',
  flexDirection: 'column',
  fontSize: fontSize['14'],
  paddingLeft: spacing.large,
  paddingRight: spacing.xl,
  paddingTop: spacing.small,
}));

const CovidCompliance: FC = () => {
  const theme = useContext(ThemeContext);
  const { isLoading, isSuccess, data: isUserInGroup } = useHasMember('covidvac-student');
  // dont render if user is part of grouper group
  if (isSuccess && !isUserInGroup) {
    return null;
  }
  return (
    <Card collapsing={false}>
      <CardHeader title="Covid Vaccination" badge={<CardIcon icon={faNotesMedical} />} />
      <CardContent>
        {isLoading && <Loading lines={5} />}
        {isSuccess && (
          <VaccinationContent>
            <Icon
              icon={faExclamationCircle}
              color={theme.features.covidVaccination.icon.nonCompliantColor}
              size={'4x'}
            />
            <VaccinationContentBody>
              <b>
                You are not in compliance with the university COVID-19 vaccination policy. Please take
                one of the following actions:
              </b>
              <ExternalLink
                href={Url.covidCompliance.getVaccinated}
                onClick={() => Event('covid-compliance', `Clicked get vaccinated`)}
              >
                • Get the vaccination
              </ExternalLink>
              <ExternalLink
                href={Url.covidCompliance.register}
                onClick={() => Event('covid-compliance', `Clicked register my vaccine`)}
              >
                • Enter your vaccine information
              </ExternalLink>
              <ExternalLink
                href={Url.covidCompliance.decline}
                onClick={() => Event('covid-compliance', `Clicked exemption form`)}
              >
                • Complete an exemption form
              </ExternalLink>
            </VaccinationContentBody>
          </VaccinationContent>
        )}
      </CardContent>
    </Card>
  );
};

export default CovidCompliance;

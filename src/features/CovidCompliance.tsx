import React, { FC, useContext } from 'react';
import { Loading } from 'src/ui/Loading';
import styled, { ThemeContext } from 'styled-components/macro';
import { faExclamationCircle, faNotesMedical } from '@fortawesome/pro-light-svg-icons';
import { Card, CardHeader, CardContent, CardIcon } from 'src/ui/Card';
import { fontSize, spacing } from '@osu-wams/theme';
import { useMedical, useCovidvacStudentState, usePerson } from '@osu-wams/hooks';
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
  const { covidvacStudent } = useCovidvacStudentState();
  const theme = useContext(ThemeContext);
  const medical = useMedical();
  const person = usePerson();
  const isLoading = medical.isLoading || person.isLoading || covidvacStudent.isLoading;
  const isSuccess = medical.isSuccess && person.isSuccess && covidvacStudent.isSuccess;
  const { data } = medical;
  // dont render if user is part of grouper group
  if (covidvacStudent.isSuccess
      && !covidvacStudent.data.find(student => student.attributes.onid === person?.data?.onid)) {
    return null;
  }
  return (
    <Card collapsing={false}>
      <CardHeader title="Covid Vaccination" badge={<CardIcon icon={faNotesMedical} />} />
      <CardContent>
        {isLoading && <Loading lines={5} />}
        {isSuccess && data && (
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

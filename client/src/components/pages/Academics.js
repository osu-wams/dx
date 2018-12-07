import React from 'react';
import Courses from '../Courses';
import PageTitle from '../layout/PageTitle';
import {
  Overview,
  OverviewHeader,
  OverviewContent,
  OverviewSection,
  OverviewItem,
  OverviewItemLabel
} from '../layout/Overview';
import UpcomingAssignments from '../UpcomingAssignments';
import ServiceCard from '../ServiceCard';

const AcademicOverview = () => {
  return (
    <Overview>
      <OverviewContent>
        <OverviewSection>
          <OverviewItem style={{ lineHeight: 1 }}>
            <OverviewItemLabel color="stratosphere">Current GPA</OverviewItemLabel>
            <span style={{ fontWeight: 'bold', fontSize: '80px' }}>3.8</span>
          </OverviewItem>
          <OverviewItem>
            <span>
              Week 10
              <br />
              Fall Term
            </span>
          </OverviewItem>
        </OverviewSection>
        <OverviewSection>
          <OverviewItem>
            <OverviewItemLabel color="stratosphere">Major</OverviewItemLabel>
            <span>Graphic Design</span>
          </OverviewItem>
          <OverviewItem>
            <OverviewItemLabel color="stratosphere">Minor</OverviewItemLabel>
            <span>French</span>
          </OverviewItem>
          <OverviewItem>
            <OverviewItemLabel color="stratosphere">Academic Standing</OverviewItemLabel>
            <span>Honor Roll</span>
          </OverviewItem>
        </OverviewSection>
      </OverviewContent>
    </Overview>
  );
};

const Academics = () => {
  return (
    <div data-testid="academics-page">
      <AcademicOverview />
      <PageTitle title="Academics" />
      <UpcomingAssignments />
      <Courses />
      <ServiceCard title="Academic Services" serviceType="academic" />
    </div>
  );
};

export default Academics;

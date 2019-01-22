import React from 'react';
import Courses from '../features/Courses';
import PageTitle from '../ui/PageTitle';
import {
  Overview,
  OverviewContent,
  OverviewSection,
  OverviewItem,
  OverviewItemLabel
} from '../ui/Overview';
import UpcomingAssignments from '../features/UpcomingAssignments';
import ServiceCard from '../features/ServiceCard';
import { DesktopGrid, MainColumn } from '../ui/DesktopGrid';

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
      <DesktopGrid>
        <MainColumn>
          <UpcomingAssignments />
          <Courses />
        </MainColumn>
        <ServiceCard title="Academic Services" serviceType="academic" />
      </DesktopGrid>
    </div>
  );
};

export default Academics;

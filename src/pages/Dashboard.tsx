import React from 'react';
import { State, User } from '@osu-wams/hooks';
import { StudentDashboard } from './Dashboard/StudentDashboard';
import { EmployeeDashboard } from './Dashboard/EmployeeDashboard';
import { useRecoilValue } from 'recoil';

const { getAffiliation, AFFILIATIONS } = User;
/**
 * Uses the user context to determine what main navigation the user is getting.
 * Defaults to student navigation
 * @returns the MainNav component based on your primary affiliation
 */
const Dashboard = () => {
  const user = useRecoilValue(State.userState);
  if (getAffiliation(user.data) === AFFILIATIONS.employee) {
    return <EmployeeDashboard />;
  } else {
    return <StudentDashboard />;
  }
};

export default Dashboard;

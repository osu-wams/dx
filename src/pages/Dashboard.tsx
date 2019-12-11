import React, { useContext } from 'react';
import { UserContext } from '../App';
import { hasPrimaryAffiliation, AFFILIATIONS } from '../api/user';
import { StudentDashboard } from './Dashboard/StudentDashboard';
import { EmployeeDashboard } from './Dashboard/EmployeeDashboard';

/**
 * Uses the user context to determine what main navigation the user is getting.
 * Defaults to student navigation
 * @returns the MainNav component based on your primary affiliation
 */
const Dashboard = () => {
  const user = useContext<any>(UserContext);
  if (hasPrimaryAffiliation(user.data, [AFFILIATIONS.employee])) {
    return <EmployeeDashboard />;
  } else {
    return <StudentDashboard />;
  }
};

export default Dashboard;

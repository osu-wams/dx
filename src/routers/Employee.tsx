import { Router } from '@reach/router';
import React from 'react';
import About from '../pages/About';
import Dashboard from '../pages/Dashboard';
import MobileCovid from '../pages/mobile-app/MobileCovid';
import Notifications from '../pages/Notifications';
import PageNotFound from '../pages/PageNotFound';
import Profile from '../pages/Profile';
import Training from '../pages/Training';
import Resources from '../pages/Resources';
import { useResetScroll } from 'src/util/useResetScroll';
import { RouterPage } from '.';

export const Employee = () => {
  useResetScroll();
  return (
    <Router basepath="/employee" key="employee-dashboard" className="router-styles">
      <RouterPage path="/" pageComponent={<Dashboard />} />
      <RouterPage path="profile" pageComponent={<Profile />} />
      <RouterPage path="resources" pageComponent={<Resources />} />
      <RouterPage path="about" pageComponent={<About />} />
      {process.env.REACT_APP_EXPERIMENTAL === 'true' && (
        <RouterPage path="training" pageComponent={<Training />} />
      )}
      <RouterPage path="notifications" pageComponent={<Notifications />} />
      <RouterPage default pageComponent={<PageNotFound />} />
      {process.env.REACT_APP_EXPERIMENTAL === 'true' && (
        <RouterPage path="covid" pageComponent={<MobileCovid />} />
      )}
    </Router>
  );
};

export default Employee;

import { Router } from '@reach/router';
import React from 'react';
import About from '../pages/About';
import Dashboard from '../pages/Dashboard';
import MobileCovid from '../pages/mobile-app/MobileCovid';
import Notifications from '../pages/Notifications';
import PageNotFound from '../pages/PageNotFound';
import Profile from '../pages/Profile';
import Academics from '../pages/Academics';
import Finances from '../pages/Finances';
import Resources from '../pages/Resources';
import { useResetScroll } from 'src/util/useResetScroll';
import { RouterPage } from '.';

export const Student = () => {
  useResetScroll();
  return (
    <Router basepath="/student" key="student-dashboard" className="router-styles">
      <RouterPage path="/" pageComponent={<Dashboard />} />
      <RouterPage path="profile" pageComponent={<Profile />} />
      <RouterPage path="academics/*" pageComponent={<Academics />} />
      <RouterPage path="finances" pageComponent={<Finances />} />
      <RouterPage path="resources" pageComponent={<Resources />} />
      <RouterPage path="about" pageComponent={<About />} />
      <RouterPage path="notifications" pageComponent={<Notifications />} />
      <RouterPage default pageComponent={<PageNotFound />} />
      {process.env.REACT_APP_EXPERIMENTAL === 'true' && (
        <RouterPage path="covid" pageComponent={<MobileCovid />} />
      )}
    </Router>
  );
};

export default Student;

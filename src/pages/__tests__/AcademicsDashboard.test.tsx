import React from 'react';
import { renderWithUserContext } from '../../util/test-utils';
import AcademicsDashboard from '../Academics/AcademicsDashboard';

describe('<AcademicsDashboard />', () => {
  it('renders without errors', async () => {
    const { getByTestId } = renderWithUserContext(<AcademicsDashboard />);
    expect(getByTestId('academics-dashboard')).toBeInTheDocument();
  });
});

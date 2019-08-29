import React from 'react';
import { renderWithUserContext } from '../../util/test-utils';
import { waitForElement } from '@testing-library/react';
import AcademicsDashboard from '../Academics/AcademicsDashboard';

describe('<AcademicsDashboard /> as a user without any data', () => {
  it('renders and finds text relating to missing data', async () => {
    const { getByText } = renderWithUserContext(<AcademicsDashboard />);
    const element = await waitForElement(() => getByText('NO ASSIGNMENTS'));
    expect(element).toBeInTheDocument();
    expect(getByText('You must first complete a term to have an overall GPA.')).toBeInTheDocument();
    expect(getByText('You have no current academic standing.')).toBeInTheDocument();
    expect(getByText('holds on your student account.')).toBeInTheDocument();
  });
});

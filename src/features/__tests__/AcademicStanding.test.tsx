import React from 'react';
import { render, alterMock } from 'src/util/test-utils';
import { screen } from '@testing-library/react';
import AcademicStanding from '../academic-overview/AcademicStanding';
import { ACADEMIC_STATUS_API } from 'src/mocks/apis';

describe('<AcademicStanding />', () => {
  it('should render and have the approriate standing', async () => {
    render(<AcademicStanding />);
    expect(await screen.findByText('Good Standing')).toBeInTheDocument();
  });

  it('should return appropriate text when data is empty', async () => {
    alterMock(ACADEMIC_STATUS_API, []);
    render(<AcademicStanding />);
    const element = await screen.findByText('You have no current academic standing.');
    expect(element).toBeInTheDocument();
  });
});

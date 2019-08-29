import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import AcademicStanding from '../academic-overview/AcademicStanding';

const mockGetAcademicStatus = jest.fn();

jest.mock('../../api/student/academic-status', () => ({
  getAcademicStatus: () => mockGetAcademicStatus()
}));

describe('<AcademicStanding />', () => {
  it('should render and have the approriate standing', async () => {
    mockGetAcademicStatus.mockResolvedValue(Promise.resolve({ academicStanding: 'Good Standing' }));
    const { getByText } = render(<AcademicStanding />);
    const element = await waitForElement(() => getByText('Good Standing'));
    expect(element).toBeInTheDocument();
  });

  it('should return appropriate text when data is empty', async () => {
    mockGetAcademicStatus.mockResolvedValue(Promise.resolve({}));
    const { getByText } = render(<AcademicStanding />);
    const element = await waitForElement(() => getByText('You have no current academic standing.'));
    expect(element).toBeInTheDocument();
  });
});

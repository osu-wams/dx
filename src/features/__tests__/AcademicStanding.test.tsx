import React from 'react';
import { waitForElement, fireEvent } from '@testing-library/react';
import { render } from '../../util/test-utils';
import AcademicStanding from '../academic-overview/AcademicStanding';
import AcademicOverview from '../AcademicOverview';
import { mockGAEvent } from '../../setupTests';

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

describe('<Academic Overview />', () => {
  it('Academic Overview has a footer that can be clicked to access My Degrees', async () => {
    const { getByText } = render(<AcademicOverview />);
    const element = await waitForElement(() => getByText('See more in MyDegrees'));
    fireEvent.click(element);
    expect(mockGAEvent).toHaveBeenCalled();
  });
});

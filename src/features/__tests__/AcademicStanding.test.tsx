import React from 'react';
import { waitForElement, fireEvent } from '@testing-library/react';
import { render } from '../../util/test-utils';
import AcademicStanding from '../academic-overview/AcademicStanding';
import AcademicOverview from '../AcademicOverview';
import { mockGAEvent } from '../../setupTests';

const mockUseAcademicStatus = jest.fn();

jest.mock('../../api/student/academic-status', () => ({
  useAcademicStatus: () => mockUseAcademicStatus()
}));

describe('<AcademicStanding />', () => {
  it('should render and have the approriate standing', async () => {
    mockUseAcademicStatus.mockReturnValue({
      data: { academicStanding: 'Good Standing' },
      loading: false,
      error: false
    });
    const { getByText } = render(<AcademicStanding />);
    const element = await waitForElement(() => getByText('Good Standing'));
    expect(element).toBeInTheDocument();
  });

  it('should return appropriate text when data is empty', async () => {
    mockUseAcademicStatus.mockReturnValue({ data: {}, loading: false, error: false });
    const { getByText } = render(<AcademicStanding />);
    const element = await waitForElement(() => getByText('You have no current academic standing.'));
    expect(element).toBeInTheDocument();
  });
});

xdescribe('<Academic Overview />', () => {
  it('Academic Overview has a footer that can be clicked to access My Degrees', async () => {
    const { getByText } = render(<AcademicOverview />);
    const element = await waitForElement(() => getByText('View more in MyDegrees'));
    fireEvent.click(element);
    expect(mockGAEvent).toHaveBeenCalled();
  });
});

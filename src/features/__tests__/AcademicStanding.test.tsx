import React from 'react';
import { waitForElement } from '@testing-library/react';
import { render } from '../../util/test-utils';
import AcademicStanding from '../academic-overview/AcademicStanding';

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

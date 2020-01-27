import React from 'react';
import { waitForElement } from '@testing-library/react';
import { render } from '../../util/test-utils';
import AcademicStanding from '../academic-overview/AcademicStanding';
import { Student } from '@osu-wams/hooks';

const mockAcademicStatus = Student.AcademicStatus.mockAcademicStatus;
const mockUseAcademicStatus = jest.fn();

jest.mock('@osu-wams/hooks', () => {
  return {
    ...jest.requireActual('@osu-wams/hooks'),
    useAcademicStatus: () => mockUseAcademicStatus()
  };
});

describe('<AcademicStanding />', () => {
  it('should render and have the approriate standing', async () => {
    mockUseAcademicStatus.mockReturnValue(mockAcademicStatus);
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

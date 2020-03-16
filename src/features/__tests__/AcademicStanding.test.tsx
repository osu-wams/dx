import React from 'react';
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
    const { findByText } = render(<AcademicStanding />);
    const element = await findByText('Good Standing');
    expect(element).toBeInTheDocument();
  });

  it('should return appropriate text when data is empty', async () => {
    mockUseAcademicStatus.mockReturnValue({ data: {}, loading: false, error: false });
    const { findByText } = render(<AcademicStanding />);
    const element = await findByText('You have no current academic standing.');
    expect(element).toBeInTheDocument();
  });
});

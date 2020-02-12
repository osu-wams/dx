import React from 'react';
import { waitForElement } from '@testing-library/react';
import { render } from '../../util/test-utils';
import StudentGpa from '../academic-overview/StudentGpa';
import { Student } from '@osu-wams/hooks';

const { gpaHookData, gpaUndergraduateData } = Student.Gpa.mockGpa;
const { gpaInitialState } = Student.Gpa;
const mockUseStudentGpa = jest.fn();

jest.mock('@osu-wams/hooks', () => {
  return {
    ...jest.requireActual('@osu-wams/hooks'),
    useGpa: () => mockUseStudentGpa()
  };
});

describe('<StudentGpa />', () => {
  it('should render and have the approriate standing for a Graduate', async () => {
    mockUseStudentGpa.mockReturnValue(gpaHookData);
    const { getByText, queryByText } = render(<StudentGpa />);
    const element = await waitForElement(() => getByText('3.81'));
    expect(element).toBeInTheDocument();
    const undergraduateText = queryByText('Undergraduate GPA across all past terms.');
    expect(undergraduateText).not.toBeInTheDocument();
    expect(getByText('Graduate GPA across all past terms.')).toBeInTheDocument();
    expect(getByText('Institutional GPA')).toBeInTheDocument();
  });

  it('should render and have the approriate standing for an Undergraduate', async () => {
    mockUseStudentGpa.mockReturnValue({ ...gpaHookData, data: gpaUndergraduateData });
    const { getByText, queryByText } = render(<StudentGpa />);
    const element = await waitForElement(() => getByText('3.1'));
    expect(element).toBeInTheDocument();
    const graduateText = queryByText('Graduate GPA across all past terms.');
    expect(graduateText).not.toBeInTheDocument();
    expect(getByText('Undergraduate GPA across all past terms.')).toBeInTheDocument();
    expect(getByText('Institutional GPA')).toBeInTheDocument();
  });

  it('should return appropriate text when data is empty', async () => {
    mockUseStudentGpa.mockReturnValue({ ...gpaHookData, data: gpaInitialState });
    const { getByText } = render(<StudentGpa />);
    const element = await waitForElement(() =>
      getByText('You must first complete a term to have a GPA.')
    );
    expect(element).toBeInTheDocument();
  });
});

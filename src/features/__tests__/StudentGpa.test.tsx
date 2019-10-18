import React from 'react';
import { waitForElement } from '@testing-library/react';
import { render } from '../../util/test-utils';
import StudentGpa from '../academic-overview/StudentGpa';
import { gpaData, gpaUndergraduateData } from '../../api/student/__mocks__/gpa.data';
import { gpaInitialState } from '../../api/student/gpa';

const mockUseStudentGpa = jest.fn();

jest.mock('../../api/student/gpa', () => ({
  useGpa: () => mockUseStudentGpa()
}));

describe('<StudentGpa />', () => {
  it('should render and have the approriate standing for a Graduate', async () => {
    mockUseStudentGpa.mockReturnValue({ data: gpaData, loading: false, error: false });
    const { getByText, queryByText } = render(<StudentGpa />);
    const element = await waitForElement(() => getByText('3.81'));
    expect(element).toBeInTheDocument();
    const undergraduateText = queryByText('Undergraduate GPA across all past terms.');
    expect(undergraduateText).not.toBeInTheDocument();
    expect(getByText('Graduate GPA across all past terms.')).toBeInTheDocument();
    expect(getByText('Institutional GPA')).toBeInTheDocument();
  });

  it('should render and have the approriate standing for an Undergraduate', async () => {
    mockUseStudentGpa.mockReturnValue({ data: gpaUndergraduateData, loading: false, error: false });
    const { getByText, queryByText } = render(<StudentGpa />);
    const element = await waitForElement(() => getByText('3.1'));
    expect(element).toBeInTheDocument();
    const graduateText = queryByText('Graduate GPA across all past terms.');
    expect(graduateText).not.toBeInTheDocument();
    expect(getByText('Undergraduate GPA across all past terms.')).toBeInTheDocument();
    expect(getByText('Institutional GPA')).toBeInTheDocument();
  });

  it('should return appropriate text when data is empty', async () => {
    mockUseStudentGpa.mockReturnValue({ data: gpaInitialState, loading: false, error: false });
    const { getByText } = render(<StudentGpa />);
    const element = await waitForElement(() =>
      getByText('You must first complete a term to have a GPA.')
    );
    expect(element).toBeInTheDocument();
  });
});

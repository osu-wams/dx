import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import StudentGpa from '../academic-overview/StudentGpa';

const mockGetStudentGpa = jest.fn();

jest.mock('../../api/student/gpa', () => ({
  getGpa: () => mockGetStudentGpa()
}));

describe('<StudentGpa />', () => {
  it('should render and have the approriate standing', async () => {
    mockGetStudentGpa.mockResolvedValue(Promise.resolve({ gpa: 3.69 }));
    const { getByText } = render(<StudentGpa />);
    const element = await waitForElement(() => getByText('3.69'));
    expect(element).toBeInTheDocument();
    expect(getByText('GPA across all past terms.')).toBeInTheDocument();
  });

  it('should return appropriate text when data is empty', async () => {
    mockGetStudentGpa.mockResolvedValue(Promise.resolve({}));
    const { getByText } = render(<StudentGpa />);
    const element = await waitForElement(() =>
      getByText('You must first complete a term to have an overall GPA.')
    );
    expect(element).toBeInTheDocument();
  });
});

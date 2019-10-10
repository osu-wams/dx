import React from 'react';
import { waitForElement } from '@testing-library/react';
import { render } from '../../util/test-utils';
import StudentGpa from '../academic-overview/StudentGpa';

const mockUseStudentGpa = jest.fn();

jest.mock('../../api/student/gpa', () => ({
  useGpa: () => mockUseStudentGpa()
}));

describe('<StudentGpa />', () => {
  it('should fetch data from cache then render the appropriate standing', async () => {
    mockUseStudentGpa.mockReturnValue({ data: { gpa: '3.69' }, loading: false, error: false });
    Storage.prototype.getItem = (key: string) => JSON.stringify({ data: { gpa: '3.69' } });
    const { getByText } = render(<StudentGpa />);
    const element = await waitForElement(() => getByText('3.69'));
    expect(element).toBeInTheDocument();
    expect(getByText('GPA across all past terms.')).toBeInTheDocument();
  });
  it('should render and have the approriate standing', async () => {
    mockUseStudentGpa.mockReturnValue({ data: { gpa: '3.69' }, loading: false, error: false });
    const { getByText } = render(<StudentGpa />);
    const element = await waitForElement(() => getByText('3.69'));
    expect(element).toBeInTheDocument();
    expect(getByText('GPA across all past terms.')).toBeInTheDocument();
  });

  it('should return appropriate text when data is empty', async () => {
    mockUseStudentGpa.mockReturnValue({ data: { gpa: '' }, loading: false, error: false });
    const { getByText } = render(<StudentGpa />);
    const element = await waitForElement(() =>
      getByText('You must first complete a term to have a GPA.')
    );
    expect(element).toBeInTheDocument();
  });
});

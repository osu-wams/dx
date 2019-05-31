import React from 'react';
import { render, waitForElement } from 'react-testing-library';
import AcademicHistory from '../Academics/AcademicHistory';
import mockGrades from '../../api/student/__mocks__/grades.data';

jest.unmock('../../api/student/grades');

const mockGetGrades = jest.fn();

jest.mock('../../api/student/grades', () => ({
  getGrades: () => mockGetGrades()
}));

it('renders and finds placeholder text: "Find past courses"', () => {
  const { getByPlaceholderText } = render(<AcademicHistory />);
  expect(getByPlaceholderText('Find past courses')).toBeInTheDocument();
});

describe('<AcademicHistory />', () => {
  // Set mock function result before running any tests
  beforeAll(() => {
    mockGetGrades.mockResolvedValue(Promise.resolve(mockGrades));
  });

  it('should find the course: "Test Course Title"', async () => {
    const { getByText } = render(<AcademicHistory />);
    const Algebra = await waitForElement(() => getByText('Test Course Title'));
    expect(Algebra).toBeInTheDocument();
  });

  it('should find the message: "No course history yet" if grades is an empty array', async () => {
    mockGetGrades.mockResolvedValue(Promise.resolve([]));
    const { getByText } = render(<AcademicHistory />);
    const NoGrades = await waitForElement(() => getByText('No course history yet'));
    expect(NoGrades).toBeInTheDocument();
  });
});

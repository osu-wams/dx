import React from 'react';
import { waitForElement, getByTestId, findAllByText, queryAllByText } from '@testing-library/react';
import { render } from '../../util/test-utils';
import userEvent from '@testing-library/user-event';
import PastCourses from '../Academics/PastCourses';
import mockGrades from '../../api/student/__mocks__/grades.data';

const mockUseGrades = jest.fn();

jest.mock('../../api/student/grades', () => ({
  useGrades: () => mockUseGrades()
}));

describe('<PastCourses />', () => {
  // Set mock function result before running any tests
  beforeEach(() => {
    mockUseGrades.mockReturnValue(mockGrades);
  });

  it('renders without errors', async () => {
    const { getByTestId } = render(<PastCourses />);
    expect(getByTestId('past-courses')).toBeInTheDocument();
  });

  it('renders and finds placeholder text: "Find past courses"', () => {
    const { getByPlaceholderText } = render(<PastCourses />);
    expect(getByPlaceholderText('Find past courses')).toBeInTheDocument();
  });

  it('should find the course: "Test Course Title"', async () => {
    const { getByText } = render(<PastCourses />);
    const Algebra = await waitForElement(() => getByText('Test Course Title'));
    expect(Algebra).toBeInTheDocument();
  });

  it('should find only one instace of a course excluded from GPA', async () => {
    const { queryAllByText } = render(<PastCourses />);
    const excludedArray = await waitForElement(() => queryAllByText(/Excluded - GPA\/Credits/));
    expect(excludedArray[0]).toBeInTheDocument();
    expect(excludedArray).toHaveLength(1);
  });

  it('should find "MTH 451" when typing and fire a google analytics event', async () => {
    const { container, getByLabelText } = render(<PastCourses />);

    const AllPastCourses = getByTestId(container, 'past-courses');
    const CourseSearchInput = getByLabelText('Find courses');
    await userEvent.type(CourseSearchInput, 'Math 451');
    const FinalGrade = queryAllByText(AllPastCourses, /MTH 451/);

    expect(FinalGrade).not.toBeNull();
    expect(FinalGrade).toHaveLength(1);
  });

  it('should not break when adding regex to the search and find the grade', async () => {
    const { findByText, getByLabelText, getByText } = render(<PastCourses />);
    const searchInput = getByLabelText('Find courses');
    await waitForElement(() => getByText('Test Course Title'));
    await userEvent.type(searchInput, 'A=B-');
    const finalGrade = await findByText('A=B-');

    expect(finalGrade).toBeInTheDocument();
  });

  it('should find all the mathematics classes', async () => {
    const { container, getByLabelText, getByText } = render(<PastCourses />);

    const pastCourseContainer = getByTestId(container, 'past-courses');
    const searchInput = getByLabelText('Find courses');
    await waitForElement(() => getByText('Test Course Title'));
    await userEvent.type(searchInput, 'Mathematics');

    expect(findAllByText(pastCourseContainer, /Mathematics/)).not.toBeNull();
    expect(queryAllByText(pastCourseContainer, /MTH/)).toHaveLength(7);
  });

  it('should find the message: "No course history yet" if grades is an empty array', async () => {
    mockUseGrades.mockReturnValue({ data: [], loading: false, error: false });
    const { findByText } = render(<PastCourses />);

    const NoGrades = await findByText('No course history yet');

    expect(NoGrades).toBeInTheDocument();
  });
});

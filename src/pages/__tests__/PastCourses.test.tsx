import React from 'react';
import { getByTestId, findAllByText, queryAllByText, screen } from '@testing-library/react';
import { render } from 'src/util/test-utils';
import userEvent from '@testing-library/user-event';
import PastCourses from '../Academics/PastCourses';
import { Student } from '@osu-wams/hooks';

const mockGrades = Student.Grades.mockGrades;
const mockUseGrades = jest.fn();

jest.mock('@osu-wams/hooks', () => {
  return {
    ...jest.requireActual('@osu-wams/hooks'),
    useGrades: () => mockUseGrades(),
  };
});

describe('<PastCourses />', () => {
  // Set mock function result before running any tests
  beforeEach(() => {
    mockUseGrades.mockReturnValue(mockGrades);
  });

  it('renders without errors', async () => {
    render(<PastCourses />);
    expect(screen.getByTestId('past-courses')).toBeInTheDocument();
  });

  it('renders and finds placeholder text: "Find past courses"', () => {
    render(<PastCourses />);
    expect(screen.getByPlaceholderText('Find past courses')).toBeInTheDocument();
  });

  it('should find the course: "Test Course Title"', async () => {
    render(<PastCourses />);
    const Algebra = screen.getByText('Test Course Title');
    expect(Algebra).toBeInTheDocument();
  });

  it('should find only one instace of a course excluded from GPA', async () => {
    render(<PastCourses />);
    const excludedFromGPA = screen.getByText(/Excluded - GPA\/Credits/);
    expect(excludedFromGPA).toBeInTheDocument();
  });

  it('should find "MTH 451" when typing and fire a google analytics event', async () => {
    render(<PastCourses />);
    const searchInput = screen.getByLabelText('Find past courses');
    await userEvent.type(searchInput, 'Math 451');
    const FinalGrade = screen.getByText(/MTH 451/i);

    expect(FinalGrade).toBeInTheDocument();
  });

  it('should not break when adding regex to the search and find the grade', async () => {
    render(<PastCourses />);
    const searchInput = screen.getByLabelText('Find past courses');
    screen.getByText('Test Course Title');
    userEvent.type(searchInput, 'A=B-');
    const finalGrade = await screen.findByText('A=B-');

    expect(finalGrade).toBeInTheDocument();
  });

  it('should find all 7 of the mathematics (MTH) classes', async () => {
    render(<PastCourses />);

    const searchInput = screen.getByLabelText('Find past courses');
    await userEvent.type(searchInput, 'Mathematics');

    // Most "Mathematics" classes have the "MTH" abbreviation instead of "Mathematics"
    const coursesFound = await screen.findAllByText(/MTH/);
    expect(coursesFound).toHaveLength(7);
  });

  it('should find the message: "No course history yet" if grades is an empty array', async () => {
    mockUseGrades.mockReturnValue({ data: [], loading: false, error: false });
    render(<PastCourses />);

    const NoGrades = await screen.findByText('No course history yet');
    expect(NoGrades).toBeInTheDocument();
  });
});

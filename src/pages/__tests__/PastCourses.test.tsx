import React from 'react';
import {
  waitForElement,
  fireEvent,
  act,
  getByTestId,
  findAllByText,
  queryAllByText,
  getAllByText
} from '@testing-library/react';
import { render } from '../../util/test-utils';
import PastCourses from '../Academics/PastCourses';
import mockGrades from '../../api/student/__mocks__/grades.data';

const sleep = (ms: number) => {
  return new Promise(res => setTimeout(res, ms));
};

const mockUseGrades = jest.fn();

jest.mock('../../api/student/grades', () => ({
  useGrades: () => mockUseGrades()
}));

describe('<PastCourses />', () => {
  // Set mock function result before running any tests
  beforeAll(() => {
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
    const { getByText, queryAllByText } = render(<PastCourses />);
    const excluded = await waitForElement(() => getByText(/Excluded from GPA/));
    expect(excluded).toBeInTheDocument();

    const excludedArray = await waitForElement(() => queryAllByText(/Excluded from GPA/));
    expect(excludedArray).toHaveLength(1);
  });

  it('should find "MTH 451" when typing and fire a google analytics event', async () => {
    const { container, getByLabelText, getByText } = render(<PastCourses />);
    const AllPastCourses = getByTestId(container, 'past-courses');
    const CourseSearchInput = getByLabelText('Find courses');
    await waitForElement(() => getByText('Test Course Title'));
    await act(async () => {
      fireEvent.change(CourseSearchInput, {
        target: {
          value: 'MTH 451'
        }
      });
    });
    await sleep(600);
    const FinalGrade = queryAllByText(AllPastCourses, /MTH 451/);
    expect(FinalGrade).not.toBeNull();
    expect(FinalGrade).toHaveLength(1);
  });

  it('should not break when adding regex to the search and find the grade', async () => {
    const { container, getByLabelText, getByText } = render(<PastCourses />);
    const AllPastCourses = getByTestId(container, 'past-courses');
    const GradesSearchInput = getByLabelText('Find courses');
    await waitForElement(() => getByText('Test Course Title'));
    await act(async () => {
      fireEvent.change(GradesSearchInput, {
        target: {
          value: 'A=B-'
        }
      });
    });
    await sleep(600);
    const FinalGrade = queryAllByText(AllPastCourses, /A=B-/);
    expect(FinalGrade).not.toBeNull();
    expect(FinalGrade).toHaveLength(1);
  });

  it('should find all the mathematics classes', async () => {
    const { container, getByLabelText, getByText } = render(<PastCourses />);
    const AllPastCourses = getByTestId(container, 'past-courses');
    const SearchInput = getByLabelText('Find courses');
    await waitForElement(() => getByText('Test Course Title'));
    await act(async () => {
      fireEvent.change(SearchInput, {
        target: {
          value: 'Mathematics'
        }
      });
    });
    await sleep(600);
    expect(findAllByText(AllPastCourses, /Mathematics/)).not.toBeNull();
    expect(queryAllByText(AllPastCourses, /MTH/)).toHaveLength(7);
  });

  it('should find the message: "No course history yet" if grades is an empty array', async () => {
    mockUseGrades.mockReturnValue({ data: [], loading: false, error: false });
    const { getByText } = render(<PastCourses />);
    const NoGrades = await waitForElement(() => getByText('No course history yet'));
    expect(NoGrades).toBeInTheDocument();
  });
});

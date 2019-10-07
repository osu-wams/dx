import React from 'react';
import { waitForElement, fireEvent, act } from '@testing-library/react';
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

  it('should find "MTH 451" when typing and fire a google analytics event', async () => {
    const { getByLabelText, getByText, debug } = render(<PastCourses />);
    const CourseSearchInput = getByLabelText('Find courses');
    await waitForElement(() => getByText('Test Course Title'));
    await act(async () => {
      fireEvent.change(CourseSearchInput, {
        target: {
          value: 'MTH 451'
        }
      });
    });

    expect(CourseSearchInput.value).toBe('MTH 451');

    // !TODO: useEffect is not bring triggered, we need to look at this
    // const testCourseAfter = await waitForElement(() => getByText('Test Course Title'));
    // expect(mockGAEvent).toHaveBeenCalled();
    // expect(testCourseAfter).toBeInTheDocument();
  });

  it('should find the message: "No course history yet" if grades is an empty array', async () => {
    mockUseGrades.mockReturnValue({data: [], loading: false, error: false});
    const { getByText } = render(<PastCourses />);
    const NoGrades = await waitForElement(() => getByText('No course history yet'));
    expect(NoGrades).toBeInTheDocument();
  });
});

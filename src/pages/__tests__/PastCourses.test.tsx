import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithAllContexts as render } from 'src/util/test-utils';
import userEvent from '@testing-library/user-event';
import PastCourses from '../Academics/PastCourses';
import { State, Student } from '@osu-wams/hooks';

describe('<PastCourses />', () => {
  it('renders without errors', async () => {
    render(<PastCourses />);
    expect(screen.getByTestId('past-courses')).toBeInTheDocument();
  });

  it('renders and finds placeholder text: "Find past courses"', () => {
    render(<PastCourses />);
    expect(screen.getByPlaceholderText('Find past courses')).toBeInTheDocument();
  });

  it('should find the course: "Test Course Title" and the CRN', async () => {
    render(<PastCourses />, {
      initialStates: [
        {
          state: State.gradesState,
          value: Student.Grades.mockGrades,
        },
      ],
    });
    const Algebra = await screen.findByText('Test Course Title');
    expect(Algebra).toBeInTheDocument();
    expect(await screen.findByText(/CRN: 15625/i)).toBeInTheDocument();
  });

  it('should find only one instance of a course excluded from GPA', async () => {
    render(<PastCourses />, {
      initialStates: [
        {
          state: State.gradesState,
          value: Student.Grades.mockGrades,
        },
      ],
    });
    const excludedFromGPA = await screen.findByText(/Excluded - GPA\/Credits/);
    expect(excludedFromGPA).toBeInTheDocument();
  });

  it('should find the message: "No course history yet" if grades is an empty array', async () => {
    render(<PastCourses />, {
      initialStates: [
        {
          state: State.gradesState,
          value: {
            data: [],
            isLoading: false,
            isSuccess: true,
            isError: false,
          },
        },
      ],
    });

    const NoGrades = await screen.findByText('No course history yet');
    expect(NoGrades).toBeInTheDocument();
  });

  describe('User searches', () => {
    it('should find "MTH 451" when typing and fire a google analytics event', async () => {
      render(<PastCourses />, {
        initialStates: [
          {
            state: State.gradesState,
            value: Student.Grades.mockGrades,
          },
        ],
      });
      const searchInput = screen.getByLabelText('Find past courses');
      userEvent.type(searchInput, 'MTH 451');
      const FinalGrade = await screen.findByText(/MTH 451/i);

      expect(FinalGrade).toBeInTheDocument();
    });

    it('should not break when adding regex to the search and find the grade', async () => {
      render(<PastCourses />, {
        initialStates: [
          {
            state: State.gradesState,
            value: Student.Grades.mockGrades,
          },
        ],
      });
      const searchInput = screen.getByLabelText('Find past courses');
      await screen.findByText('Test Course Title');
      userEvent.type(searchInput, 'A=B-');
      const finalGrade = await screen.findByText('A=B-');

      expect(finalGrade).toBeInTheDocument();
    });

    it('should find all 7 of the mathematics (MTH) classes', async () => {
      render(<PastCourses />, {
        initialStates: [
          {
            state: State.gradesState,
            value: Student.Grades.mockGrades,
          },
        ],
      });

      const searchInput = screen.getByLabelText('Find past courses');
      await userEvent.type(searchInput, 'Mathematics');

      // Finds 7 Math classes and 1 Economics class "INTRO TO MATHEMATIC ECONOMICS"
      expect(await screen.findByText(/Found 8 courses/i)).toBeInTheDocument();

      // Most "Mathematics" classes have the "MTH" abbreviation instead of "Mathematics"
      // Finds 7 MTH and 1 ECON
      const mthCoursesFound = await screen.findAllByText(/MTH/);
      expect(mthCoursesFound).toHaveLength(7);
      const econCoursesFound = await screen.findAllByText(/MTH/);
      expect(econCoursesFound).toHaveLength(7);
    });

    it('should not find any courses after searching something bogus', async () => {
      render(<PastCourses />, {
        initialStates: [
          {
            state: State.gradesState,
            value: Student.Grades.mockGrades,
          },
        ],
      });

      const searchInput = screen.getByLabelText('Find past courses');
      await userEvent.type(searchInput, 'bogusBogus');

      // Most "Mathematics" classes have the "MTH" abbreviation instead of "Mathematics"
      const coursesNotFound = await screen.findByText(/Found 0 courses/i);
      expect(coursesNotFound).toBeInTheDocument();
    });

    it('should find faculty name in document', async () => {
      render(<PastCourses />, {
        initialStates: [
          {
            state: State.gradesState,
            value: Student.Grades.mockGrades,
          },
        ],
      });

      expect(await screen.findByText('Hess, Robin')).toBeInTheDocument();
    });
  });
});

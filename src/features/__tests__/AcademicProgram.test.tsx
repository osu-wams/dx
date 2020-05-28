import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from 'src/util/test-utils';
import { AcademicProgram } from '../AcademicProgram';
import { Student } from '@osu-wams/hooks';
import { mockGAEvent } from 'src/setupTests';

const { mockDegrees } = Student.Degrees;
const mockUseDegrees = jest.fn();

jest.mock('@osu-wams/hooks', () => {
  return {
    // @ts-ignore spread operator on an Object complaint
    ...jest.requireActual('@osu-wams/hooks'),
    useDegrees: () => mockUseDegrees(),
  };
});

beforeEach(() => {
  mockUseDegrees.mockReturnValue(mockDegrees);
});

describe('<ProgramOfStudy /> | Degree', () => {
  it('Expects "Program of Study" card to render', () => {
    render(<AcademicProgram />);

    expect(screen.getByText(/My Academic Program/i)).toBeInTheDocument();
  });

  it('Expects "corvallis" to show up as the Campus', () => {
    render(<AcademicProgram />);

    expect(screen.getByText(/corvallis/i)).toBeInTheDocument();
  });

  it('Expects Degree data to show up', () => {
    render(<AcademicProgram />);

    expect(screen.getByText(/Bachelor of Science/i)).toBeInTheDocument();
    expect(screen.getByText(/College of Engineering/i)).toBeInTheDocument();
  });

  it('Expects 2 majors to show up along the same department each time', () => {
    render(<AcademicProgram />);

    expect(screen.getByText(/Mechanical Engineering/i)).toBeInTheDocument();
    expect(screen.getByText(/Manufacturing Engineering/i)).toBeInTheDocument();
    expect(screen.getAllByText(/School of Mech, Ind, Manf Engr/i)).toHaveLength(2);
  });

  it('Expects 2 minors to show up', () => {
    render(<AcademicProgram />);

    expect(screen.getByText(/Spanish/i)).toBeInTheDocument();
    expect(screen.getByText(/Education/i)).toBeInTheDocument();
  });

  it('Expects a student with dual degrees to have two sets of degree UI rendered', () => {
    mockUseDegrees.mockReturnValue({
      ...mockDegrees,
      data: [...mockDegrees.data, ...mockDegrees.data],
    });
    render(<AcademicProgram />);

    expect(screen.getAllByText(/Mechanical Engineering/i)).toHaveLength(2);
    expect(screen.getAllByText(/Manufacturing Engineering/i)).toHaveLength(2);
    expect(screen.getAllByText(/School of Mech, Ind, Manf Engr/i)).toHaveLength(4);
  });

  it('Expects Student Profile Link tracked by Analytics', () => {
    render(<AcademicProgram />);
    const profileLink = screen.getByText(/Student Profile/i);
    expect(profileLink).toBeInTheDocument();

    userEvent.click(profileLink);
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });

  it('Expects "No Information", not "Bachelor of Science" when no data returns', () => {
    mockUseDegrees.mockReturnValue({ data: [] });
    render(<AcademicProgram />);

    expect(screen.queryByText(/Bachelor of Science/i)).toBeNull();
    expect(screen.getByText(/you do not currently have a program of study/i)).toBeInTheDocument();
  });
});

import React from 'react';
import { render } from 'src/util/test-utils';
import userEvent from '@testing-library/user-event';
import { AcademicProgram } from '../AcademicProgram';
import { Student } from '@osu-wams/hooks';
import { mockGAEvent } from 'src/setupTests';

const { mockDegrees } = Student.Degrees;
const mockUseDegrees = jest.fn();

jest.mock('@osu-wams/hooks', () => {
  return {
    ...jest.requireActual('@osu-wams/hooks'),
    useDegrees: () => mockUseDegrees(),
  };
});

beforeEach(() => {
  mockUseDegrees.mockReturnValue(mockDegrees);
});

describe('<ProgramOfStudy /> | Degree', () => {
  it('Expects "Program of Study" card to render', () => {
    const { getByText } = render(<AcademicProgram />);

    expect(getByText(/My Academic Program/i)).toBeInTheDocument();
  });

  it('Expects "corvallis" to show up as the Campus', () => {
    const { getByText } = render(<AcademicProgram />);

    expect(getByText(/corvallis/i)).toBeInTheDocument();
  });

  it('Expects Degree data to show up', () => {
    const { getByText } = render(<AcademicProgram />);

    expect(getByText(/Bachelor of Science/i)).toBeInTheDocument();
    expect(getByText(/College of Engineering/i)).toBeInTheDocument();
  });

  it('Expects 2 majors to show up along the same department each time', () => {
    const { getByText, getAllByText } = render(<AcademicProgram />);

    expect(getByText(/Mechanical Engineering/i)).toBeInTheDocument();
    expect(getByText(/Manufacturing Engineering/i)).toBeInTheDocument();
    expect(getAllByText(/School of Mech, Ind, Manf Engr/i)).toHaveLength(2);
  });

  it('Expects 2 minors to show up', () => {
    const { getByText } = render(<AcademicProgram />);

    expect(getByText(/Spanish/i)).toBeInTheDocument();
    expect(getByText(/Education/i)).toBeInTheDocument();
  });

  it('Expects Student Profile Link tracked by Analytics', () => {
    const { getByText } = render(<AcademicProgram />);
    const profileLink = getByText(/Student Profile/i);
    expect(profileLink).toBeInTheDocument();

    userEvent.click(profileLink);
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });

  it('Expects "No Information", not "Bachelor of Science" when no data returns', () => {
    mockUseDegrees.mockReturnValue({ data: [] });
    const { getByText, queryByText } = render(<AcademicProgram />);

    expect(queryByText(/Bachelor of Science/i)).toBeNull();
    expect(getByText(/you do not currently have a program of study/i)).toBeInTheDocument();
  });
});

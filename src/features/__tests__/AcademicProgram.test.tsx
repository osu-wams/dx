import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render, alterMock } from 'src/util/test-utils';
import { AcademicProgram } from '../AcademicProgram';
import { mockGAEvent } from 'src/setupTests';
import { DEGREES_API } from 'src/mocks/apis';
import { Student } from '@osu-wams/hooks';
const { mockDegrees } = Student.Degrees;
// Modifies data to match backend return
const apiData = mockDegrees.data.map((d) => ({
  attributes: d,
}));

describe('<ProgramOfStudy /> | Degree', () => {
  describe('One Degree, dual majors and minors', () => {
    beforeEach(() => {
      render(<AcademicProgram />);
    });

    it('Expects "My Academic Program" card to render', async () => {
      expect(await screen.findByText(/My Academic Program/i)).toBeInTheDocument();
    });

    it('Loading state before data is rendered, removed after data is present', async () => {
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
      expect(await screen.findByText(/Bachelor of Science/i)).toBeInTheDocument();

      // Since we have data already, the loading state should be gone
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    it('Expects "corvallis" to show up as the Campus', async () => {
      expect(await screen.findByText(/corvallis/i)).toBeInTheDocument();
    });

    it('Expects Degree data to show up', async () => {
      expect(await screen.findByText(/Bachelor of Science/i)).toBeInTheDocument();
      expect(await screen.findByText(/College of Engineering/i)).toBeInTheDocument();
    });

    it('Expects 2 majors to show up along the same department each time', async () => {
      expect(await screen.findByText(/Mechanical Engineering/i)).toBeInTheDocument();
      expect(await screen.findByText(/Manufacturing Engineering/i)).toBeInTheDocument();
      expect(await screen.findAllByText(/School of Mech, Ind, Manf Engr/i)).toHaveLength(2);
    });

    it('Expects 2 minors to show up', async () => {
      expect(await screen.findByText(/Spanish/i)).toBeInTheDocument();
      expect(await screen.findByText(/Education/i)).toBeInTheDocument();
    });

    it('Expects Student Profile Link tracked by Analytics', async () => {
      const profileLink = await screen.findByText(/Student Profile/i);
      expect(profileLink).toBeInTheDocument();

      userEvent.click(profileLink);
      expect(mockGAEvent).toHaveBeenCalledTimes(1);
    });
  });

  describe('Graduated student', () => {
    it('in is not shown in degree', async () => {
      let newApiData = apiData;
      newApiData[0].attributes.degree = 'Certificate in'; // is there a better way to do this??

      alterMock(DEGREES_API, newApiData);
      render(<AcademicProgram />);

      expect(await screen.findByText(/Certificate/i)).toBeInTheDocument();
    });

    // When a student graduates, they have a major but no department
    it('no extra comma after major, since no department', async () => {
      let newApiData = apiData;
      newApiData[0].attributes.majors.first.department = '';
      newApiData[0].attributes.majors.second.department = '';

      alterMock(DEGREES_API, newApiData);

      render(<AcademicProgram />);

      expect(screen.queryByText(/, School of Mech, Ind, Manf Engr/i)).not.toBeInTheDocument();
    });
  });

  describe('Dual Degrees', () => {
    it('Has two sets of degree UI rendered', async () => {
      alterMock(DEGREES_API, [...apiData, ...apiData]);
      render(<AcademicProgram />);

      expect(await screen.findAllByText(/Mechanical Engineering/i)).toHaveLength(2);
      expect(await screen.findAllByText(/Manufacturing Engineering/i)).toHaveLength(2);
      expect(await screen.findAllByText(/School of Mech, Ind, Manf Engr/i)).toHaveLength(4);
    });
  });

  describe('Empty Degree', () => {
    it('Does not find "Bachelor of Science", finds no academic program text', async () => {
      alterMock(DEGREES_API, []);
      render(<AcademicProgram />);

      expect(
        await screen.findByText(/You do not currently have an academic program/i)
      ).toBeInTheDocument();

      expect(screen.queryByText(/Bachelor of Science/i)).not.toBeInTheDocument();
    });
  });
});

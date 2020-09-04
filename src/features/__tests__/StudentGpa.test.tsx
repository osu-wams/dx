import React from 'react';
import { render, alterMock, mockGradUser } from 'src/util/test-utils';
import { screen } from '@testing-library/react';
import StudentGpa from '../academic-overview/StudentGpa';
import { Student } from '@osu-wams/hooks';
import { GPA_API } from 'src/mocks/apis';

// Gradstudent GPA
const { gpaHookData } = Student.Gpa.mockGpa;

describe('<StudentGpa />', () => {
  describe('Undergraduate Student', () => {
    it('should render and have the approriate standing for an Undergraduate', async () => {
      render(<StudentGpa />);
      expect(await screen.findByText('3.1')).toBeInTheDocument();
      expect(screen.queryByText('Graduate GPA across all past terms.')).toBeNull();
      expect(
        await screen.findByText('Undergraduate GPA across all past terms.')
      ).toBeInTheDocument();
      expect(await screen.findByText('Institutional GPA')).toBeInTheDocument();
    });

    it('should return appropriate text when data is empty', async () => {
      alterMock(GPA_API, []);
      render(<StudentGpa />);

      expect(await screen.findByText(/first complete a term to have a GPA/i)).toBeInTheDocument();
    });
  });

  describe('Graduate Student', () => {
    beforeEach(() => {
      alterMock(GPA_API, gpaHookData.data);
      render(<StudentGpa />, { user: mockGradUser });
    });

    it('Has apprpriate GPA and graduate references', async () => {
      expect(await screen.findByText('3.81')).toBeInTheDocument();
      expect(await screen.findByText(/Graduate GPA across all past terms/i)).toBeInTheDocument();
      expect(await screen.findByText(/Institutional GPA/i)).toBeInTheDocument();
    });

    it('Has no undergradute references', async () => {
      expect(screen.queryByText(/Undergraduate GPA across all past terms/i)).toBeNull();
    });
  });
});

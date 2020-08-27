import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'src/util/test-utils';
import userEvent from '@testing-library/user-event';
import { FeaturedTrainingsCard } from 'src/features/training/FeaturedTrainingsCard';
import { mockGAEvent } from 'src/setupTests';

describe('<FeaturedTrainingsCard />', () => {
  // Set mock function result before running any tests
  beforeEach(() => {
    render(<FeaturedTrainingsCard />);
  });

  describe('Main components', () => {
    it('Renders and finds the page title', () => {
      expect(screen.getByText(/Featured Trainings/i)).toBeInTheDocument();
    });

    it('Finds the featured courses only', async () => {
      expect(await screen.findByRole('button', { name: /testo training/i })).toBeInTheDocument();
      expect(
        await screen.findByRole('button', { name: /Play nice with others/ })
      ).toBeInTheDocument();
      // Does not find it since it's not a featured training
      expect(screen.queryByRole('button', { name: /Super Testo 2/i })).toBeNull();
    });

    it('Has a clickable footer link that reports to GA', async () => {
      const allTrainings = await screen.findByText(/view more trainings/i);
      expect(allTrainings).toBeInTheDocument();
      userEvent.click(allTrainings);
      expect(mockGAEvent).toHaveBeenCalledTimes(1);
    });
  });

  describe('Modal interactions', () => {
    it('Can open and close the Training Details modal', async () => {
      userEvent.click(await screen.findByRole('button', { name: /testo training/i }));

      const close = await screen.findByRole('button', { name: /close/i });
      expect(close).toBeInTheDocument();

      // Modeal only text from Course Type
      expect(await screen.findByText(/Professional Learning Community/i)).toBeInTheDocument();

      userEvent.click(close);
      expect(screen.queryByRole('button', { name: /close/i })).toBeNull();
    });
  });
});

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithAllContexts as render } from 'src/util/test-utils';
import { EmployeeTools } from '../EmployeeTools';
import { mockGAEvent } from 'src/setupTests';

it('Should have Empcenter and Evals links that are tracked via GA', async () => {
  render(<EmployeeTools />);
  const empcenter = screen.getByText(/Empcenter/);
  const evals = screen.getByText(/Evals/);
  userEvent.click(empcenter);
  userEvent.click(evals);
  expect(mockGAEvent).toHaveBeenCalledTimes(2);
});

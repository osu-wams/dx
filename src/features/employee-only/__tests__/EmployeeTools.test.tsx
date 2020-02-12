import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../util/test-utils';
import { EmployeeTools } from '../EmployeeTools';
import { mockGAEvent } from '../../../setupTests';

it('Should have Empcenter and Evals links that are tracked via GA', async () => {
  const { getByText } = render(<EmployeeTools />);
  const empcenter = getByText(/Empcenter/);
  const evals = getByText(/Evals/);
  fireEvent.click(empcenter);
  fireEvent.click(evals);
  expect(mockGAEvent).toHaveBeenCalledTimes(2);
});

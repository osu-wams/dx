import React from 'react';
import { render } from '../../componentTestUtils';
import Finances from '../Finances';

test('renders', () => {
  const { getByTestId } = render(<Finances />);
  expect(getByTestId('finances-page')).toBeInTheDocument();
});

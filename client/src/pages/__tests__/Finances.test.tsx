import React from 'react';
import { render } from 'react-testing-library';
import Finances from '../Finances';

test('renders', () => {
  const { getByTestId } = render(<Finances />);
  expect(getByTestId('finances-page')).toBeInTheDocument();
});

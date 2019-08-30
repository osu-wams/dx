import React from 'react';
import { render } from '../../util/test-utils';
import Finances from '../Finances';

test('renders', () => {
  const { getByTestId } = render(<Finances />);
  expect(getByTestId('finances-page')).toBeInTheDocument();
});

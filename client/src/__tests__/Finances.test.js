import React from 'react';
import { render } from '../componentTestUtils';
import Finances from '../components/pages/Finances';

test('renders', () => {
  const { container } = render(<Finances />);
  expect(container.firstChild).toMatchSnapshot();
});

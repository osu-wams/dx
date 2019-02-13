import React from 'react';
import { render } from 'react-testing-library';
import Tools from '../Tools';

test('renders', () => {
  const { getByTestId } = render(<Tools />);
  expect(getByTestId('tools-page')).toBeInTheDocument();
});

import React from 'react';
import { render } from 'react-testing-library';
import Resources from '../Resources';

test('renders', () => {
  const { getByTestId } = render(<Resources />);
  expect(getByTestId('resources-page')).toBeInTheDocument();
});

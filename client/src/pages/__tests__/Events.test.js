import React from 'react';
import { render } from 'react-testing-library';
import Events from '../Events';

test('renders', () => {
  const { getByTestId } = render(<Events />);
  expect(getByTestId('events-page')).toBeInTheDocument();
});

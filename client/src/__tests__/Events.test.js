import React from 'react';
import { render } from '../componentTestUtils';
import Events from '../components/pages/Events';

test('renders', () => {
  const { getByTestId } = render(<Events />);
  expect(getByTestId('events-page')).toBeInTheDocument();
});

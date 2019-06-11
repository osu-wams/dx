import React from 'react';
import { render } from '@testing-library/react';
import Resources from '../Resources';

test('renders', () => {
  const { getByTestId } = render(<Resources />);
  expect(getByTestId('resources-page')).toBeInTheDocument();
});

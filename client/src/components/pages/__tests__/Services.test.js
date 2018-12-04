import React from 'react';
import { render } from '../../../componentTestUtils';
import Services from '../Services';

test('renders', () => {
  const { getByTestId } = render(<Services />);
  expect(getByTestId('services-page')).toBeInTheDocument();
});

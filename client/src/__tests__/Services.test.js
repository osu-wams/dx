import React from 'react';
import { render } from '../componentTestUtils';
import Services from '../components/pages/Services';

test('renders', () => {
  const { getByTestId } = render(<Services />);
  expect(getByTestId('services-page')).toBeInTheDocument();
});

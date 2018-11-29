import React from 'react';
import { render } from '../componentTestUtils';
import Services from '../components/pages/Services';

test('renders', () => {
  const { container } = render(<Services />);
  expect(container.firstChild).toMatchSnapshot();
});

import React from 'react';
import { render } from '../componentTestUtils';
import Events from '../components/pages/Events';

test('renders', () => {
  const { container } = render(<Events />);
  expect(container.firstChild).toMatchSnapshot();
});

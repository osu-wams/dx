import React from 'react';
import { render } from '../componentTestUtils';
import Academics from '../components/pages/Academics';

test('renders', () => {
  const { container } = render(<Academics />);
  expect(container.firstChild).toMatchSnapshot();
});

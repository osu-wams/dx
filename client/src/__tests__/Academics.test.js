import React from 'react';
import { render } from '../componentTestUtils';
import Academics from '../components/pages/Academics';

test('renders', () => {
  const { getByTestId } = render(<Academics />);
  expect(getByTestId('academics-page')).toBeInTheDocument();
});

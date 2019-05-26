import React from 'react';
import { render } from 'react-testing-library';
import Academics from '../Academics';

test('renders', () => {
  const { getByTestId } = render(<Academics />);
  expect(getByTestId('academics-page')).toBeInTheDocument();
});

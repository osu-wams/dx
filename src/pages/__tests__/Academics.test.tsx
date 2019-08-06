import React from 'react';
import { render } from '@testing-library/react';
import Academics from '../Academics';

test('renders', () => {
  const { getByTestId } = render(<Academics />);
  expect(getByTestId('academics-page')).toBeInTheDocument();
});

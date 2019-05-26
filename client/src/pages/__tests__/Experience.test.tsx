import React from 'react';
import { render } from 'react-testing-library';
import Experience from '../Experience';

test('renders', () => {
  const { getByTestId } = render(<Experience />);
  expect(getByTestId('experience-page')).toBeInTheDocument();
});

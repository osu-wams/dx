import React from 'react';
import { render } from 'src/util/test-utils';
import { screen } from '@testing-library/react';
import Academics from '../Academics';

it('renders', async () => {
  render(<Academics />);
  expect(screen.getByTestId('academics-dashboard')).toBeInTheDocument();
});

it('should display the title Academics', () => {
  render(<Academics />);
  expect(screen.getByText('Academics')).toBeInTheDocument();
});

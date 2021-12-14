import React from 'react';
import { renderWithAllContexts as render } from 'src/util/test-utils';
import { screen } from '@testing-library/react';
import Academics from '../Academics';
import { BrowserRouter } from 'react-router-dom';

it('renders', async () => {
  render(
    <BrowserRouter>
      <Academics />
    </BrowserRouter>
  );
  expect(screen.getByTestId('academics-dashboard')).toBeInTheDocument();
});

it('should display the title Academics', async () => {
  render(
    <BrowserRouter>
      <Academics />
    </BrowserRouter>
  );
  expect(screen.getByText('Academics')).toBeInTheDocument();
});

import React from 'react';
import { render } from '@testing-library/react';
import PageNotFound from '../PageNotFound';

test('renders', () => {
  const { getByTestId } = render(<PageNotFound />);
  expect(getByTestId('404-page')).toBeInTheDocument();
});

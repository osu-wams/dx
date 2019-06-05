import React from 'react';
import { render } from 'react-testing-library';
import PageNotFound from '../PageNotFound';

test('renders', () => {
  const { getByTestId } = render(<PageNotFound />);
  expect(getByTestId('404-page')).toBeInTheDocument();
});

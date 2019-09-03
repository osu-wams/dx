import React from 'react';
import { render } from '../../util/test-utils';
import Resources from '../Resources';

test('renders', () => {
  const { getByTestId } = render(<Resources />);
  expect(getByTestId('resources-page')).toBeInTheDocument();
});

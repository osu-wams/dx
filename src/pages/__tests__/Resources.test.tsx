import React from 'react';
import { waitForElement } from '@testing-library/react';
import { render } from '../../util/test-utils';
import Resources from '../Resources';

test('renders', () => {
  const { getByTestId } = render(<Resources />);
  expect(getByTestId('resources-page')).toBeInTheDocument();
});

test('should display the title Resources', async () => {
  const { getByText } = render(<Resources />);
  await waitForElement(() => getByText('Resources'));
});
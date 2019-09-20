import React from 'react';
import { waitForElement } from '@testing-library/react';
import { render } from '../../util/test-utils';
import { renderWithUserContext } from '../../util/test-utils';

import Academics from '../Academics';

test('renders', () => {
  const { getByTestId } = renderWithUserContext(<Academics />);
  expect(getByTestId('academics-dashboard')).toBeInTheDocument();
});

test('should display the title Academics', async () => {
  const { getByText } = render(<Academics />);
  await waitForElement(() => getByText('Academics'));
});

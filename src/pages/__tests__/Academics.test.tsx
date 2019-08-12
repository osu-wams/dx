import React from 'react';
import { renderWithUserContext } from '../../util/test-utils';

import Academics from '../Academics';

test('renders', () => {
  const { getByTestId } = renderWithUserContext(<Academics />);
  expect(getByTestId('academics-page')).toBeInTheDocument();
});

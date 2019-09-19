import React from 'react';
import { waitForElement } from '@testing-library/react';
import { render } from '../../util/test-utils';
import Finances from '../Finances';

describe('<Finances />', () => {
  it('should render the finances page', async () => {
    const { getByTestId } = render(<Finances />);
  expect(getByTestId('finances-page')).toBeInTheDocument();
  });

  it('should display the title Finances', async () => {
    const { getByText } = render(<Finances />);
    await waitForElement(() => getByText('Finances'));
  });
});




import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithAllContexts as render } from 'src/util/test-utils';
import PageTitle from '../PageTitle';

test('Should render PageTitle: "Bob Ross"', () => {
  render(<PageTitle title="Bob Ross" />);
  expect(screen.getByText('Bob Ross')).toBeInTheDocument();
});

import React from 'react';
import { render } from '../../util/test-utils';
import Resources from '../Resources';

describe('<Resources> main page', () => {
  xit('finds "Resources" and renders with test id', async () => {
    const { findByText, getByTestId } = render(<Resources />);
    await findByText('Resources');
    const testId = await getByTestId('resources-page');
    expect(testId).toBeInTheDocument();
  });
});

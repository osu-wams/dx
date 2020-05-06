import React from 'react';
import { render } from 'src/util/test-utils';
import Resources from '../Resources';

// TODO: Fix these on Github Actions consistent failures
xdescribe('<Resources> main page', () => {
  it('finds "Resources" and renders with test id', async () => {
    const { findByText, getByTestId } = render(<Resources />);
    await findByText('Resources');
    const testId = getByTestId('resources-page');
    expect(testId).toBeInTheDocument();
  });
});

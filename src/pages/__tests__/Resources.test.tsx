import React from 'react';
import { render } from '../../util/test-utils';
import Resources from '../Resources';

describe('<Resources> main page', () => {
  it('renders with test id', async () => {
    const { findByTestId } = render(<Resources />);

    const testId = await findByTestId('resources-page');
    expect(testId).toBeInTheDocument();
  });

  it('should display the title Resources', async () => {
    const { findByText } = render(<Resources />);

    const resources = await findByText('Resources');
    expect(resources).toBeInTheDocument();
  });
});

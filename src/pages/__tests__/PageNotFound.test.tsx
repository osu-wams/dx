import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from 'src/util/test-utils';
import { mockGAEvent } from 'src/setupTests';
import PageNotFound from '../PageNotFound';

describe('404 page', () => {
  it('renders', () => {
    const { getByTestId } = render(<PageNotFound />);
    expect(getByTestId('404-page')).toBeInTheDocument();
  });

  it('has clickable links to dashboard and support page', () => {
    const { getByText } = render(<PageNotFound />);
    const dashboard = getByText(/to dashboard/);
    fireEvent.click(dashboard);
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });
});

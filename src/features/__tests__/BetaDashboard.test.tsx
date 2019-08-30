import React from 'react';
import { render } from '../../util/test-utils';
import BetaDashboard from '../../pages/BetaDashboard';

describe('<BetaDashboard />', () => {
  it('should render the beta dashboard page', async () => {
    const { getByTestId } = render(<BetaDashboard />);
    expect(getByTestId('betadash-page')).toBeInTheDocument();
  });
});

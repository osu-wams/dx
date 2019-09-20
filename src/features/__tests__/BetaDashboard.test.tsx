import React from 'react';
import { fireEvent, waitForElement } from '@testing-library/react';
import { render } from '../../util/test-utils';
import BetaDashboard from '../../pages/BetaDashboard';
import { mockGAEvent } from '../../setupTests';


describe('<BetaDashboard />', () => {
  it('should render the beta dashboard page', async () => {
    const { getByTestId } = render(<BetaDashboard />);
    expect(getByTestId('betadash-page')).toBeInTheDocument();
  });

  it('should have links that are tracked via GA', async () => {
    const { getByText } = render(<BetaDashboard />);
    const oldMyOSU = getByText(/old MyOSU portal/);
    const getHelp = getByText(/Get help/);
    const giveFeedback = getByText(/Give us feedback/);
    fireEvent.click(oldMyOSU);
    fireEvent.click(getHelp);
    fireEvent.click(giveFeedback);
    expect(mockGAEvent).toHaveBeenCalledTimes(3);
  });

  it('should display the title Beta', async () => {
    const { getByText } = render(<BetaDashboard />);
    await waitForElement(() => getByText('Beta'));
  });
});

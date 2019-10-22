import React from 'react';
import { fireEvent, waitForElement, getByAltText } from '@testing-library/react';
import { render } from '../../util/test-utils';
import BetaInfo from '../../../src/features/beta/InfoCard';
import { mockGAEvent } from '../../setupTests';

describe('<DashboardBetaContentA />', () => {
  it('should have links that are tracked via GA', async () => {
    const { getByText } = render(<BetaInfo />);
    const myOSU = getByText(/MyOSU/, {
      selector: 'a'
    });
    const feedback = getByText(/feedback/);
    fireEvent.click(myOSU);
    fireEvent.click(feedback);
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });
});

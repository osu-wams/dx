import React from 'react';
import { fireEvent, waitForElement, getByAltText } from '@testing-library/react';
import { render } from '../../util/test-utils';
import { AuthorizeCanvas } from '../canvas/AuthorizeCanvas';
import { mockGAEvent } from '../../setupTests';

describe('<AuthorizeCanvas />', () => {
  it('should have links that are tracked via GA', async () => {
    const { getByText } = render(<AuthorizeCanvas />);
    const canvas = getByText(/Authorize Canvas/, {
      selector: 'a'
    });
    fireEvent.click(canvas);
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });
});

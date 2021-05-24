import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from 'src/util/test-utils';
import { AuthorizeCanvas } from '../canvas/AuthorizeCanvas';
import { mockGAEvent } from 'src/setupTests';

describe('<AuthorizeCanvas />', () => {
  it('should have links that are tracked via GA', async () => {
    render(<AuthorizeCanvas />);
    const canvas = screen.getByText(/Authorize Canvas/, {
      selector: 'a',
    });
    userEvent.click(canvas);
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });
});

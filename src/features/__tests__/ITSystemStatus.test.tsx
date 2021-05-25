import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { alterMock, renderWithAllContexts as render } from 'src/util/test-utils';
import { ITSystemStatus } from '../it-systems-status/ITSystemStatus';
import { mockGAEvent } from 'src/setupTests';
import { IT_STATUS_API } from 'src/mocks/apis';

describe('<ITSystemStatus /> with issues', () => {
  beforeEach(() => {
    render(<ITSystemStatus />);
  });

  it('should have links that are tracked via GA', async () => {
    const portalLink = await screen.findByRole('link', { name: /more at status portal/ });
    const stickyIncidentLink = await screen.findByRole('link', { name: /View details/ });
    userEvent.click(portalLink);
    userEvent.click(stickyIncidentLink);
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });

  it('should have a sticky incident notification', async () => {
    expect(await screen.findByText(/View details/)).toBeInTheDocument();
    expect(await screen.findAllByText(/G Suite/)).toHaveLength(4);
    expect(await screen.findByTestId('sticky-incident-badge')).toBeInTheDocument();
    expect(screen.queryByText(/operating normally/)).not.toBeInTheDocument();
  });

  it('should have some systems not operating normally but hide the operational systems', async () => {
    expect(await screen.findByText(/View details/i)).toBeInTheDocument();
    expect(await screen.findByText(/Major Outage/i)).toBeInTheDocument();
    expect(await screen.findByText(/Performance Issues/i)).toBeInTheDocument();
    expect(screen.queryByText(/Operational/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/operating normally/i)).not.toBeInTheDocument();
  });
});

it('should have an all systems operational state and link is tracked', async () => {
  alterMock(IT_STATUS_API, []);
  render(<ITSystemStatus />);

  const status = await screen.findByText(/operating normally/i);
  expect(status).toBeInTheDocument();
  expect(screen.queryByText(/Major Outage/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/View details/i)).not.toBeInTheDocument();

  userEvent.click(status);
  expect(mockGAEvent).toHaveBeenCalledTimes(1);
});

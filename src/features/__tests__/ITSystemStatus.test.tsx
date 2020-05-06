import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from 'src/util/test-utils';
import { ITSystemStatus } from '../employee-only/ITSystemStatus';
import { mockGAEvent } from 'src/setupTests';
import { Status } from '@osu-wams/hooks';

const mockUseStatus = jest.fn();
const mockNoData = { data: [], loading: false, error: false };

jest.mock('@osu-wams/hooks', () => {
  return {
    ...jest.requireActual('@osu-wams/hooks'),
    useStatus: () => mockUseStatus(),
  };
});

describe('<ITSystemStatus />', () => {
  beforeEach(() => {
    mockUseStatus.mockReturnValue(Status.mockStatus);
  });

  it('should have links that are tracked via GA', async () => {
    render(<ITSystemStatus />);
    const portalLink = screen.getByRole('link', { name: /more at status portal/ });
    const stickyIncidentLink = screen.getByRole('link', { name: /View details/ });
    userEvent.click(portalLink);
    userEvent.click(stickyIncidentLink);
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });

  it('should have a sticky incident notification', async () => {
    render(<ITSystemStatus />);
    expect(screen.queryByText(/operating normally/)).toBeNull();
    expect(screen.getByText(/View details/)).toBeInTheDocument();
    expect(screen.getAllByText(/G Suite/)).toHaveLength(4);
    expect(screen.getByTestId('sticky-incident-badge')).toBeInTheDocument();
  });

  it('should have some systems not operating normally but hide the operational systems', async () => {
    render(<ITSystemStatus />);
    expect(screen.queryByText(/operating normally/)).toBeNull();
    expect(screen.getByText(/View details/)).toBeInTheDocument();
    expect(screen.getByText(/Major Outage/)).toBeInTheDocument();
    expect(screen.getByText(/Performance Issues/)).toBeInTheDocument();
    expect(screen.queryAllByText(/Operational/)).toHaveLength(0);
  });

  it('should have an all systems operational state', async () => {
    mockUseStatus.mockReturnValue(mockNoData);
    render(<ITSystemStatus />);
    expect(screen.getByText(/operating normally/)).toBeInTheDocument();
    expect(screen.getByText(/more at status portal/)).toBeInTheDocument();
    expect(screen.queryByText(/View details/)).toBeNull();
  });
});

import React from 'react';
import { fireEvent, waitForElement } from '@testing-library/react';
import { render } from '../../util/test-utils';
import { ITSystemStatus } from '../employee-only/ITSystemStatus';
import { mockGAEvent } from '../../setupTests';
import mockStatus from '../../api/__mocks__/status.data';

const mockUseStatus = jest.fn();
const mockNoData = { data: [], loading: false, error: false };

jest.mock('../../api/status', () => ({
  ...jest.requireActual('../../api/status'),
  useStatus: () => mockUseStatus()
}));

describe('<ITSystemStatus />', () => {
  beforeEach(() => {
    mockUseStatus.mockReturnValue(mockStatus);
  });

  it('should have links that are tracked via GA', async () => {
    const { getByText } = render(<ITSystemStatus />);
    const portalLink = getByText(/more at status portal/, { selector: 'a' });
    const stickyIncidentLink = getByText(/View details/, { selector: 'a' });
    fireEvent.click(portalLink);
    fireEvent.click(stickyIncidentLink);
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });

  it('should have a sticky incident notification', async () => {
    const { getByTestId, queryByText, getAllByText } = render(<ITSystemStatus />);
    expect(await queryByText(/operating normally/)).not.toBeInTheDocument();
    expect(await queryByText(/View details/)).toBeInTheDocument();
    expect(getAllByText(/G Suite/)).toHaveLength(4);
    expect(getByTestId('sticky-incident-badge')).toBeInTheDocument();
  });

  it('should have some systems not operating normally', async () => {
    const { getByText, queryByText, getAllByText } = render(<ITSystemStatus />);
    expect(await queryByText(/operating normally/)).not.toBeInTheDocument();
    expect(await queryByText(/View details/)).toBeInTheDocument();
    expect(getByText(/Major Outage/)).toBeInTheDocument();
    expect(getByText(/Performance Issues/)).toBeInTheDocument();
    expect(getAllByText(/Operational/)).toHaveLength(2);
  });

  it('should have an all systems operational state', async () => {
    mockUseStatus.mockReturnValue(mockNoData);
    const { getByText, queryByText } = render(<ITSystemStatus />);
    expect(getByText(/operating normally/)).toBeInTheDocument();
    expect(getByText(/more at status portal/)).toBeInTheDocument();
    const stickyIncidentLink = await queryByText(/View details/);
    expect(stickyIncidentLink).not.toBeInTheDocument();
  });
});

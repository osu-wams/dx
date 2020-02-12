import React from 'react';
import { waitForElement } from '@testing-library/react';
import { render, mockEmployeeUser } from '../../util/test-utils';
import Dashboard from '../Dashboard';
import { Resources } from '@osu-wams/hooks';

const { resourcesCardData } = Resources.mockResources;

const mockUseResourcesByQueue = jest.fn();
jest.mock('@osu-wams/hooks', () => {
  return {
    ...jest.requireActual('@osu-wams/hooks'),
    useResourcesByQueue: () => mockUseResourcesByQueue()
  };
});

describe('<Dashboard />', () => {
  beforeEach(() => {
    mockUseResourcesByQueue.mockReturnValue(resourcesCardData);
  });

  it('renders', async () => {
    const { getByTestId } = render(<Dashboard />);
    expect(getByTestId('student-dashboard-page')).toBeInTheDocument();
  });

  it('should display the title Student Dashboard', async () => {
    const { getByText } = render(<Dashboard />);
    const title = await waitForElement(() => getByText('Student Dashboard'));
    const badge = await waitForElement(() => getByText('Beta'));
    expect(title).toBeInTheDocument();
    expect(badge).toBeInTheDocument();
    expect(badge.closest('a')).toHaveAttribute('href', '/beta');
  });

  it('should display the title Employee Dashboard', async () => {
    const { getByText } = render(<Dashboard />, { user: mockEmployeeUser });
    const title = await waitForElement(() => getByText('Employee Dashboard'));
    expect(title).toBeInTheDocument();
  });
});

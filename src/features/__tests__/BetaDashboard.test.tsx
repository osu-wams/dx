import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '../../util/test-utils';
import BetaDashboard from '../../pages/BetaDashboard';
import { mockGAEvent } from '../../setupTests';
import betaContentMock from '../../api/__mocks__/pageContent.data';
import betaReleaseNotes from '../../api/__mocks__/releaseNotes.data';

const mockUsePageContent = jest.fn();
const mockUseReleaseNotes = jest.fn();

jest.mock('../../api/page-content', () => ({
  usePageContent: () => mockUsePageContent()
}));

jest.mock('../../api/release-notes', () => ({
  useReleaseNotes: () => mockUseReleaseNotes()
}));

beforeEach(() => {
  mockUsePageContent.mockReturnValue(betaContentMock);
  mockUseReleaseNotes.mockReturnValue(betaReleaseNotes);
});

describe('<BetaDashboard />', () => {
  it('should render the beta dashboard page', () => {
    const { getByTestId } = render(<BetaDashboard />);
    expect(getByTestId('betadash-page')).toBeInTheDocument();
  });

  it('should display the title Beta', () => {
    const { getByText } = render(<BetaDashboard />);
    expect(getByText('Beta', { selector: 'h1' })).toBeInTheDocument();
  });

  it('should display "Dashboard Beta" card title with appropriate content', async () => {
    const { findByText } = render(<BetaDashboard />);
    expect(await findByText(/Dashboard Beta/i, { selector: 'h2 span' })).toBeInTheDocument();
    expect(await findByText('Beta Page Title')).toBeInTheDocument();
    expect(await findByText('beta list item', { selector: 'li' })).toBeInTheDocument();
  });

  it('should find the release notes card with appripriate content', async () => {
    const { findByText } = render(<BetaDashboard />);
    expect(await findByText('Test Release Note')).toBeInTheDocument();
    expect(await findByText('Winter test 2019')).toBeInTheDocument();
    expect(await findByText(/test release note body content/i)).toBeInTheDocument();
  });

  it('should have beta resources links that are tracked via GA', () => {
    const { getByText } = render(<BetaDashboard />);
    const oldMyOSU = getByText(/old MyOSU portal/);
    const getHelp = getByText(/Get help/);
    const giveFeedback = getByText(/Give us feedback/);
    userEvent.click(oldMyOSU);
    userEvent.click(getHelp);
    userEvent.click(giveFeedback);
    expect(mockGAEvent).toHaveBeenCalledTimes(3);
  });
});

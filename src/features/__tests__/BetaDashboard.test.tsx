import React from 'react';
import { fireEvent, waitForElement } from '@testing-library/react';
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
  it('should render the beta dashboard page', async () => {
    const { getByTestId } = render(<BetaDashboard />);
    expect(getByTestId('betadash-page')).toBeInTheDocument();
  });

  it('should display the title Beta', async () => {
    const { getByText } = render(<BetaDashboard />);
    await waitForElement(() => getByText('Beta', { selector: 'h1' }));
  });

  it('should display "Dashboard Beta" card title with appropriate content', async () => {
    const { findByText } = render(<BetaDashboard />);
    expect(await findByText(/Dashboard Beta/i, { selector: 'h2 span' })).toBeInTheDocument();
    expect(await findByText('Beta Page Title')).toBeInTheDocument();
    expect(await findByText('beta list item', { selector: 'li' })).toBeInTheDocument();
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
});

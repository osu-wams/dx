import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from 'src/util/test-utils';
import About from 'src/pages/About';
import { mockGAEvent } from 'src/setupTests';
import { PageContents, ReleaseNotes } from '@osu-wams/hooks';

const mockPageContent = PageContents.mockPageContents;
const mockReleaseNotes = ReleaseNotes.mockReleaseNotes;

const mockUsePageContent = jest.fn();
const mockUseReleaseNotes = jest.fn();

jest.mock('@osu-wams/hooks', () => {
  return {
    // @ts-ignore spreading warning
    ...jest.requireActual('@osu-wams/hooks'),
    usePageContent: () => mockUsePageContent(),
    useReleaseNotes: () => mockUseReleaseNotes(),
  };
});

beforeEach(() => {
  mockUsePageContent.mockReturnValue(mockPageContent);
  mockUseReleaseNotes.mockReturnValue(mockReleaseNotes);
});

describe('<About />', () => {
  it('should render the about page', () => {
    const { getByTestId } = render(<About />);
    expect(getByTestId('about-page')).toBeInTheDocument();
  });

  it('should display the title "About MyOregonState"', () => {
    const { getByText } = render(<About />);
    expect(getByText('About MyOregonState', { selector: 'h1' })).toBeInTheDocument();
  });

  it('should display "Dashboard Beta" card title with appropriate content', async () => {
    const { findByText } = render(<About />);
    expect(await findByText(/Dashboard Beta/i, { selector: 'h2 span' })).toBeInTheDocument();
    expect(await findByText('Beta Page Title')).toBeInTheDocument();
    expect(await findByText('beta list item', { selector: 'li' })).toBeInTheDocument();
  });

  it('should find the release notes card with appropriate content', async () => {
    const { findByText } = render(<About />);
    expect(await findByText('Release : Winter test 2019')).toBeInTheDocument();
    expect(await findByText('Test Release Note')).toBeInTheDocument();
    expect(await findByText(/test release note body content/i)).toBeInTheDocument();
  });

  it('should have beta resources links that are tracked via GA', () => {
    const { getByText } = render(<About />);
    const oldMyOSU = getByText(/old MyOSU portal/);
    const getHelp = getByText(/Get help/);
    const giveFeedback = getByText(/Give us feedback/);
    userEvent.click(oldMyOSU);
    userEvent.click(getHelp);
    userEvent.click(giveFeedback);
    expect(mockGAEvent).toHaveBeenCalledTimes(3);
  });
});

import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { render } from 'src/util/test-utils';
import About from 'src/pages/About';
import { mockGAEvent } from 'src/setupTests';

describe('<About />', () => {
  it('should render the about page', () => {
    render(<About />);
    expect(screen.getByTestId('about-page')).toBeInTheDocument();
    expect(screen.getByText('About MyOregonState', { selector: 'h1' })).toBeInTheDocument();
  });

  it('should display loading while data is not present, then it goes away', async () => {
    render(<About />);
    // 2 loading pieces for Release Notes and Page Content
    expect(screen.getAllByText(/loading/i)).toHaveLength(2);

    expect(await screen.findByText('PageContent Title')).toBeInTheDocument();

    // Once data is present, no loading screen should be visible
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  it('should display card with appropriate content', async () => {
    render(<About />);
    expect(await screen.findByText('PageContent Title')).toBeInTheDocument();
    expect(
      await screen.findByText(/This is the PageContent body content/i, { selector: 'p' })
    ).toBeInTheDocument();
  });

  it('should find the release notes card with appropriate content', async () => {
    render(<About />);
    expect(await screen.findByText('Release : Winter test 2019')).toBeInTheDocument();
    expect(await screen.findByText('Test Release Note')).toBeInTheDocument();
    expect(await screen.findByText(/test release note body content/i)).toBeInTheDocument();
  });

  it('should have support resources links that are tracked via GA', () => {
    render(<About />);
    const started = screen.getByText(/getting started/i);
    const getHelp = screen.getByText(/Get help/i);
    const giveFeedback = screen.getByText(/Give us feedback/i);
    userEvent.click(started);
    userEvent.click(getHelp);
    userEvent.click(giveFeedback);
    expect(mockGAEvent).toHaveBeenCalledTimes(3);
  });
});

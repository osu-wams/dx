import React from 'react';
import { renderWithAllContexts as render } from 'src/util/test-utils';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import StudentHolds from '../academic-overview/StudentHolds';
import { alterMock } from 'src/util/test-utils';
import { HOLDS_API } from 'src/mocks/apis';
import { mockGAEvent } from 'src/setupTests';

describe('<StudentHolds />', () => {
  it('should render and have a single hold', async () => {
    render(<StudentHolds />);
    expect(await screen.findByText('Bill is overdue')).toBeInTheDocument();
    expect(await screen.findByText('1')).toBeInTheDocument();
    expect(await screen.findByText('hold on your student account.')).toBeInTheDocument();
    expect(await screen.findByText('pay was due 2 years ago')).toBeInTheDocument();
    const more = await screen.findByText(/learn more about holds/i);
    userEvent.click(more);
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
    const view = await screen.findByText(/view your holds/i);
    userEvent.click(view);
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });

  it('should render and have a multiple holds', async () => {
    alterMock(HOLDS_API, [
      { description: 'blah', reason: null, fromDate: '2020-10-11' },
      { description: 'BobRoss', reason: 'fail', fromDate: '2019-09-01' },
    ]);
    render(<StudentHolds />);

    expect(await screen.findByText('blah')).toBeInTheDocument();
    expect(await screen.findByText('BobRoss')).toBeInTheDocument();
    expect(await screen.findByText('Effective September 1, 2019')).toBeInTheDocument();
    expect(await screen.findByText('Effective October 11, 2020')).toBeInTheDocument();
    expect(await screen.findByText('2')).toBeInTheDocument();
    expect(await screen.findByText('holds on your student account.')).toBeInTheDocument();
    expect(await screen.findByText('View your holds')).toBeInTheDocument();
    expect(await screen.findByText('Learn more about holds')).toBeInTheDocument();
  });

  it('should return appropriate text when data is empty', async () => {
    alterMock(HOLDS_API, []);
    render(<StudentHolds />);

    expect(await screen.findByText('0')).toBeInTheDocument();
    expect(await screen.findByText('holds on your student account.')).toBeInTheDocument();
    expect(screen.queryByText('View your holds')).not.toBeInTheDocument();
    expect(screen.queryByText('Learn more about holds')).not.toBeInTheDocument();
  });
});

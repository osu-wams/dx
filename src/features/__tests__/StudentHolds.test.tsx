import React from 'react';
import { render } from 'src/util/test-utils';
import { screen } from '@testing-library/react';
import StudentHolds from '../academic-overview/StudentHolds';
import { alterMock } from 'src/util/test-utils';
import { HOLDS_API } from 'src/mocks/apis';

describe('<StudentHolds />', () => {
  it('should render and have a single hold', async () => {
    render(<StudentHolds />);
    expect(await screen.findByText('BILL IS OVERDUE')).toBeInTheDocument();
    expect(await screen.findByText('1')).toBeInTheDocument();
    expect(await screen.findByText('hold on your student account.')).toBeInTheDocument();
  });

  it('should render and have a multiple holds', async () => {
    alterMock(HOLDS_API, [
      { description: 'BLAH', toDate: '2020-10-11' },
      { description: 'BOBROSS', toDate: '2019-09-01' },
    ]);
    render(<StudentHolds />);

    expect(await screen.findByText('BLAH')).toBeInTheDocument();
    expect(await screen.findByText('BOBROSS')).toBeInTheDocument();
    expect(await screen.findByText('Effective September 1, 2019')).toBeInTheDocument();
    expect(await screen.findByText('Effective October 11, 2020')).toBeInTheDocument();
    expect(await screen.findByText('2')).toBeInTheDocument();
    expect(await screen.findByText('holds on your student account.')).toBeInTheDocument();
  });

  it('should return appropriate text when data is empty', async () => {
    alterMock(HOLDS_API, []);
    render(<StudentHolds />);

    expect(await screen.findByText('0')).toBeInTheDocument();
    expect(await screen.findByText('holds on your student account.')).toBeInTheDocument();
  });
});

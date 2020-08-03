import React from 'react';
import { render } from 'src/util/test-utils';
import { screen } from '@testing-library/react';
import StudentHolds from '../academic-overview/StudentHolds';
import { alterMock } from 'src/util/test-utils';

const holdApi = '/api/student/holds';

describe('<StudentHolds />', () => {
  it('should render and have a single hold', async () => {
    render(<StudentHolds />);
    expect(await screen.findByText('Bill is overdue')).toBeInTheDocument();
    expect(await screen.findByText('1')).toBeInTheDocument();
    expect(await screen.findByText('hold on your student account.')).toBeInTheDocument();
  });

  it('should render and have a multiple holds', async () => {
    alterMock('/api/student/holds', [{ description: 'blah' }, { description: 'BobRoss' }]);
    render(<StudentHolds />);

    expect(await screen.findByText('blah')).toBeInTheDocument();
    expect(await screen.findByText('BobRoss')).toBeInTheDocument();
    expect(await screen.findByText('2')).toBeInTheDocument();
    expect(await screen.findByText('holds on your student account.')).toBeInTheDocument();
  });

  it('should return appropriate text when data is empty', async () => {
    alterMock(holdApi, []);
    render(<StudentHolds />);

    expect(await screen.findByText('0')).toBeInTheDocument();
    expect(await screen.findByText('holds on your student account.')).toBeInTheDocument();
  });
});

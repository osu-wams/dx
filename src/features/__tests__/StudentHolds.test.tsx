import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import StudentHolds from '../academic-overview/StudentHolds';

const mockGetAccountHolds = jest.fn();

jest.mock('../../api/student/holds', () => ({
  getAccountHolds: () => mockGetAccountHolds()
}));

describe('<StudentHolds />', () => {
  it('should render and have a single hold', async () => {
    mockGetAccountHolds.mockResolvedValue(Promise.resolve([{ description: 'blah' }]));
    const { getByText } = render(<StudentHolds />);
    const element = await waitForElement(() => getByText('blah'));
    expect(element).toBeInTheDocument();
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('hold on your student account.')).toBeInTheDocument();
  });

  it('should render and have a multiple holds', async () => {
    mockGetAccountHolds.mockResolvedValue(
      Promise.resolve([{ description: 'blah' }, { description: 'BobRoss' }])
    );
    const { getByText } = render(<StudentHolds />);
    const element = await waitForElement(() => getByText('blah'));
    expect(element).toBeInTheDocument();
    expect(getByText('BobRoss')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('holds on your student account.')).toBeInTheDocument();
  });

  it('should return appropriate text when data is empty', async () => {
    mockGetAccountHolds.mockResolvedValue(Promise.resolve([]));
    const { getByText } = render(<StudentHolds />);
    const element = await waitForElement(() => getByText('0'));
    expect(element).toBeInTheDocument();
    expect(getByText('holds on your student account.')).toBeInTheDocument();
  });
});

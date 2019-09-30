import React from 'react';
import { waitForElement } from '@testing-library/react';
import { render } from '../../util/test-utils';
import StudentHolds from '../academic-overview/StudentHolds';

const mockUseAccountHolds = jest.fn();

jest.mock('../../api/student/holds', () => ({
  useAccountHolds: () => mockUseAccountHolds()
}));

describe('<StudentHolds />', () => {
  it('should render and have a single hold', async () => {
    mockUseAccountHolds.mockReturnValue({
      data: [{ description: 'blah' }],
      loading: false,
      error: false
    });
    const { getByText } = render(<StudentHolds />);
    const element = await waitForElement(() => getByText('blah'));
    expect(element).toBeInTheDocument();
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('hold on your student account.')).toBeInTheDocument();
  });

  it('should render and have a multiple holds', async () => {
    mockUseAccountHolds.mockReturnValue({
      data: [{ description: 'blah' }, { description: 'BobRoss' }],
      loading: false,
      error: false
    });
    const { getByText } = render(<StudentHolds />);
    const element = await waitForElement(() => getByText('blah'));
    expect(element).toBeInTheDocument();
    expect(getByText('BobRoss')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('holds on your student account.')).toBeInTheDocument();
  });

  it('should return appropriate text when data is empty', async () => {
    mockUseAccountHolds.mockReturnValue({ data: [], loading: false, error: false });
    const { getByText } = render(<StudentHolds />);
    const element = await waitForElement(() => getByText('0'));
    expect(element).toBeInTheDocument();
    expect(getByText('holds on your student account.')).toBeInTheDocument();
  });
});

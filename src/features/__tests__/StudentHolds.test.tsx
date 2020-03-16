import React from 'react';
import { render } from '../../util/test-utils';
import StudentHolds from '../academic-overview/StudentHolds';
import { Student } from '@osu-wams/hooks';

const mockUseHolds = jest.fn();
const mockHolds = Student.Holds.mockHolds;

jest.mock('@osu-wams/hooks', () => {
  return {
    ...jest.requireActual('@osu-wams/hooks'),
    useHolds: () => mockUseHolds()
  };
});

describe('<StudentHolds />', () => {
  it('should render and have a single hold', async () => {
    mockUseHolds.mockReturnValue(mockHolds);
    const { getByText } = render(<StudentHolds />);
    const element = getByText('Bill is overdue');
    expect(element).toBeInTheDocument();
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('hold on your student account.')).toBeInTheDocument();
  });

  it('should render and have a multiple holds', async () => {
    mockUseHolds.mockReturnValue({
      data: [{ description: 'blah' }, { description: 'BobRoss' }],
      loading: false,
      error: false
    });
    const { getByText } = render(<StudentHolds />);
    const element = getByText('blah');
    expect(element).toBeInTheDocument();
    expect(getByText('BobRoss')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('holds on your student account.')).toBeInTheDocument();
  });

  it('should return appropriate text when data is empty', async () => {
    mockUseHolds.mockReturnValue({ data: [], loading: false, error: false });
    const { getByText } = render(<StudentHolds />);
    const element = getByText('0');
    expect(element).toBeInTheDocument();
    expect(getByText('holds on your student account.')).toBeInTheDocument();
  });
});

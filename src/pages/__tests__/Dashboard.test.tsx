import React from 'react';
import { render, mockEmployeeUser } from 'src/util/test-utils';
import Dashboard from '../Dashboard';
import { Resources } from '@osu-wams/hooks';

const { resourcesCardData } = Resources.mockResources;

const mockUseResourcesByQueue = jest.fn();
jest.mock('@osu-wams/hooks', () => {
  return {
    ...jest.requireActual('@osu-wams/hooks'),
    useResourcesByQueue: () => mockUseResourcesByQueue(),
  };
});

describe('<Dashboard />', () => {
  beforeEach(() => {
    mockUseResourcesByQueue.mockReturnValue(resourcesCardData);
  });

  it('renders', async () => {
    const { getByTestId } = render(<Dashboard />);
    expect(getByTestId('student-dashboard-page')).toBeInTheDocument();
  });

  it('should find "Courses" in the Student Dashboard', async () => {
    const { findByText } = render(<Dashboard />);
    const courses = await findByText('Courses');
    expect(courses).toBeInTheDocument();
  });

  it('should find Employee Tools card', () => {
    const { getByText } = render(<Dashboard />, { user: mockEmployeeUser });
    const empcenter = getByText('Employee Tools');
    expect(empcenter).toBeInTheDocument();
  });
});

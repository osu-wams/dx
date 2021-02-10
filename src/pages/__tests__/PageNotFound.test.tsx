import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render, mockEmployeeUser, mockGradStudentEmployeeUser } from 'src/util/test-utils';
import { mockGAEvent } from 'src/setupTests';
import PageNotFound from '../PageNotFound';

describe('404 page', () => {
  it('renders', () => {
    const { getByTestId } = render(<PageNotFound />);
    expect(getByTestId('404-page')).toBeInTheDocument();
  });

  it('has clickable links to dashboard and support page', () => {
    const { getByText } = render(<PageNotFound />);
    const dashboard = getByText(/to dashboard/);
    fireEvent.click(dashboard);
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });
});

describe('navigation link test', () => {
  it('correct nav link for employee user', () => {
    const { getByTestId } = render(<PageNotFound />, { user: mockEmployeeUser });
    const link = getByTestId('nav-link');
    fireEvent.click(link);
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
    expect(link).toHaveAttribute('href', '/employee');
  });

  it('correct nav link for student user', () => {
    const { getByTestId } = render(<PageNotFound />, { user: mockGradStudentEmployeeUser });
    const link = getByTestId('nav-link');
    fireEvent.click(link);
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
    expect(link).toHaveAttribute('href', '/student');
  });
});

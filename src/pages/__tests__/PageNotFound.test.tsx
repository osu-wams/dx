import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  renderWithAllContexts as render,
  mockEmployeeUser,
  mockGradStudentEmployeeUser,
} from 'src/util/test-utils';
import { mockGAEvent } from 'src/setupTests';
import PageNotFound from '../PageNotFound';

describe('404 page', () => {
  it('renders', () => {
    render(<PageNotFound />);
    expect(screen.getByTestId('404-page')).toBeInTheDocument();
  });

  it('has clickable links to dashboard and support page', () => {
    render(<PageNotFound />);
    const dashboard = screen.getByText(/to dashboard/);
    userEvent.click(dashboard);
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });
});

describe('navigation link test', () => {
  it('correct nav link for employee user', () => {
    render(<PageNotFound />, { user: mockEmployeeUser });
    const link = screen.getByTestId('nav-link');
    userEvent.click(link);
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
    expect(link).toHaveAttribute('href', '/employee');
  });

  it('correct nav link for student user', () => {
    render(<PageNotFound />, { user: mockGradStudentEmployeeUser });
    const link = screen.getByTestId('nav-link');
    userEvent.click(link);
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
    expect(link).toHaveAttribute('href', '/student');
  });
});

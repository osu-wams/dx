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
import { BrowserRouter } from 'react-router-dom';

describe('404 page', () => {
  it('renders', () => {
    render(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>
    );
    expect(screen.getByTestId('404-page')).toBeInTheDocument();
  });

  it('has clickable links to dashboard and support page', () => {
    render(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>
    );
    const dashboard = screen.getByText(/to dashboard/);
    userEvent.click(dashboard);
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });
});

describe('navigation link test', () => {
  it('correct nav link for employee user', () => {
    render(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>,
      { user: mockEmployeeUser }
    );
    const link = screen.getByTestId('nav-link');
    userEvent.click(link);
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
    expect(link).toHaveAttribute('href', '/employee');
  });

  it('correct nav link for student user', () => {
    render(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>,
      { user: mockGradStudentEmployeeUser }
    );
    const link = screen.getByTestId('nav-link');
    userEvent.click(link);
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
    expect(link).toHaveAttribute('href', '/student');
  });
});

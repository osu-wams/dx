import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { mockEmployeeUser, renderWithAllContexts as render } from 'src/util/test-utils';
import MainNav from '../MainNav/';
import { mockGAEvent } from 'src/setupTests';
import { BrowserRouter } from 'react-router-dom';

describe('student main navigation', () => {
  it('Main Navigation Links for students are to be present and tracked in Google Analytics', async () => {
    render(
      <BrowserRouter>
        <MainNav />
      </BrowserRouter>
    );

    const home = screen.getByText('Overview');
    const academics = screen.getByText('Academics');
    const finances = screen.getByText('Finances');
    const menu = screen.getByText('Menu');
    userEvent.click(home);
    userEvent.click(academics);
    userEvent.click(finances);
    userEvent.click(menu);

    expect(mockGAEvent).toHaveBeenCalledTimes(4);
  });

  it('Main Navigation in desktop has "Resources" link tracked in Google Analytics', async () => {
    render(
      <BrowserRouter>
        <MainNav />
      </BrowserRouter>,
      { isDesktop: true }
    );

    const resources = screen.getByText('Resources');
    const menu = screen.queryByText('Menu');

    expect(resources).toBeInTheDocument();
    expect(menu).not.toBeInTheDocument();

    userEvent.click(resources);
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });
});

it('Main Navigation for Employee visible and tracked in Google Analytics', async () => {
  render(
    <BrowserRouter>
      <MainNav />
    </BrowserRouter>,
    {
      user: mockEmployeeUser,
    }
  );

  const home = screen.getByText('Overview');
  const resources = screen.getByText('Resources');

  expect(home).toBeInTheDocument();
  expect(resources).toBeInTheDocument();

  // Not present in employee nav
  expect(screen.queryByText('More')).not.toBeInTheDocument();

  userEvent.click(home);
  userEvent.click(resources);

  expect(mockGAEvent).toHaveBeenCalledTimes(2);
});

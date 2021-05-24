import React from 'react';
import { screen } from '@testing-library/react';
import Finances from '../Finances';
import { render, alterMock } from 'src/util/test-utils';
import { ANNOUNCEMENTS_API } from 'src/mocks/apis';

describe('Finances page with standard data', () => {
  it('should render the finances page', async () => {
    render(<Finances />);
    await screen.findByText('Finances');
    const page = await screen.findByTestId('finances-page');
    expect(page).toBeInTheDocument();
  });

  it('should render Announcements and event cards when at least one event is present', async () => {
    render(<Finances />);
    await screen.findByText('Finances');
    await screen.findByTestId('finances-announcements'); //will throw if no results
    await screen.findAllByTestId('eventcard'); //will throw if no results
  });

  it('should not render Announcements with no events', async () => {
    alterMock(ANNOUNCEMENTS_API, []);
    render(<Finances />);
    await screen.findByText('Student Account Balance');
    expect(() => screen.getByTestId('finances-announcements')).toThrow(); //will throw if announcements is being displayed
  });
});

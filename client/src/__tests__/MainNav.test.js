import React from 'react';
import { renderWithRouter } from '../componentTestUtils';
import { render, wait, fireEvent } from 'react-testing-library';
import App from '../App';

test('All routes working and rendering content', async () => {
  const {
    getByTestId,
    history: { navigate }
  } = renderWithRouter(<App />);

  // Switch to test ids later possibly
  expect(getByTestId('dashboard-page')).toBeInTheDocument();

  // to the page using the navigate function returned from the history object.
  await navigate('/academics');
  expect(getByTestId('academics-page')).toBeInTheDocument();

  await navigate('/finances');
  expect(getByTestId('finances-page')).toBeInTheDocument();

  await navigate('/events');
  expect(getByTestId('events-page')).toBeInTheDocument();

  await navigate('/services');
  expect(getByTestId('services-page')).toBeInTheDocument();

  await navigate('/profile');
  expect(getByTestId('profile-page')).toBeInTheDocument();

  await navigate('/');
  expect(getByTestId('dashboard-page')).toBeInTheDocument();

  await navigate('/non-existent-404-page');
  expect(getByTestId('404-page')).toBeInTheDocument();
});

test('Click navigation', async () => {
  const { container, getByText, getByTestId } = render(<App />);

  // maybe switch to test ids for the pages
  expect(container.innerHTML).toMatch('<h2>My OSU Dashboard</h2>');

  fireEvent.click(getByText(/academics/i));
  await wait(() => expect(getByTestId('academics-page')).toBeInTheDocument());

  fireEvent.click(getByText(/finances/i));
  await wait(() => expect(getByTestId('finances-page')).toBeInTheDocument());

  fireEvent.click(getByText(/events/i));
  await wait(() => expect(getByTestId('events-page')).toBeInTheDocument());

  fireEvent.click(getByText(/services/i));
  await wait(() => expect(getByTestId('services-page')).toBeInTheDocument());

  fireEvent.click(getByText(/Dashboard/i));
  await wait(() => expect(getByTestId('dashboard-page')).toBeInTheDocument());
});

test('404 page or other broken link within app', () => {
  const { getByTestId } = renderWithRouter(<App />, {
    route: '/some-404-route'
  });

  expect(getByTestId('404-page')).toBeInTheDocument();
});

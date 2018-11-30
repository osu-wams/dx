import React from 'react';
import { render } from '../componentTestUtils';
import { fireEvent, wait, waitForElement } from 'react-testing-library';
import Header from '../components/layout/Header';
import App from '../App';

test('renders', () => {
  render(<Header />);
});

test('Reach the profile page from the dropdown menu', async () => {
  // Test works consistently when you render the header in addition to the full App
  render(<Header />);

  const { getByText, getByTestId, queryByTestId } = render(<App />);

  expect(getByTestId('dashboard-page')).toBeInTheDocument();

  //Profile icon click - this text is visually hidden
  fireEvent.click(getByTestId('user-btn'));
  const profileBtn = await waitForElement(() => getByText(/view profile/i));

  // Click on the profile link from dropdwon
  // await necessary, even though we are waiting for element above  ¯\_(ツ)_/¯
  await wait(() => fireEvent.click(profileBtn));

  // Check to make sure the component loaded and dashboard is gone
  await wait(() => expect(getByTestId('profile-page')).toBeInTheDocument());
  expect(queryByTestId('dashboard-page')).not.toBeInTheDocument();
});

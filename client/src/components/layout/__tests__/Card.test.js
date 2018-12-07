import { render, fireEvent, wait } from '../../../componentTestUtils';
import React from 'react';
import { Card, CardHeader, CardHeaderTitle, CardHeaderSubtitle, CardContent } from '../Card';

const DefaultCard = () => (
  <Card>
    <CardHeader>
      <div>
        <CardHeaderTitle>Default Card</CardHeaderTitle>
        <CardHeaderSubtitle>Subtitle</CardHeaderSubtitle>
      </div>
    </CardHeader>
    <CardContent>
      <p>DefaultCard Content</p>
    </CardContent>
  </Card>
);

const StratosphereCard = () => (
  <Card color="stratosphere">
    <CardHeader>
      <div>
        <CardHeaderTitle>Stratosphere Card</CardHeaderTitle>
        <CardHeaderSubtitle>Subtitle</CardHeaderSubtitle>
      </div>
    </CardHeader>
    <CardContent>
      <p>DefaultCard Content</p>
    </CardContent>
  </Card>
);

const SimpleCard = () => (
  <Card>
    <CardHeader>
      <div>
        <CardHeaderTitle>Header Button</CardHeaderTitle>
        <CardHeaderSubtitle>Subtitle</CardHeaderSubtitle>
      </div>
    </CardHeader>
    <CardContent>
      <p>Card Content</p>
    </CardContent>
  </Card>
);

it('DefaultCard card styles and structure are present', () => {
  const { container } = render(<DefaultCard />);
  expect(container.firstChild).toMatchSnapshot();
});

it('Stratosphere card styles and structure are present', () => {
  const { container } = render(<StratosphereCard />);
  expect(container.firstChild).toMatchSnapshot();
});

it('SimpleCard Orange card styles and structure are present', () => {
  const { container } = render(<SimpleCard />);
  expect(container.firstChild).toMatchSnapshot();
});

it('aria-expanded toggles on click', async () => {
  const { getByText } = render(<SimpleCard />);

  // Confirm the cardheader-clickable class is present on the button
  const button = getByText(/header button/i).parentElement.parentElement;
  await wait(() => expect(button).toHaveClass('cardheader-clickable'));
  // Card content is hidden by default
  const cardContent = getByText('Card Content').parentElement;
  expect(cardContent).toHaveAttribute('aria-expanded', 'false');

  // Clicking the button sets aria-expanded to true
  fireEvent.click(button);
  expect(cardContent).toHaveAttribute('aria-expanded', 'true');

  // Clicking again sets it to false
  fireEvent.click(button);
  expect(cardContent).toHaveAttribute('aria-expanded', 'false');
});

/* eslint-disable testing-library/no-node-access, testing-library/no-container */
import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithAllContexts as render } from 'src/util/test-utils';
import { Color } from '@osu-wams/theme';
import {
  ExternalLink,
  HighlightExternalLink,
  InternalLink,
  SimpleExternalLink,
  SimpleInternalLink,
  SimpleModalLink,
} from '../Link';
import { BrowserRouter } from 'react-router-dom';

const Default = () => <ExternalLink href="https://oregonstate.edu">Default link</ExternalLink>;

const BackgroundColor = () => (
  <ExternalLink bg={Color['orange-400']} href="https://oregonstate.edu">
    Orange Background link
  </ExternalLink>
);

const TextColor = () => (
  <ExternalLink bg={Color['pine-400']} href="https://oregonstate.edu">
    Green Text link
  </ExternalLink>
);

const BothColors = () => (
  <ExternalLink bg={Color['orange-400']} fg={Color.white} href="https://oregonstate.edu">
    Orange Background with White text
  </ExternalLink>
);

const SimpleExtLink = () => (
  <SimpleExternalLink href="https://oregonstate.edu">
    Simple External Link Sample
  </SimpleExternalLink>
);

const InternalLinkBothColors = () => (
  <InternalLink bg={Color['orange-400']} fg={Color.white} to="https://oregonstate.edu">
    Orange Background with White text
  </InternalLink>
);

const SimpleIntLink = () => (
  <SimpleInternalLink to="https://oregonstate.edu">Simple Internal Link Sample</SimpleInternalLink>
);

const HighlightExtLink = () => (
  <HighlightExternalLink fg={Color['orange-400']} href="https://oregonstate.edu">
    Highlighted external link
  </HighlightExternalLink>
);

const SimpleModLink = () => <SimpleModalLink>Simple Modal Link</SimpleModalLink>;

// Snapshot tests to make sure our props are carried through
test('Default options', () => {
  const { container } = render(
    <BrowserRouter>
      <Default />
    </BrowserRouter>
  );
  expect(container).toMatchSnapshot();
});

test('Background color is orange-400', () => {
  const { container } = render(
    <BrowserRouter>
      <BackgroundColor />
    </BrowserRouter>
  );
  expect(container).toMatchSnapshot();
});

test('Text color is pine-400', () => {
  const { container } = render(
    <BrowserRouter>
      <TextColor />
    </BrowserRouter>
  );
  expect(container).toMatchSnapshot();
});

test('Background is orange-400, and text is white', () => {
  const { container } = render(
    <BrowserRouter>
      <BothColors />
    </BrowserRouter>
  );
  expect(container).toMatchSnapshot();
});

test('Make sure ExternalLink target="_blank" attribute is passed down', () => {
  render(
    <BrowserRouter>
      <Default />
    </BrowserRouter>
  );
  expect(screen.getByRole('link', { name: 'Default link' })).toHaveAttribute('target', '_blank');
});

test('Make sure SimpleExternalLink target="_blank" attribute is passed down', () => {
  render(
    <BrowserRouter>
      <SimpleExtLink />
    </BrowserRouter>
  );
  expect(screen.getByRole('link', { name: 'Simple External Link Sample' })).toHaveAttribute(
    'target',
    '_blank'
  );
});

test('Make sure SVG image is present', () => {
  const { container } = render(
    <BrowserRouter>
      <TextColor />
    </BrowserRouter>
  );
  const svg = container.querySelector('svg');

  expect(container).toContainElement(svg);
});

test('InternalLink background is orange-400 and text is white', () => {
  const { container } = render(
    <BrowserRouter>
      <InternalLinkBothColors />
    </BrowserRouter>
  );
  expect(container).toMatchSnapshot();
});

test('Test SimpleInternalLink props are passed down', () => {
  const { container } = render(
    <BrowserRouter>
      <SimpleIntLink />
    </BrowserRouter>
  );
  expect(container).toMatchSnapshot();
});

test('Highlighted text is orange', () => {
  const { container } = render(
    <BrowserRouter>
      <HighlightExtLink />
    </BrowserRouter>
  );
  expect(container).toMatchSnapshot();
});

test('Basic SimpleModalLink test', () => {
  const { container } = render(
    <BrowserRouter>
      <SimpleModLink />
    </BrowserRouter>
  );
  expect(container).toMatchSnapshot();
});

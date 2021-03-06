/* eslint-disable testing-library/no-node-access, testing-library/no-container */
import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithAllContexts as render } from 'src/util/test-utils';
import { Color } from '@osu-wams/theme';
import { ExternalLink, SimpleExternalLink } from '../Link';

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

// Snapshot tests to make sure our props are carried through
test('Default options', () => {
  const { container } = render(<Default />);
  expect(container).toMatchSnapshot();
});

test('Background color is orange-400', () => {
  const { container } = render(<BackgroundColor />);
  expect(container).toMatchSnapshot();
});

test('Text color is pine-400', () => {
  const { container } = render(<TextColor />);
  expect(container).toMatchSnapshot();
});

test('Background is orange-400, and text is white', () => {
  const { container } = render(<BothColors />);
  expect(container).toMatchSnapshot();
});

test('Make sure ExternalLink target="_blank" attribute is passed down', () => {
  render(<Default />);
  expect(screen.getByRole('link', { name: 'Default link' })).toHaveAttribute('target', '_blank');
});

test('Make sure SimpleExternalLink target="_blank" attribute is passed down', () => {
  render(<SimpleExtLink />);
  expect(screen.getByRole('link', { name: 'Simple External Link Sample' })).toHaveAttribute(
    'target',
    '_blank'
  );
});

test('Make sure SVG image is present', () => {
  const { container } = render(<TextColor />);
  const svg = container.querySelector('svg');

  expect(container).toContainElement(svg);
});

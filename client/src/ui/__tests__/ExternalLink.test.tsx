import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-testing-library';
import { Color } from '../../theme';
import ExternalLink from '../ExternalLink';

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

test('Make sure target="_blank" attribute is passed down', () => {
  const { container } = render(<Default />);

  expect(container.firstChild).toHaveAttribute('target', '_blank');
});

test('Make sure SVG image is present', () => {
  const { container } = render(<Default />);
  const svg = container.querySelector('svg');

  expect(container).toContainElement(svg);
});

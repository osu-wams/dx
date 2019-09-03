import React from 'react';
import { render } from '../../util/test-utils';
import Button, { CloseButton } from '../Button';
import { Color } from '../../theme';

const DefaultBtn = () => <Button>I am a button</Button>;

const FgBtn = () => <Button fg={Color['pine-400']}>I am a button with Pine foreground</Button>;

const BgBtn = () => <Button bg={Color['pine-400']}>I am a button with Pine background</Button>;

const SmallBtn = () => <Button btnSize="small">I am a button small button</Button>;

const LargeBtn = () => <Button btnSize="large">I am a large small button</Button>;

const CloseBtn = () => <CloseButton>I am a button</CloseButton>;

const SuperBtn = () => (
  <Button bg={Color['stratosphere-400']} fg={Color['neutral-200']} btnSize="large">
    I am a super button
  </Button>
);

it('Renders default CloseButton with the SVG close icon', () => {
  const { container } = render(<CloseBtn />);

  expect(container.firstChild).toMatchSnapshot();
});

it('Renders a button with Pine background and default size and foreground', () => {
  const { container } = render(<BgBtn />);

  expect(container.firstChild).toMatchSnapshot();
});
it('Renders a default button with orange background and white foreground', () => {
  const { container } = render(<DefaultBtn />);

  expect(container.firstChild).toMatchSnapshot();
});

it('Renders a button with Pine foreground and default size and background', () => {
  const { container } = render(<FgBtn />);

  expect(container.firstChild).toMatchSnapshot();
});

it('Renders a small button with default colors', () => {
  const { container } = render(<SmallBtn />);

  expect(container.firstChild).toMatchSnapshot();
});

it('Renders a large button with default colors', () => {
  const { container } = render(<LargeBtn />);

  expect(container.firstChild).toMatchSnapshot();
});

it('Renders a super button with all the props changed: bg, fg, size', () => {
  const { container } = render(<SuperBtn />);

  expect(container.firstChild).toMatchSnapshot();
});

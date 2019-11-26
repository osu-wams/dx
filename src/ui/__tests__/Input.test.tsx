import React from 'react';
import { render } from '../../util/test-utils';
import Label from '../Label';
import Input from '../Input';

const SmallInput = () => (
  <div>
    <Label htmlFor="small">
      Small
      <Input type="text" id="small" osuSize="small" />
    </Label>
  </div>
);

const NormalInput = () => (
  <div>
    <Label htmlFor="normal">
      Normal
      <Input type="text" id="normal" />
    </Label>
  </div>
);

const LargeInput = () => (
  <div>
    <Label htmlFor="large">
      Large
      <Input type="text" id="large" osuSize="large" />
    </Label>
  </div>
);

test('SmallInput gets rendered with small font size CSS', () => {
  const { container } = render(<SmallInput />);
  expect(container.firstChild).toMatchSnapshot();
});

test('NormalInput gets rendered with default font size CSS', () => {
  const { container } = render(<NormalInput />);
  expect(container.firstChild).toMatchSnapshot();
});

test('LargeInput gets rendered with large font size CSS', () => {
  const { container } = render(<LargeInput />);
  expect(container.firstChild).toMatchSnapshot();
});

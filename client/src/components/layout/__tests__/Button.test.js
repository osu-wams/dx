import React from 'react';
import { render } from '../../../componentTestUtils';
import Button from '../Button';

const SmallButton = () => (
  <div>
    <Button type="button" size="small">
      Small
    </Button>
  </div>
);

const NormalButton = () => (
  <div>
    <Button type="button">Normal</Button>
  </div>
);

const LargeButton = () => (
  <div>
    <Button type="button" size="large">
      Large
    </Button>
  </div>
);

const OutlinelButton = () => (
  <div>
    <Button type="button" outline>
      Outline Normal
    </Button>
  </div>
);

const StratBgButton = () => (
  <div>
    <Button type="button" bg="stratosphere">
      Stratosphere
    </Button>
  </div>
);

const CancelButton = () => (
  <div>
    <Button type="button" bg="dusk" fg="dusk" outline>
      BG, FG and outline
    </Button>
  </div>
);

test('SmallButton gets rendered with small font size CSS', () => {
  const { container } = render(<SmallButton />);
  expect(container.firstChild).toMatchSnapshot();
});

test('NormalButton gets rendered with default font size CSS', () => {
  const { container } = render(<NormalButton />);
  expect(container.firstChild).toMatchSnapshot();
});

test('LargeButton gets rendered with large font size CSS', () => {
  const { container } = render(<LargeButton />);
  expect(container.firstChild).toMatchSnapshot();
});

test('OutlineButton gets rendered with transparent background and colored border', () => {
  const { container } = render(<OutlinelButton />);
  expect(container.firstChild).toMatchSnapshot();
});

test('StratBgButton gets rendered with stratosphere background color', () => {
  const { container } = render(<StratBgButton />);
  expect(container.firstChild).toMatchSnapshot();
});

test('CancelButton gets rendered with FG prop, BG prop and outline prop', () => {
  const { container } = render(<CancelButton />);
  expect(container.firstChild).toMatchSnapshot();
});

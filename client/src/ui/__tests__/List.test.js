import React from 'react';
import { render } from '../../componentTestUtils';
import List from '../List';

const SmallList = () => (
  <div>
    <List size="small">
      <li>Small</li>
      <li>Small</li>
    </List>
  </div>
);

const NormalList = () => (
  <div>
    <List>
      <li>Normal</li>
      <li>Normal</li>
    </List>
  </div>
);

const LargeList = () => (
  <div>
    <List size="large">
      <li>Large</li>
      <li>Large</li>
    </List>
  </div>
);

test('SmallList gets rendered with small font size CSS', () => {
  const { container } = render(<SmallList />);
  expect(container.firstChild).toMatchSnapshot();
});

test('NormalList gets rendered with default font size CSS', () => {
  const { container } = render(<NormalList />);
  expect(container.firstChild).toMatchSnapshot();
});

test('LargeList gets rendered with large font size CSS', () => {
  const { container } = render(<LargeList />);
  expect(container.firstChild).toMatchSnapshot();
});

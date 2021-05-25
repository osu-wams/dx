import React from 'react';
import { renderWithAllContexts as render } from 'src/util/test-utils';
import { Bubble, BubbleExternalLink, BubbleInternalLink } from '../Bubble';

it('Renders default bubble', () => {
  const { container } = render(<Bubble>Bubble text here</Bubble>);
  expect(container).toMatchSnapshot();
});

it('Renders internal link bubble', () => {
  const { container } = render(
    <BubbleInternalLink>Bubble internal link text here</BubbleInternalLink>
  );
  expect(container).toMatchSnapshot();
});

it('Renders external link bubble', () => {
  const { container } = render(
    <BubbleExternalLink>Bubble external link text here</BubbleExternalLink>
  );
  expect(container).toMatchSnapshot();
});

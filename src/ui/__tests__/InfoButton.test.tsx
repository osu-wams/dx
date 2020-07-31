import React from 'react';
import { render } from 'src/util/test-utils';
import { InfoButton } from '../Button';
import { infoButtonState } from 'src/state/application';

it('does not render an info button because no id is supplied', () => {
  const { container } = render(<InfoButton />);

  expect(container.firstChild).toMatchSnapshot();
});

describe('with an application state provided', () => {
  const mockInitialState = jest.fn();

  beforeEach(() => {
    mockInitialState.mockReturnValue([
      {
        state: infoButtonState,
        value: [{ content: 'Info Button Content', id: 'valid-id', title: 'Info Button Title' }],
      },
    ]);
  });

  it('renders an info button ', () => {
    const { container } = render(<InfoButton infoButtonId="valid-id" />, {
      initialStates: mockInitialState(),
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('does not render an info button with an invalid id', () => {
    const { container } = render(<InfoButton infoButtonId="missing-id" />, {
      initialStates: mockInitialState(),
    });
    expect(container.firstChild).toMatchSnapshot();
  });
});

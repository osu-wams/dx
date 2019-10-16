import React from 'react';
import { render } from '../../util/test-utils';
import PageTitle from '../PageTitle';

test('Should render without a badge', () => {
  const { getByText } = render(<PageTitle title="Bob Ross" />);
  expect(getByText('Bob Ross')).toBeInTheDocument();
});

test('Should render with a badge', () => {
  const { getByText } = render(
    <PageTitle title="Bob Ross" badge={{ title: 'RIP', href: '/blah' }} />
  );
  expect(getByText('Bob Ross')).toBeInTheDocument();
  expect(getByText('RIP')).toBeInTheDocument();
  expect(getByText('RIP').closest('a')).toHaveAttribute('href', '/blah');
});

test('Should render with a badge without a link', () => {
  const { getByText } = render(<PageTitle title="Bob Ross" badge={{ title: 'RIP' }} />);
  expect(getByText('Bob Ross')).toBeInTheDocument();
  expect(getByText('RIP')).toBeInTheDocument();
  expect(getByText('RIP').closest('a')).toHaveAttribute('href', '#');
});
import React from 'react';
import { render } from '../../util/test-utils';
import PageTitle from '../PageTitle';
import { mockGAEvent } from '../../setupTests';
import { fireEvent } from '@testing-library/dom';

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
  expect(getByText('RIP').closest('a')).not.toHaveAttribute('href');
});

test('Should render with a badge, a link, and event tracker', () => {
  const { getByText } = render(
    <PageTitle
      title="Bob Ross"
      badge={{
        title: 'RIP',
        href: '/blah',
        eventCategory: 'beta',
        eventAction: 'Blah link clicked'
      }}
    />
  );
  const ripLink = getByText('RIP');
  expect(getByText('Bob Ross')).toBeInTheDocument();
  expect(ripLink).toBeInTheDocument();
  expect(ripLink.closest('a')).toHaveAttribute('href', '/blah');
  fireEvent.click(ripLink);
  expect(mockGAEvent).toHaveBeenCalled();
});

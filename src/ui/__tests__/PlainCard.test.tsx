import React from 'react';
import { render } from '../../util/test-utils';
import PlainCard from '../PlainCard';

const Plain = () => (
  <PlainCard title="Plain Card Title">
    <p data-testid='paragraph' >Can have any children inside</p>
    <span data-testid='span' >Any element can work</span>
  </PlainCard>
);

test('Should render with children', () => {
  const { getByTestId } = render(<Plain />);
  expect(getByTestId('paragraph')).toBeInTheDocument();
  expect(getByTestId('span')).toBeInTheDocument();
});

test('Title in rendered element should be "Plain Card Title"', () => {
  const { getByText } = render(<Plain />);
  expect(getByText('Plain Card Title')).toBeInTheDocument();
});

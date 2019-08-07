import React from 'react';
import { render } from '@testing-library/react';
import PlainCard from '../PlainCard';

const Plain = () => (
  <PlainCard title="Plain Card Title">
    <p>Can have any children inside</p>
    <span>Any element can work</span>
  </PlainCard>
);

test('Should render with children and match snapshot', () => {
  const { container } = render(<Plain />);
  expect(container).toMatchSnapshot();
});

test('Title in rendered element should be "Plain Card Title"', () => {
  const { getByText } = render(<Plain />);
  expect(getByText('Plain Card Title')).toBeInTheDocument();
});

import React from 'react';
import { render } from 'src/util/test-utils';
import PageTitle from '../PageTitle';

test('Should render PageTitle: "Bob Ross"', () => {
  const { getByText } = render(<PageTitle title="Bob Ross" />);
  expect(getByText('Bob Ross')).toBeInTheDocument();
});

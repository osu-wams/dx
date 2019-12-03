import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render, authUserAudienceOverride } from '../../../../util/test-utils';
import Affiliations from '../Affiliations';

const mockPostSettings = jest.fn(() => Promise.resolve());

jest.mock('../../../../api/user', () => ({
  ...jest.requireActual('../../../../api/user'),
  postSettings: () => mockPostSettings()
}));

describe('<Affiliations />', () => {
  beforeEach(() => {
    mockPostSettings.mockReturnValue(Promise.resolve());
  });
  it('renders with default test data settings', async () => {
    const { queryAllByText } = render(<Affiliations />);
    expect(queryAllByText('(Override)')).toHaveLength(0);
  });

  it('renders with test data as overridden settings', async () => {
    authUserAudienceOverride.firstYear = false;
    authUserAudienceOverride.graduate = false;
    authUserAudienceOverride.international = false;
    const { queryAllByText } = render(<Affiliations />);
    expect(queryAllByText('(Override)')).toHaveLength(3);
  });

  it('submits updates when a change is fired', async () => {
    const { getByTestId } = render(<Affiliations />);
    const firstYearSwitch = getByTestId('firstYear');
    fireEvent.click(firstYearSwitch.children[0].children[0]);
    const internationalSwitch = getByTestId('international');
    fireEvent.click(internationalSwitch.children[0].children[0]);
    const graduateSwitch = getByTestId('graduate');
    fireEvent.click(graduateSwitch.children[0].children[0]);
    expect(mockPostSettings).toHaveBeenCalledTimes(3);
  });
});

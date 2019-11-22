import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render, authUserAudienceOverride } from '../../../../util/test-utils';
import Affiliations from '../Affiliations';
//import { gpaData, gpaUndergraduateData } from '../../api/student/__mocks__/gpa.data';
//import { gpaInitialState } from '../../api/student/gpa';

const mockPostSettings = jest.fn(() => Promise.resolve());

jest.mock('../../../../api/user', () => ({
  ...jest.requireActual('../../../../api/user'),
  postSettings: () => mockPostSettings()
}));

describe('<Affiliations />', () => {
  it('renders with default test data as overridden settings', async () => {
    const { getAllByText } = render(<Affiliations />);
    expect(getAllByText('(Override)')).toHaveLength(3);
  });

  it('renders with test data as not overridden settings', async () => {
    authUserAudienceOverride.firstYear = true;
    authUserAudienceOverride.graduate = true;
    authUserAudienceOverride.international = true;
    const { queryAllByText } = render(<Affiliations />);
    expect(queryAllByText('(Override)')).toHaveLength(0);
  });

  it('submits updates when a change is fired', async () => {
    const { getByTestId, debug } = render(<Affiliations />);
    const firstYearSwitch = getByTestId('firstYear');
    fireEvent.click(firstYearSwitch.children[0].children[0]);
    const internationalSwitch = getByTestId('international');
    fireEvent.click(internationalSwitch.children[0].children[0]);
    const graduateSwitch = getByTestId('graduate');
    fireEvent.click(graduateSwitch.children[0].children[0]);
    expect(mockPostSettings).toHaveBeenCalledTimes(3);
  });
});

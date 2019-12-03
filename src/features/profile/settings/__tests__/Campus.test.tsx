import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render, authUserClassification } from '../../../../util/test-utils';
import Campus from '../Campus';

const mockPostSettings = jest.fn(() => Promise.resolve());

jest.mock('../../../../api/user', () => ({
  ...jest.requireActual('../../../../api/user'),
  postSettings: () => mockPostSettings()
}));

describe('<Campus />', () => {
  beforeEach(() => {
    mockPostSettings.mockReturnValue(Promise.resolve());
  });
  it('renders with default test data settings having only 1 default campus', async () => {
    const { getByText, queryAllByText } = render(<Campus />);
    const defaultCampus = getByText('(Default)');
    const campusLabel = defaultCampus!.parentElement;
    expect(campusLabel).toHaveTextContent('Corvallis');
    expect(queryAllByText('(Default)')).toHaveLength(1);
  });

  it('renders with default test data in the context of a bend student', async () => {
    authUserClassification.attributes!.campusCode = 'B';
    const { getByText, queryAllByText } = render(<Campus />);
    const defaultCampus = getByText('(Default)');
    const campusLabel = defaultCampus!.parentElement;
    expect(campusLabel).toHaveTextContent('Bend');
    expect(queryAllByText('(Default)')).toHaveLength(1);
  });

  it('renders with test data as a non-student user having no classification attributes', async () => {
    authUserClassification.attributes = undefined;
    const { getByText } = render(<Campus />);
    const defaultCampus = getByText('(Default)');
    const campusLabel = defaultCampus!.parentElement;
    expect(campusLabel).toHaveTextContent('Corvallis');
  });

  it('submits updates when a change is fired', async () => {
    const { getByTestId } = render(<Campus />);
    const corvallisButton = getByTestId('corvallis');
    fireEvent.click(corvallisButton.children[0].children[0]);
    const bendButton = getByTestId('bend');
    fireEvent.click(bendButton.children[0].children[0]);
    const ecampusButton = getByTestId('ecampus');
    fireEvent.click(ecampusButton.children[0].children[0]);
    // Clicking a radio button that is already checked is no-op, this should
    // only register a click on each of the other buttons
    expect(mockPostSettings).toHaveBeenCalledTimes(2);
  });
});

import React from 'react';
import { wait, waitForElement } from '@testing-library/react';
import { render } from '../../util/test-utils';
import { personsMailingAddressData } from '../../api/persons/__mocks__/addresses.data';
import { personsData } from '../../api/persons/__mocks__/person.data';
import OSUProfile from '../profile/OSUProfile';

jest.unmock('../../api/persons/addresses');
jest.unmock('../../api/persons/persons');

const mockUseMailingAddress = jest.fn();
const mockUsePerson = jest.fn();
const mockNoData = { data: null, loading: false, error: false };

jest.mock('../../api/persons/addresses', () => ({
  useMailingAddress: () => mockUseMailingAddress()
}));
jest.mock('../../api/persons/persons', () => ({
  usePerson: () => mockUsePerson()
}));

describe('<OSUProfile />', () => {
  // Set mock function result before running any tests
  beforeAll(() => {
    mockUsePerson.mockReturnValue(personsData);
    mockUseMailingAddress.mockReturnValue(personsMailingAddressData);
  });

  it('should render the approriate name: "Testo Last"', async () => {
    const { getByText } = render(<OSUProfile />);
    expect(await waitForElement(() => getByText('Testo Last'))).toBeInTheDocument();
  });

  it('should find the "Mailing Address" label', async () => {
    const { getByText } = render(<OSUProfile />);
    await wait(() => {
      expect(getByText('Current Mailing')).toBeInTheDocument();
    });
  });

  it('should not find name "Testo Last" but should see "Cannot find your information" when no person is found', async () => {
    mockUsePerson.mockReturnValue(mockNoData);
    const { queryByText, getByText } = render(<OSUProfile />);

    await wait(() => {
      expect(getByText('Cannot find your information')).toBeInTheDocument();
    });
    await wait(() => {
      expect(queryByText('Testo Last')).not.toBeInTheDocument();
    });
  });

  it('should not find the "Mailing Address" when address is null', async () => {
    mockUseMailingAddress.mockReturnValue(mockNoData);
    const { queryByText } = render(<OSUProfile />);
    await wait(() => {
      expect(queryByText('Current Mailing')).not.toBeInTheDocument();
    });
  });
});

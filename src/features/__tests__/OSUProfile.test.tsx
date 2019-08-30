import React from 'react';
import { wait, waitForElement } from '@testing-library/react';
import { render } from '../../util/test-utils';
import { personsMailingAddressData } from '../../api/persons/__mocks__/addresses.data';
import { personsData } from '../../api/persons/__mocks__/person.data';
import OSUProfile from '../profile/OSUProfile';

jest.unmock('../../api/persons/addresses');
jest.unmock('../../api/persons/persons');

const mockGetMailingAddress = jest.fn();
const mockGetPerson = jest.fn();

jest.mock('../../api/persons/addresses', () => ({
  getMailingAddress: () => mockGetMailingAddress()
}));
jest.mock('../../api/persons/persons', () => ({
  getPerson: () => mockGetPerson()
}));

describe('<OSUProfile />', () => {
  // Set mock function result before running any tests
  beforeAll(() => {
    mockGetPerson.mockResolvedValue(Promise.resolve(personsData));
    mockGetMailingAddress.mockReturnValue(Promise.resolve(personsMailingAddressData));
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
    mockGetPerson.mockResolvedValue(Promise.resolve(null));
    const { queryByText, getByText } = render(<OSUProfile />);

    expect(getByText('Cannot find your information')).toBeInTheDocument();

    await wait(() => {
      expect(queryByText('Testo Last')).not.toBeInTheDocument();
    });
  });

  it('should not find the "Mailing Address" when address is null', async () => {
    mockGetMailingAddress.mockResolvedValue(Promise.resolve(null));
    const { queryByText } = render(<OSUProfile />);
    await wait(() => {
      expect(queryByText('Current Mailing')).not.toBeInTheDocument();
    });
  });
});

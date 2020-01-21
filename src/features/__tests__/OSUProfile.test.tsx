import React from 'react';
import { wait, waitForElement } from '@testing-library/react';
import { render } from '../../util/test-utils';
import OSUProfile from '../profile/OSUProfile';
import { Person } from '@osu-wams/hooks';

const { personsMailingAddressData, personsMinimalAddressData } = Person.Addresses.mockAddresses;
const { personsData, preferredName, nullName, preferredFirstName } = Person.Persons.mockPersons;

const mockUseAddresses = jest.fn();
const mockUsePerson = jest.fn();
const mockNoData = { data: null, loading: false, error: false };

jest.mock('@osu-wams/hooks', () => {
  return {
    ...jest.requireActual('@osu-wams/hooks'),
    useAddresses: () => mockUseAddresses(),
    usePerson: () => mockUsePerson()
  };
});

describe('<OSUProfile />', () => {
  // Set mock function result before running any tests
  beforeEach(() => {
    mockUsePerson.mockReturnValue(personsData);
    mockUseAddresses.mockReturnValue(personsMailingAddressData);
  });

  it('should render the approriate name: "Testo Last"', async () => {
    const { getByText } = render(<OSUProfile />);
    expect(await waitForElement(() => getByText('Testo Last'))).toBeInTheDocument();
  });

  it('should find the "Mailing Address" label', async () => {
    const { getByText } = render(<OSUProfile />);
    expect(await waitForElement(() => getByText('Current Mailing'))).toBeInTheDocument();
  });

  it('should find "1234phone" only once, since user has the same phone number listed', async () => {
    const { getAllByText } = render(<OSUProfile />);
    const phoneArray = await waitForElement(() => getAllByText(/1234phone/));
    expect(phoneArray).toHaveLength(1);
  });

  it('should find "1234" 3 times, since user has 3 different phone numbers starting with 1234', async () => {
    mockUsePerson.mockReturnValue(nullName);
    const { getAllByText } = render(<OSUProfile />);
    const phoneArray = await waitForElement(() => getAllByText(/1234/));
    expect(phoneArray).toHaveLength(3);
  });

  it('Find user with missing id and name', async () => {
    mockUsePerson.mockReturnValue(nullName);
    const { getByText } = render(<OSUProfile />);
    expect(await waitForElement(() => getByText('No ID'))).toBeInTheDocument();
    expect(await waitForElement(() => getByText('No username'))).toBeInTheDocument();
  });

  it('should not find name "Testo Last" but should see "Cannot find your information" when no person is found', async () => {
    mockUsePerson.mockReturnValue(mockNoData);
    const { queryByText, getByText } = render(<OSUProfile />);
    const noInfo = await waitForElement(() => getByText('Cannot find your information'));
    expect(noInfo).toBeInTheDocument();
    await wait(() => {
      expect(queryByText('Testo Last')).not.toBeInTheDocument();
    });
  });

  it('should not find the "Mailing Address" when address is null', async () => {
    mockUseAddresses.mockReturnValue(mockNoData);
    const { queryByText } = render(<OSUProfile />);
    await wait(() => {
      expect(queryByText('Current Mailing')).not.toBeInTheDocument();
    });
  });

  it('should find the the default data missing states when not in the address', async () => {
    mockUsePerson.mockReturnValue(preferredName);

    mockUseAddresses.mockReturnValue(personsMinimalAddressData);
    const { getByText } = render(<OSUProfile />);
    expect(await waitForElement(() => getByText(/No address description/))).toBeInTheDocument();
    expect(await waitForElement(() => getByText(/No city name/))).toBeInTheDocument();
    expect(await waitForElement(() => getByText(/No state title/))).toBeInTheDocument();
    expect(await waitForElement(() => getByText(/No postal code/))).toBeInTheDocument();
  });

  it('should find "displayFirstName" instead of "FirstName"', async () => {
    mockUsePerson.mockReturnValue(preferredName);
    const { getByText, queryByText } = render(<OSUProfile />);
    expect(
      await waitForElement(() => getByText('displayFirstName displayMiddleName displayLastName'))
    ).toBeInTheDocument();
    await wait(() => {
      expect(queryByText('FirstName Testo')).not.toBeInTheDocument();
    });
  });

  it('should find "displayFirstName Testo" instead of "FirstName Testo"', async () => {
    mockUsePerson.mockReturnValue(preferredFirstName);
    const { getByText, queryByText } = render(<OSUProfile />);
    expect(await waitForElement(() => getByText('displayFirstName Testo'))).toBeInTheDocument();
    await wait(() => {
      expect(queryByText('FirstName Testo')).not.toBeInTheDocument();
    });
  });

  it('should find 2 phones, mobile and home and not a primary phone', async () => {
    mockUsePerson.mockReturnValue(preferredName);
    const { getByText, queryByText } = render(<OSUProfile />);
    expect(await waitForElement(() => getByText('Home phone'))).toBeInTheDocument();
    expect(await waitForElement(() => getByText('Mobile phone'))).toBeInTheDocument();
    await wait(() => {
      expect(queryByText('Primary phone')).not.toBeInTheDocument();
    });
  });
});

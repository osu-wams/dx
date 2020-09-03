import React from 'react';
import { render } from 'src/util/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OSUProfile from '../profile/OSUProfile';
import { Person } from '@osu-wams/hooks';
import { mockGAEvent } from 'src/setupTests';

// !TODO: After replacing mono-repo with react query, hook all this to MSW

const { personsMailingAddressData, personsMinimalAddressData } = Person.Addresses.mockAddresses;
const { personsData, preferredName, nullName, preferredFirstName } = Person.Persons.mockPersons;

const mockUseAddresses = jest.fn();
const mockUsePerson = jest.fn();
const mockNoData = { data: null, loading: false, error: false };

jest.mock('@osu-wams/hooks', () => {
  return {
    ...jest.requireActual('@osu-wams/hooks'),
    useAddresses: () => mockUseAddresses(),
    usePerson: () => mockUsePerson(),
  };
});

describe('<OSUProfile />', () => {
  // Set mock function result before running any tests
  beforeEach(() => {
    mockUsePerson.mockReturnValue(personsData);
    mockUseAddresses.mockReturnValue(personsMailingAddressData);
  });

  it('should render the approriate name: "Testo Last"', () => {
    const { getByText } = render(<OSUProfile />);
    expect(getByText('Testo Last')).toBeInTheDocument();
  });

  it('Renders footer with tracked link to Google Analytics', async () => {
    render(<OSUProfile />);
    const footerLink = await screen.findByText(/update personal information/i);
    expect(footerLink).toBeInTheDocument();

    userEvent.click(footerLink);
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
  });

  it('should find the "Mailing Address" label and appropriate address', async () => {
    render(<OSUProfile />);
    expect(await screen.findByText('Current Mailing')).toBeInTheDocument();
    expect(await screen.findByText(/Bogus 1st Ave SW/i)).toBeInTheDocument();
  });

  it('should find "1234phone" only once, since user has the same phone number listed', async () => {
    const { findAllByText } = render(<OSUProfile />);
    const phoneArray = await findAllByText(/1234phone/);
    expect(phoneArray).toHaveLength(1);
  });

  it('should find "1234" 3 times, since user has 3 different phone numbers starting with 1234', async () => {
    mockUsePerson.mockReturnValue(nullName);
    const { findAllByText } = render(<OSUProfile />);
    const phoneArray = await findAllByText(/1234/);
    expect(phoneArray).toHaveLength(3);
  });

  it('Find user with missing id and name', async () => {
    mockUsePerson.mockReturnValue(nullName);
    const { getByText } = render(<OSUProfile />);
    expect(getByText('No ID')).toBeInTheDocument();
    expect(getByText('No username')).toBeInTheDocument();
  });

  it('should not find name "Testo Last" but should see "Cannot find your information" when no person is found', async () => {
    mockUsePerson.mockReturnValue(mockNoData);
    const { queryByText, getByText } = render(<OSUProfile />);
    const noInfo = getByText('Cannot find your information');
    expect(noInfo).toBeInTheDocument();

    expect(queryByText('Testo Last')).toBeNull();
  });

  it('should not find the "Mailing Address" when address is null', async () => {
    mockUseAddresses.mockReturnValue(mockNoData);
    const { queryByText } = render(<OSUProfile />);

    expect(queryByText('Current Mailing')).toBeNull();
  });

  it('should find the the default data missing states when not in the address', async () => {
    mockUsePerson.mockReturnValue(preferredName);

    mockUseAddresses.mockReturnValue(personsMinimalAddressData);
    const { getByText } = render(<OSUProfile />);
    expect(getByText(/No address description/)).toBeInTheDocument();
    expect(getByText(/No city name/)).toBeInTheDocument();
    expect(getByText(/No state title/)).toBeInTheDocument();
    expect(getByText(/No postal code/)).toBeInTheDocument();
  });

  it('should find "displayFirstName" instead of "FirstName"', async () => {
    mockUsePerson.mockReturnValue(preferredName);
    const { getByText, queryByText } = render(<OSUProfile />);
    expect(getByText('displayFirstName displayMiddleName displayLastName')).toBeInTheDocument();

    expect(queryByText('FirstName Testo')).toBeNull();
  });

  it('should find "displayFirstName Testo" instead of "FirstName Testo"', async () => {
    mockUsePerson.mockReturnValue(preferredFirstName);
    const { getByText, queryByText } = render(<OSUProfile />);
    expect(getByText('displayFirstName Testo')).toBeInTheDocument();

    expect(queryByText('FirstName Testo')).toBeNull();
  });

  it('should find 2 phones, mobile and home and not a primary phone', async () => {
    mockUsePerson.mockReturnValue(preferredName);
    const { getByText, queryByText } = render(<OSUProfile />);
    expect(getByText('Home phone')).toBeInTheDocument();
    expect(getByText('Mobile phone')).toBeInTheDocument();

    expect(queryByText('Primary phone')).toBeNull();
  });
});

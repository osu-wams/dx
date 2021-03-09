import React from 'react';
import { render } from 'src/util/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OSUProfile from '../profile/OSUProfile';
import { Person } from '@osu-wams/hooks';
import { mockGAEvent } from 'src/setupTests';
import { alterMock } from 'src/util/test-utils';
import { PERSONS_ADDRESSES_API, PERSONS_API, PERSONS_PHONE_API } from 'src/mocks/apis';

const { personsMinimalAddressData } = Person.Addresses.mockAddresses;
const { preferredName, nullName, preferredFirstName, multiplePhonesData } = Person.Persons.mockPersons;

describe('<OSUProfile />', () => {
  // Default Data
  describe('normal data', () => {
    beforeEach(() => {
      render(<OSUProfile />);
    });

    it('should render the approriate name: "Testo Last"', async () => {
      expect(await screen.findByText('Testo Last')).toBeInTheDocument();
    });

    it('Renders footer with tracked link to Google Analytics', async () => {
      const footerLink = await screen.findByText(/update personal information/i);
      expect(footerLink).toBeInTheDocument();

      userEvent.click(footerLink);
      expect(mockGAEvent).toHaveBeenCalledTimes(1);
    });

    it('should find the "Mailing Address" label and appropriate address', async () => {
      expect(await screen.findByText('Current Mailing')).toBeInTheDocument();
      expect(await screen.findByText(/Bogus 1st Ave SW/i)).toBeInTheDocument();
    });

    it('should find "1234phone" only once, since user has the same phone number listed', async () => {
      const phoneArray = await screen.findByText(/1234phone/);
      expect(phoneArray).toBeInTheDocument();
    });
  });

  describe('nullName data', () => {
    beforeEach(() => {
      alterMock(PERSONS_API, nullName.data);
      alterMock(PERSONS_PHONE_API, multiplePhonesData.data);
      render(<OSUProfile />);
    });

    it('should find "1234" 3 times, since user has 3 different phone numbers starting with 1234', async () => {
      const phoneArray = await screen.findAllByText(/1234/);
      expect(phoneArray).toHaveLength(3);
    });

    it('Find user with missing id and name', async () => {
      expect(await screen.findByText('No ID')).toBeInTheDocument();
      expect(await screen.findByText('No username')).toBeInTheDocument();
    });
  });

  describe('PreferredName and minimalAddress', () => {
    beforeEach(() => {
      alterMock(PERSONS_API, preferredName.data);
      alterMock(PERSONS_ADDRESSES_API, personsMinimalAddressData.data);
      render(<OSUProfile />);
    });

    it('should find the the default data missing states when not in the address', async () => {
      expect(await screen.findByText(/No address description/)).toBeInTheDocument();
      expect(await screen.findByText(/No city name/)).toBeInTheDocument();
      expect(await screen.findByText(/No state title/)).toBeInTheDocument();
      expect(await screen.findByText(/No postal code/)).toBeInTheDocument();
    });

    it('should find "displayFirstName" instead of "FirstName"', async () => {
      expect(
        await screen.findByText('displayFirstName displayMiddleName displayLastName')
      ).toBeInTheDocument();
      expect(screen.queryByText('FirstName Testo')).not.toBeInTheDocument();
    });
  });

  describe('Preferred First name', () => {
    it('should find "displayFirstName Testo" instead of "FirstName Testo"', async () => {
      alterMock(PERSONS_API, preferredFirstName.data);
      render(<OSUProfile />);

      expect(await screen.findByText('displayFirstName Testo')).toBeInTheDocument();
      expect(screen.queryByText('FirstName Testo')).not.toBeInTheDocument();
    });
  });

  describe('With empty data', () => {
    it('should not find name "Testo Last" but should see "Cannot find your information" when no person is found', async () => {
      alterMock(PERSONS_API, '');
      render(<OSUProfile />);

      expect(await screen.findByText(/Cannot find your information/i)).toBeInTheDocument();
      expect(screen.queryByText('Testo Last')).not.toBeInTheDocument();
    });

    it('should not find the "Mailing Address" when address is null', async () => {
      alterMock(PERSONS_ADDRESSES_API, '');
      render(<OSUProfile />);

      expect(await screen.findByText(/Testo Last/i)).toBeInTheDocument();
      expect(screen.queryByText('Current Mailing')).not.toBeInTheDocument();
    });
  });
});

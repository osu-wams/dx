import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/macro';
import { faEnvelope, faMobileAlt, faPhone, faUserCircle } from '@fortawesome/pro-light-svg-icons';
import { Loading } from 'src/ui/Loading';
import { useEmails, usePerson, usePhones } from '@osu-wams/hooks';
import { Card, CardHeader, CardIcon, CardContent, CardFooter } from 'src/ui/Card';
import { ContactInfo, PairData, renderListItem } from './osuprofile/osuprofile-utils';
import { ProfileAddress } from './osuprofile/ProfileAddress';
import { Types } from '@osu-wams/lib';
import { ExternalLink } from 'src/ui/Link';
import { Url } from '@osu-wams/utils';
import { Event } from 'src/util/gaTracking';

const OSUProfile = () => {
  const themeContext = useContext(ThemeContext);
  const person = usePerson();
  const email = useEmails();
  const phone = usePhones();

  return (
    <Card collapsing={false}>
      {person.isLoading && email.isLoading && phone.isLoading && <Loading lines={6} />}
      {!person.isLoading && !email.isLoading && !phone.isLoading && !person.data && (
        <p>Cannot find your information</p>
      )}
      {person.isSuccess &&
        email.isSuccess &&
        phone.isSuccess &&
        person.data &&
        email.data &&
        phone.data &&
        Object.keys(person).length &&
        renderProfile(
          person.data,
          email.data,
          phone.data,
          themeContext.features.profile.icon.color
        )}
      <CardFooter>
        <ExternalLink
          href={Url.banner.editProfile}
          onClick={() => Event('profile', 'Update Personal Information', Url.banner.editProfile)}
        >
          Update Personal Information
        </ExternalLink>
      </CardFooter>
    </Card>
  );
};

const renderProfile = (
  p: Types.PersonsAttributes,
  e: Types.Email[],
  phone: Types.Phone[],
  iconColor: string
) => {
  const {
    id,
    firstName,
    displayFirstName,
    displayLastName,
    lastName,
    middleName,
    displayMiddleName,
    onid,
  } = p;
  const preferredEmail = e.filter((obj) => {
    return obj.attributes.preferredInd == true;
  })[0];
  const { emailAddress } = preferredEmail.attributes;
  const preferredPhone = phone.filter((obj) => {
    return obj.attributes.primaryInd == true && obj.attributes.phoneType.code == 'CM';
  })[0];
  const mobilePhone = phone.filter((obj) => {
    return obj.attributes.phoneType.code == 'MP';
  })[0];
  const alternativePhone = phone.filter((obj) => {
    return obj.attributes.phoneType.code == 'PA';
  })[0];
  const fullPrimaryPhoneNumber = preferredPhone ? preferredPhone.attributes.fullPhoneNumber : null;
  const fullAltPhoneNumber = mobilePhone ? mobilePhone.attributes.fullPhoneNumber : null;
  const fullMobilePhoneNumber = alternativePhone
    ? alternativePhone.attributes.fullPhoneNumber
    : null;

  /**
   * Build a single string to display
   */
  const nameToDisplay = () => {
    let fn, mn;
    if (firstName || displayFirstName) {
      fn = displayFirstName ?? firstName;
    }

    const ln = displayLastName ?? lastName;

    if (middleName || displayMiddleName) {
      mn = middleName ?? displayMiddleName;
      return `${fn} ${mn} ${ln}`;
    }

    return `${fn} ${ln}`;
  };
  return (
    <>
      <CardHeader title={nameToDisplay()} badge={<CardIcon icon={faUserCircle} />} />
      <CardContent>
        <PairData>
          <div>
            <dt>ONID</dt>
            <dd>{onid ?? 'No username'}</dd>
          </div>
          <div>
            <dt>OSU ID</dt>
            <dd>{id ?? 'No ID'}</dd>
          </div>
        </PairData>
        <ContactInfo>
          {fullPrimaryPhoneNumber !== fullMobilePhoneNumber &&
            renderListItem('Primary phone', fullPrimaryPhoneNumber, faPhone, iconColor)}
          {renderListItem('Mobile phone', fullMobilePhoneNumber, faMobileAlt, iconColor)}
          {fullPrimaryPhoneNumber !== fullAltPhoneNumber &&
            fullMobilePhoneNumber !== fullAltPhoneNumber &&
            renderListItem('Alternative phone', fullAltPhoneNumber, faPhone, iconColor)}
          {renderListItem('Email', emailAddress, faEnvelope, iconColor)}
          <ProfileAddress />
        </ContactInfo>
      </CardContent>
    </>
  );
};

export default OSUProfile;

import React, { useContext } from 'react';
import { faEnvelope, faPhone, faMobileAlt } from '@fortawesome/pro-light-svg-icons';
import Skeleton from 'react-loading-skeleton';
import { usePerson, IPersonsAttributes } from '../../api/persons/persons';
import PlainCard from '../../ui/PlainCard';
import { ThemeContext } from '../../theme';
import { ContactInfo, PairData, PersonName, renderPhone } from './osuprofile/osuprofile-utils';
import { ProfileAddress } from './osuprofile/ProfileAddress';

const OSUProfile = () => {
  const themeContext = useContext(ThemeContext);
  const person = usePerson();

  return (
    <PlainCard>
      {person.loading && <Skeleton count={6} />}
      {!person.loading && !person.data && <p>Cannot find your information</p>}
      {!person.loading &&
        person.data &&
        Object.keys(person).length &&
        renderProfile(person.data, themeContext.features.profile.icon.color)}
    </PlainCard>
  );
};

const renderProfile = (
  {
    id,
    firstName,
    middleName,
    lastName,
    displayFirstName,
    displayMiddleName,
    displayLastName,
    username,
    primaryPhone,
    homePhone,
    mobilePhone,
    email
  }: IPersonsAttributes,
  iconColor: string
) => {
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
      <PersonName>{nameToDisplay()}</PersonName>
      <PairData>
        <div>
          <dt>ONID</dt>
          <dd>{username ?? 'No username'}</dd>
        </div>
        <div>
          <dt>OSU ID</dt>
          <dd>{id ?? 'No ID'}</dd>
        </div>
      </PairData>
      <ContactInfo>
        {primaryPhone !== mobilePhone &&
          renderPhone('Primary phone', primaryPhone, faPhone, iconColor)}
        {homePhone !== primaryPhone &&
          homePhone !== mobilePhone &&
          renderPhone('Home phone', homePhone, faPhone, iconColor)}
        {renderPhone('Mobile phone', mobilePhone, faMobileAlt, iconColor)}
        {renderPhone('Email', email, faEnvelope, iconColor)}
        <ProfileAddress />
      </ContactInfo>
    </>
  );
};

export default OSUProfile;
